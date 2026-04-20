import { RiDeleteBin6Line, RiEdit2Line } from "react-icons/ri";
import {
  Alert,
  Button,
  Drawer,
  Form,
  InputField,
  Radio,
  RadioList,
  Select,
  Table,
  Tbody,
  Tdata,
  Th,
  Thead,
  Trow,
} from "../../components";

import { useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";

interface Sale {
  id: number;
  coupon: string;
  discount: number;
  saleCategory: string;
  startDate: string;
  endDate: string;
  status: string;
  categories: string[];
  products: string[];
}

export const Sales = () => {
  const [addSale, setAddSale] = useState(false);
  const [editSale, setEditSale] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState("");

  const [sale, setSale] = useState<Sale>({
    id: 0,
    coupon: "",
    discount: 0,
    saleCategory: "ALL",
    startDate: "",
    endDate: "",
    status: "active",
    categories: [],
    products: [],
  });

  const [option, setOption] = useState("ALL"); // ['all', 'categories', 'products']

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  // const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  // const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [sales, setSales] = useState<Sale[]>([]);

  // const cats = [
  //   {
  //     id: 1,
  //     name: "category1",
  //     products: [
  //       { id: 1, name: "product1" },
  //       { id: 2, name: "product2" },
  //     ],
  //   },
  //   {
  //     id: 2,
  //     name: "category2",
  //     products: [{ id: 3, name: "product3" }],
  //   },
  //   {
  //     id: 3,
  //     name: "category3",
  //     products: [
  //       { id: 1, name: "product4" },
  //       { id: 2, name: "product5" },
  //       { id: 3, name: "product6" },
  //     ],
  //   },
  // ];

  // const prods = [
  //   { id: 1, name: "product1", price: 100, category: "category1" },
  //   { id: 2, name: "product2", price: 200, category: "category1" },
  //   { id: 3, name: "product3", price: 300, category: "category2" },
  // ];
  const fetchSales = async () => {
    const response = await fetch("http://localhost:5001/api/v1/sale/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch sales");
    }
    const data = await response.json();
    console.log("sales", data.result);
    const sales = data.result.map((sale: any) => {
      let saleCategories, saleProducts;
      if (sale.saleCategory == "CATEGORIES") {
        saleCategories = sale.SaleItems.map(
          (saleItem: any) => saleItem.Product.Category.name
        );
      } else if (sale.saleCategory == "PRODUCTS") {
        saleProducts = sale.SaleItems.map(
          (saleItem: any) => saleItem.Product.name
        );
      }
      return {
        id: sale.id,
        coupon: sale.coupon,
        discount: sale.discount,
        saleCategory: sale.saleCategory,
        startDate: new Date(sale.startDate).toISOString().split("T")[0],
        endDate: new Date(sale.endDate).toISOString().split("T")[0],
        status: sale.status,
        categories: saleCategories ?? [],
        products: saleProducts ?? [],
      };
    });
    console.log(sales);
    setSales(sales);
  };

  useEffect(() => {
    try {
      fetchSales();

      const fetchCategories = async () => {
        const response = await fetch("http://localhost:5001/api/v1/category/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        const categories = data.result.map(
          (category: { id: number; name: string }) => {
            return {
              id: category.id,
              value: category.name,
              label: category.name,
            };
          }
        );
        setCategories(categories);
      };
      fetchCategories();
      const fetchProducts = async () => {
        const response = await fetch("http://localhost:5001/api/v1/product/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        const products = data.result.map(
          (product: { id: number; name: string }) => {
            return {
              id: product.id,
              value: product.name,
              label: product.name,
            };
          }
        );
        setProducts(products);
      };
      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const validateInputs = () => {
    let errors: { [key: string]: string } = {};
    if (!sale.coupon) {
      errors.coupon = "Coupon is required";
    }
    if (!sale.discount) {
      errors.discount = "Discount is required";
    }
    if (!sale.startDate) {
      errors.startDate = "Start Date is required";
    }
    if (!sale.endDate) {
      errors.endDate = "End Date is required";
    }
    if (option === "CATEGORIES" && sale.categories.length === 0) {
      errors.categories = "Select at least one category";
    }
    if (option === "PRODUCTS" && sale.products.length === 0) {
      errors.products = "Select at least one product";
    }
    if (sales.find((s) => s.coupon === sale.coupon)) {
      errors.coupon = "Coupon already exists";
    }
    if (
      sale.startDate < Date.now().toString() ||
      sale.endDate < Date.now().toString()
    ) {
      errors.startDate = "Start Date must be greater than current date";
    }
    if (sale.startDate > sale.endDate) {
      errors.endDate = "End Date must be greater than Start Date";
    }
    setErrors(errors);
    if (Object.keys(errors).length > 0) {
      return false;
    }
  };

  const resetForm = () => {
    setOption("ALL");
    setSale({
      id: 0,
      coupon: "",
      discount: 0,
      saleCategory: option,
      startDate: "",
      endDate: "",
      status: "active",
      categories: [],
      products: [],
    });
  };

  const handleAdd = async () => {
    if (validateInputs() === false) return;

    const newSale: Sale = {
      id: sales.length + 1,
      coupon: sale.coupon,
      saleCategory: option,
      startDate: sale.startDate,
      endDate: sale.endDate,
      status: sale.status,
      discount: sale.discount,
      categories: sale.categories,
      products: sale.products,
    };

    try {
      console.log("in try block");
      const response = await fetch("http://localhost:5001/api/v1/sale/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({ newSale }),
      });
      console.log("res", response);
      if (!response.ok) {
        throw new Error(await response.text());
      }

      const data = await response.json();
      window.alert(data.result);
      // const sale = {
      //   id: sales.length + 1,
      //   coupon,
      //   discount,
      //   startDate,
      //   endDate,
      //   status,
      //   categories: selectedCategories,
      //   products: selectedProducts,
      // };
      setSales((prevsales) => [...prevsales, newSale]);
      resetForm();
      setErrors({});
    } catch (error) {
      console.error("Error applying sale:", error);
    }
  };

  const handleEdit = (_id: any) => {
    setShowAlert(false);

    const sale = sales.find((sale) => sale.id === _id);
    if (!sale) return;
    setOption(sale.saleCategory);
    setSale(sale);
    setEditSale(true);
  };

  const handleUpdate = async () => {
    // const isValid = validateInputs();
    // if (!isValid) return;

    //Check if the coupon already exists (except for the current sale being edited)
    // if (coupons.includes(coupon) && sale.coupon !== coupon) {
    //   setErrors((prevErrors) => ({
    //     ...prevErrors,
    //     coupon: "Coupon already exists",
    //   }));
    //   return;
    // }

    //calculateSale();

    try {
      const response = await fetch(
        `http://localhost:5001/api/v1/sale/${sale.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify({
            sale: {
              coupon: sale.coupon,
              saleCategory: option,
              startDate: sale.startDate,
              endDate: sale.endDate,
              status: sale.status,
              discount: sale.discount,
              categories: sale.categories,
              products: sale.products,
            },
          }),
        }
      );
      if (response.ok) {
        fetchSales();
        resetForm();
        setErrors({});
        setEditSale(false);
        window.alert("Sale updated successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:5001/api/v1/sale/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (response.ok) {
        const newSales = sales.filter((sale) => sale.id !== id);
        setSales(newSales);
        window.alert("Sale removed successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const changeStatus = async (id: number) => {
    console.log(id);
    try {
      const response = await fetch(`http://localhost:5001/api/v1/sale/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        // body: JSON.stringify(sale.status),
      });
      if (response.ok) {
        const status = await response.json().then((data) => data.result);
        console.log(status);
        const newSales = sales.map((sale) => {
          if (sale.id === id) {
            return { ...sale, status: (sale.status = status) };
          }
          return sale;
        });

        status === "active" ? setAlertText("Activated") : setAlertText("Disabled");

        setSales(newSales);
        setShowAlert(true);
        console.log(newSales);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDrawer = () => {
    if (addSale) {
      setAddSale(false);
      resetForm();
      setErrors({});
    } else {
      setEditSale(false);
      resetForm();
      setErrors({});
    }
  };

  return (
    <div className="p-5 h-screen rounded-3xl bg-light">
      {showAlert && (
        <Alert
          onClose={() => {
            setShowAlert(false);
          }}
          style={`${
            alertText === "Activated" ? "bg-green-300" : "bg-red-200"
          } `}
        >
          Sale {alertText}!
        </Alert>
      )}
      <div className="m-3">
        <h1 className="text-xl font-bold mb-4 text-deepblue">SALES</h1>
        <div className="flex justify-between ">
          <div className="flex space-x-2">
            <MdAdd
              onClick={() => setAddSale(true)}
              className="text-light bg-deepblue cursor-pointer text-4xl shadow-md 
             hover:bg-purple rounded-full p-1.5 "
            />
          </div>
        </div>
      </div>
      {/* DESKTOP VIEW */}
      <Table>
        <Thead>
          <Trow>
            <Th>Coupon Name</Th>
            <Th>Discount</Th>
            <Th>Start Date</Th>
            <Th>End Date</Th>
            <Th>Status</Th>
            <Th>Actions</Th>
          </Trow>
        </Thead>
        {sales.length !== 0 ? (
          <Tbody>
            {sales.map((sale) => (
              <Trow key={sale.id}>
                <Tdata>{sale.coupon}</Tdata>
                <Tdata>{sale.discount}%</Tdata>
                <Tdata>{sale.startDate}</Tdata>
                <Tdata>{sale.endDate}</Tdata>
                <Tdata>
                  <span
                    className={`p-1.5 text-xs font-medium uppercase tracking-wider rounded-lg bg-opacity-50 cursor-pointer
                    ${
                      sale.status == "active"
                        ? "text-green-800 bg-green-200"
                        : "text-red-800 bg-red-200"
                    }`}
                    onClick={() => changeStatus(sale.id)}
                  >
                    {sale.status}
                  </span>
                </Tdata>
                <Tdata>
                  <div className="flex space-x-2">
                    <RiEdit2Line
                      className="text-blue-500 cursor-pointer"
                      onClick={() => handleEdit(sale.id)}
                    />
                    <RiDeleteBin6Line
                      className="text-red-500 cursor-pointer"
                      onClick={() => handleDelete(sale.id)}
                    />
                  </div>
                </Tdata>
              </Trow>
            ))}
          </Tbody>
        ) : (
          <div className="flex items-center justify-center m-4">
            <p className="text-center text-gray">No Sales Yet</p>
          </div>
        )}
      </Table>

      {/* MOBILE VIEW */}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
        {sales.length === 0 && (
          <p className="text-center text-gray">No Sales Yet</p>
        )}
        {sales.map((sale) => (
          <div
            className="bg-light space-y-3 p-4 rounded-lg shadow"
            key={sale.id}
          >
            <div className="flex items-center space-x-10 text-sm">
              <div className="text-deepblue">{sale.coupon}</div>
              <div>
                <span
                  className={`p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50 cursor-pointer
                  ${
                    sale.status == "active"
                      ? "text-green-800 bg-green-200"
                      : "text-red-800 bg-red-200"
                  }`}
                  onClick={() => changeStatus(sale.id)}
                >
                  {sale.status}
                </span>
              </div>
            </div>
            <div className="text-sm text-deepblue">Start: </div>
            <div className="text-sm text-gray">{sale.startDate}</div>
            <div className="text-sm text-deepblue">End: </div>
            <div className="text-sm text-gray">{sale.endDate}</div>
            <div className="text-sm font-medium text-deepblue">
              {sale.discount}%
            </div>
            <div className="flex space-x-2">
              <RiEdit2Line
                className="text-blue-500 cursor-pointer"
                onClick={() => handleEdit(sale.id)}
              />
              <RiDeleteBin6Line
                className="text-red-500 cursor-pointer"
                onClick={() => handleDelete(sale.id)}
              />
            </div>
          </div>
        ))}
      </div>

      {/* ADD/UPDATE FORMS */}
      {addSale || editSale ? (
        <Drawer
          header={addSale ? "APPLY SALE" : "EDIT SALE"}
          isOpen={addSale || editSale}
          onClose={handleDrawer}
        >
          <Form style="" onSubmit={addSale ? handleAdd : handleUpdate}>
            <span
              className={`cursor-pointer p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50
                ${
                  sale.status == "active"
                    ? "text-green-800 bg-green-200"
                    : "text-red-800 bg-red-200"
                }`}
              onClick={
                () => {
                  const newStatus =
                    sale.status === "Active" ? "Disabled" : "Active";
                  setSale({ ...sale, status: newStatus });
                }
                // setStatus(status === "Active" ? "Disabled" : "Active")
              }
            >
              {sale.status === "active" ? "active" : "disabled"}
            </span>
            <InputField
              labelStyle="mt-5"
              type="text"
              id="coupon"
              label="Coupon Name"
              value={sale.coupon}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSale({ ...sale, coupon: e.target.value })
              }
              error={errors.coupon}
            />
            <InputField
              type="number"
              id="discount"
              label="Discount"
              value={sale.discount.toString()}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSale({ ...sale, discount: parseInt(e.target.value) })
              }
              error={errors.discount}
            />
            <InputField
              type="date"
              id="startDate"
              label="Start Date"
              value={sale.startDate}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSale({ ...sale, startDate: e.target.value })
              }
              error={errors.startDate}
            />
            <InputField
              type="date"
              id="endDate"
              label="End Date"
              value={sale.endDate}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSale({ ...sale, endDate: e.target.value })
              }
              error={errors.endDate}
            />
            <RadioList id="sale" label="Apply Sale on">
              <Radio
                id="all"
                name="sale"
                value={option}
                onChange={() => {
                  setOption("ALL");
                }}
              >
                All
              </Radio>
              <Radio
                id="categories"
                name="sale"
                value={option}
                onChange={() => setOption("CATEGORIES")}
              >
                Categories
              </Radio>
              <Radio
                id="products"
                name="sale"
                value={option}
                onChange={() => setOption("PRODUCTS")}
              >
                Products
              </Radio>
            </RadioList>
            {option === "CATEGORIES" && (
              <Select
                id="category"
                label="Select Categories"
                options={categories}
                multiple={true}
                option={sale.categories}
                onChange={(selectedCategories) =>
                  setSale({
                    ...sale,
                    categories: selectedCategories as string[],
                  })
                }
                error={errors.categories}
              />
            )}
            {option === "PRODUCTS" && (
              <Select
                id="products"
                label="Select Products"
                options={products}
                multiple={true}
                option={sale.products}
                onChange={(selectedProducts) =>
                  setSale({ ...sale, products: selectedProducts as string[] })
                }
                error={errors.products}
              />
            )}
            <div className="flex justify-end mt-5">
              <Button type="submit" style="justify-center">
                {addSale ? "Apply Sale" : "Save"}
              </Button>
            </div>
          </Form>
        </Drawer>
      ) : null}
    </div>
  );
};

export default Sales;
