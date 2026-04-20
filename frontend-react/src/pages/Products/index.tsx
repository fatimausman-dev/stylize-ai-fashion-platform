// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";

// //ICONS
// import { RiDeleteBin6Line, RiEdit2Line, /* RiEyeLine */ } from "react-icons/ri";
// import { PiSortAscending } from "react-icons/pi";
// import { CiFilter } from "react-icons/ci";
// import { MdAdd } from "react-icons/md";

// //COMPONENTS
// import {
//   Alert,
//   Button,
//   Carousel,
//   Drawer,
//   Form,
//   InputField,
//   Modal,
//   Image,
//   Pagination,
//   SearchBar,
//   Select,
//   SizeChart,
//   Table,
//   Tbody,
//   Tdata,
//   TextArea,
//   Th,
//   Thead,
//   Trow,
//   Filter,
//   Sort,
// } from "../../components";

// interface Product {
//   id?: number;
//   sku: string;
//   name: string;
//   description?: string;
//   price: number;
//   stock: number;
//   status: string;
//   category?: ProdCategory;
//   // subCategory?: string; //hold
//   images: string[];
//   // type: string;
//   selectedSizes: string[];
//   selectedColors?: string[] | null;
//   sizeChart: string;
//   productMeasures?: number[][];
//   measures?: string;
// }

// interface ProdCategory {
//   id: string;
//   name: string;
// }

// export const Products = () => {
//   const [showAlert, setShowAlert] = useState(false);
//   const [showDrawer, setShowDrawer] = useState(false);
//   const [alertText, setAlertText] = useState("");
//   const [modal, setModal] = useState(false);

//   const [errors, setErrors] = useState<{ [key: string]: string }>({});

//   const [product, setProduct] = useState<Product>({
//     id: 0,
//     sku: "",
//     name: "",
//     description: "",
//     price: 0,
//     stock: 0,
//     status: "active",
//     category: { id: "", name: ""},
//     images: [],
//     selectedSizes: [],
//     selectedColors: [],
//     sizeChart: "",
//     productMeasures: [[]],
//   });

//   interface Category {
//     id: string;
//     value: string;
//     label: string;
//   }

//   const [products, setProducts] = useState<Product[]>([]);
//   const [originalProducts, setOriginalProducts] = useState<Product[]>([]);
//   const [categories, setCategories] = useState<Category[]>([]);
//   // const categories = [
//   //   {
//   //     id: "ready-to-wear",
//   //     value: "ready-to-wear",
//   //     label: "Ready-to-wear",
//   //   },
//   //   {
//   //     id: "winters",
//   //     value: "winters",
//   //     label: "winters",
//   //   },
//   // ];

//   const colors = [
//     { id: "1", value: "white", label: "White" },
//     { id: "2", value: "beige", label: "Beige" },
//     { id: "3", value: "pink", label: "Pink" },
//     { id: "4", value: "sage", label: "Sage" },
//     { id: "5", value: "plum", label: "Plum" },
//   ];

//   const sizecharts = [
//     { id: "1", value: "tops chart", label: "Tops Chart" },
//     { id: "2", value: "bottoms chart", label: "Bottoms Chart" },
//     { id: "3", value: "footwears chart", label: "Footwear Chart" },
//   ];

//   const sizeUnitsTop = [
//     { id: "2", value: "S", label: "S" },
//     { id: "3", value: "M", label: "M" },
//     { id: "4", value: "L", label: "L" },
//     { id: "5", value: "XL", label: "XL" },
//     { id: "6", value: "XXL", label: "XXL" },
//   ];

//   const sizeUnitsBottom = [
//     { id: "1", value: "36", label: "36" },
//     { id: "2", value: "40", label: "40" },
//     { id: "3", value: "50", label: "50" },
//     { id: "4", value: "0", label: "0" },
//     { id: "5", value: "10", label: "10" },
//     { id: "6", value: "34", label: "34" },
//   ];

//   const sizeUnitsFoot = [
//     { id: "1", value: "US-9", label: "US-9" },
//     { id: "2", value: "EU-10", label: "EU-10" },
//     { id: "3", value: "EU-28", label: "EU-28" },
//     { id: "4", value: "EU-20", label: "EU-20" },
//     { id: "5", value: "EU-50", label: "EU-50" },
//     { id: "6", value: "EU-36", label: "EU-36" },
//   ];

//   const measuresTop = [
//     "Chest",
//     "Length",
//     "Waist",
//     "burst",
//     "Sleeves",
//     "Armhole",
//     "Neck",
//     "Shoulder",
//     "Cuff",
//   ];
//   const measuresBottom = ["Waist", "Hip", "Thigh", "Length", "Inseam", "Rise"];
//   const measuresFoot = [
//     "length",
//     "heel",
//     "ball",
//     "width",
//     "circumference",
//     "shaft",
//     "height",
//   ];

//   //FETCH DATA FROM API

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await fetch('http://localhost:5001/api/v1/category/', {
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': 'Bearer ' + localStorage.getItem('token') 
//           },
//         });
        
//         if(!response.ok) {
//           const error = await response.text();
//           throw new Error(error);
//         }

//         const data = await response.json();
//         const categories = data.result.map((category: {name: string}) => {
//           return {
//             id: category.name,
//             value: category.name,
//             label: category.name,
//           };
//         });
//         setCategories(categories);
//       } catch (error) {
//         window.alert(error);
//       }
//     }
//     const fetchProducts = async () => {
//       try {
//         const response = await fetch("http://localhost:5001/api/v1/product/", {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             "Authorization": "Bearer " + localStorage.getItem("token") 
//           }
//         })
//         if (!response.ok) {
//           const error = await response.text();
//           throw new Error(error);
//         }
//         const data = await response.json();
//         setProducts(data.result);
//         setOriginalProducts(data.result);
//       } catch (error) {
//         window.alert(error);
//       }
//     };
//     fetchProducts();
//     fetchCategories();
//   }, []);

//   //CRUD OPERATIONS

//   //HANDLE DELETE
//   const handleDelete = async (id?: number) => {
//     try {
//       const response = await fetch(`http://localhost:5001/api/v1/product/${id}`, {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": "Bearer " + localStorage.getItem("token")
//         }
//       });
//       if (!response.ok) {
//         const error = await response.text();
//         throw new Error(error);
//       }
//       setProducts((prevProducts) =>
//         prevProducts.filter((product) => product.id !== id)
//       );
//     } catch (error) {
//       window.alert(error);
//     }
//   };

//   //HANDLE UPDATE
//   const handleEdit = (id?: number) => {
//     const selectedProduct: Product = products.find(
//       (product) => product.id === id
//     )!;
//     console.log(selectedProduct);
//     if (selectedProduct) {
//       console.log(selectedProduct.category)
//       setProduct(selectedProduct);
//       setShowDrawer(true);
//     }
//   };

//   const validateForm = () => {
//     if (
//       product.sku === "" ||
//       product.name === "" ||
//       product.sizeChart === "" ||
//       product.selectedSizes.length === 0 ||
//       product.images.length === 0
//     ) {
//       setErrors({
//         ...errors,
//         SKU: product.sku === "" ? "SKU is required" : "",
//         name: product.name === "" ? "Name is required" : "",
//         sizeChart: product.sizeChart === "" ? "Select a Size Chart" : "",
//         selectedSizes: product.selectedSizes.length === 0 ? "Select Sizes" : "",
//         images: product.images.length === 0 ? "Insert at least one image" : "",
//       });
//       return false;
//     }

//     //check SKU presence
//     const isSkuAlreadyExists = products.some(
//       (prod) => prod.sku === product.sku && prod.id !== product.id
//     );

//     if (product.id && isSkuAlreadyExists) {
//       setErrors({
//         ...errors,
//         SKU: "SKU already exists!",
//       });
//       return false;
//     }

//     return true;
//   };

//   const handleSubmit = async () => {
//     if (!validateForm()) {
//       return;
//     }
//     try {
//       const response = await fetch(`http://localhost:5001/api/v1/product/${product.id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": "Bearer " + localStorage.getItem("token")
//         },
//         body: JSON.stringify({
//           ...product,
//         }),
//       });

//       if (!response.ok) {
//         const error = await response.text();
//         throw new Error(error);
//       }

//       const updatedProducts = products.map((prod: Product) =>
//         prod.id === product.id ? { ...product } : prod
//       );

//       console.log(updatedProducts);
//       setProducts(updatedProducts);
//       setErrors({});
//       setShowDrawer(false);
//       alert("success");
//     } catch (error) {
//       window.alert(error);
//     }
//   };

//   //SIZING OPTIONS

//   const sizing = (chart: string) => {
//     if (chart === "tops chart") {
//       return sizeUnitsTop;
//     } else if (chart === "bottoms chart") {
//       return sizeUnitsBottom;
//     } else if (chart === "footwears chart") {
//       return sizeUnitsFoot;
//     }
//   };

//   const sizingMeasures = (chart: string) => {
//     if (chart === "tops chart") {
//       return measuresTop;
//     } else if (chart === "bottoms chart") {
//       return measuresBottom;
//     } else if (chart === "footwears chart") {
//       return measuresFoot;
//     }
//   };

//   //INPUT CHANGE HANDLERS

//   const handleSizeChartChange = (chart: string) => {
//     setProduct({
//       ...product,
//       sizeChart: chart,
//       selectedSizes: [],
//       productMeasures: [[]],
//     });
//   };

//   const handleSelectedSizesChange = (selectedOptions: string[]) => {
//     setProduct({
//       ...product,
//       selectedSizes: selectedOptions,
//       productMeasures: [...Array(selectedOptions.length)].map(() => []),
//     });
//   };

//   const handleSelectedColorsChange = (selectedOptions: string[]) => {
//     setProduct({ ...product, selectedColors: selectedOptions });
//   };

//   const handleImageUpload = (newImage: string) => {
//     setProduct({ ...product, images: [...product.images, newImage] });
//   };

//   //HANDLE VIEW
  
//   // const handleView = (id?: number) => {
//   //   const product = products.find((product) => product.id === id);
//   //   if (product) {
//   //     setProduct(product);
//   //     setModal(true);
//   //   }
//   // };

//   //HANDLE PRODUCT STATUS CHANGE 

//   const changeStatus = async (id?: number) => {
//     console.log(id);
//     try {
//       const prod = products.find((product) => product.id === id)!;
//       console.log(prod.status);
//       const response = await fetch(`http://localhost:5001/api/v1/product/update-status/${id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": "Bearer " + localStorage.getItem("token") 
//         },
//         body: JSON.stringify({
//           status: prod.status === "active" ? "disabled" : prod.status === "disabled" ? "active" : "",
//         }),
//       });
  
//       if (!response.ok) {
//         const error = await response.text();
//         throw new Error(error);
//       }
  
//       const newProducts = products.map((product) =>
//         product.id === id ? { ...product, status: prod.status === "active" ? "disabled" : "active" } : product
//       );

//       setAlertText(prod.status === "active" ? "disabled" : "active");
//       setProducts(newProducts);
//       setShowAlert(true);

//     } catch (error) {
//       window.alert(error);
//     }
//   };
  
//   //PAGINATION

//   const [currentPage, setCurrentPage] = useState(1);
//   const productsPerPage = {
//     xs: 4,
//     sm: 5,
//     md: 6,
//     lg: 10,
//     xl: 15,
//     xxl: 20,
//   };

//   const totalProducts = products.length;
//   const indexOfLastProduct = currentPage * productsPerPage.md;
//   const indexOfFirstProduct = indexOfLastProduct - productsPerPage.md;
//   const currentProducts = products.slice(
//     indexOfFirstProduct,
//     indexOfLastProduct
//   );

//   const handlePageChange = (pageNumber: number) => {
//     setCurrentPage(pageNumber);
//   };

//   const calculateTableHeight = () => {
//     const lineHeight = 50;
//     // Calculate the max height based on products to display per page
//     const maxProductsToShow = productsPerPage.md;
//     const maxTableHeight = lineHeight * maxProductsToShow;

//     return maxTableHeight;
//   };

//   //SEARCH
//   const handleSearch = (filteredProducts: Product[]) => {
//     setProducts(filteredProducts);
//   };

//   //FILTER
//   const [filter, setFilter] = useState(false);
//   const onFilter = () => {
//     setFilter(!filter);
//   };

//   const handleFilter = (selectedFilter: string) => {
//     let filteredProducts: Product[] = [];

//     if (selectedFilter === "Active") {
//       filteredProducts = products.filter(
//         (product) => product.status === "active"
//       );
//     } else if (selectedFilter === "Disabled") {
//       filteredProducts = products.filter(
//         (product) => product.status === "disabled"
//       );
//     } else if (selectedFilter === "Out of Stock") {
//       filteredProducts = products.filter((product) => product.stock === 0);
//     } else if (selectedFilter === "In Stock") {
//       filteredProducts = products.filter((product) => product.stock > 0);
//     } else {
//       setProducts([...originalProducts]);
//       setFilter(false);
//       return;
//     }

//     setProducts(filteredProducts);
//     setFilter(false);
//   };

//   //SORT
//   const [sort, setSort] = useState(false);
//   const onSort = () => {
//     setSort(!sort);
//   };

//   const handleSort = (selectedSort: string) => {
//     let sortedProducts: Product[] = [];

//     if (selectedSort === "Price: Low to High") {
//       sortedProducts = [...products].sort((a, b) => a.price - b.price);
//     } else if (selectedSort === "Price: High to Low") {
//       sortedProducts = [...products].sort((a, b) => b.price - a.price);
//     } else if (selectedSort === "Stock: Low to High") {
//       sortedProducts = [...products].sort((a, b) => a.stock - b.stock);
//     } else if (selectedSort === "Stock: High to Low") {
//       sortedProducts = [...products].sort((a, b) => b.stock - a.stock);
//     } else {
//       setProducts([...originalProducts]);
//       setSort(false);
//       return;
//     }

//     setProducts(sortedProducts);
//     setSort(false);
//   };

//   //RENDER ITEMS

//   return (
//     <div className="p-5 h-screen rounded-3xl bg-light">
//       {showAlert && (
//         <Alert
//           onClose={() => {
//             setShowAlert(false);
//           }}
//           style={`${
//             alertText === "active"
//               ? "bg-green-300"
//               : alertText === "disabled"
//               ? "bg-red-200"
//               : ""
//           } `}
//         >
//           Product {alertText === "active" ? "Activated" : "Disabled"}!
//         </Alert>
//       )}
//       <div className="m-3">
//         <h1 className="text-xl font-bold mb-4 text-deepblue">PRODUCTS</h1>
//         <div className="flex justify-between ">
//           <div className="flex space-x-2">
//             <Link to="add-products">
//               <MdAdd
//                 className="text-light bg-deepblue cursor-pointer text-4xl shadow-md 
//              hover:bg-purple rounded-full p-1.5 "
//               />
//             </Link>
//           </div>
//           <div className="relative">
//             <div className="flex">
//               <CiFilter
//                 className="text-deepblue cursor-pointer text-2xl mt-1 hover:text-purple"
//                 onClick={onFilter}
//               />
//               <PiSortAscending
//                 className="text-deepblue cursor-pointer text-2xl mt-1 mr-2  hover:text-purple"
//                 onClick={onSort}
//               />
//               <SearchBar
//                 onSearch={handleSearch}
//                 contents={products}
//                 base={"SKU"}
//               />
//             </div>
//             {filter && (
//               <Filter
//                 style=""
//                 filterItems={[
//                   "All",
//                   "Active",
//                   "Disabled",
//                   "Out of Stock",
//                   "In Stock",
//                 ]}
//                 isOpen={filter}
//                 handleFilter={handleFilter}
//               />
//             )}
//             {sort && (
//               <Sort
//                 style=""
//                 sortItems={[
//                   "All",
//                   "Price: Low to High",
//                   "Price: High to Low",
//                   "Stock: Low to High",
//                   "Stock: High to Low",
//                 ]}
//                 isOpen={sort}
//                 handleSort={handleSort}
//               />
//             )}
//           </div>
//         </div>
//       </div>

//       {/* UPDATE FORM */}
//       {showDrawer && (
//         <Drawer
//           header="UPDATE PRODUCT"
//           isOpen={true}
//           onClose={() => setShowDrawer(false)}
//         >
//           <Form style="m-2" onSubmit={handleSubmit}>
//             <span
//               className={`cursor-pointer p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50
//                 ${
//                   product.status === "active"
//                     ? "text-green-800 bg-green-200"
//                     : "text-red-800 bg-red-200"
//                 }`}
//               onClick={() =>
//                 setProduct({
//                   ...product,
//                   status: product.status === "active" ? "disabled" : "active",
//                 })
//               }
//             >
//               {product.status === "active" ? "active" : "disabled"}
//             </span>
//             <div className="flex mt-5">
//               <InputField
//                 type="text"
//                 id="SKU"
//                 value={product.sku}
//                 onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
//                   setProduct({ ...product, sku: e.target.value });
//                 }}
//                 label="SKU"
//                 inputStyle="mr-2 w-12"
//                 labelStyle="mr-2"
//                 error={errors.SKU}
//               />
//               <InputField
//                 type="text"
//                 id="name"
//                 value={product.name}
//                 onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
//                   setProduct({ ...product, name: e.target.value });
//                 }}
//                 label="Name"
//                 inputStyle="ml-2 w-20"
//                 labelStyle="ml-2"
//                 error={errors.name}
//               />
//             </div>
//             <TextArea
//               id="description"
//               value={product.description as string}
//               onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
//                 setProduct({ ...product, description: e.target.value });
//               }}
//               rows={5}
//               label="Description"
//             />
//             <Select
//               id="category"
//               label="Category"
//               options={categories}
//               option={product.category?.name as string}
//               onChange={(category) => {
//                 const cat = {id: category as string, name: category as string}
//                 setProduct({ ...product, category: cat });
//               }}
//             />
//             {/* <Select id="subCategory" label="Sub Category" options={categories[subOptions]} /> */}
//             <Carousel images={product.images} />
//             <Image
//               onImageUpload={handleImageUpload}
//               multiple={true}
//               error={errors.images}
//             />
//             <Select
//               id="colors"
//               label="Colors"
//               options={colors}
//               multiple={true}
//               styleSelect="w-44 ml-2"
//               option={product.selectedColors as string[]}
//               onChange={(selectedOptions) => {
//                 handleSelectedColorsChange(selectedOptions as string[]);
//               }}
//             />
//             <Select
//               id="sizeChart"
//               label="Size Chart"
//               options={sizecharts}
//               option={product.sizeChart}
//               error={errors.sizeChart}
//               onChange={(chart) => {
//                 handleSizeChartChange(chart as string);
//               }}
//             />
//             <Select
//               id="sizes"
//               label="Sizes Units"
//               options={sizing(product.sizeChart) as any}
//               multiple={true}
//               error={errors.selectedSizes}
//               option={product.selectedSizes}
//               onChange={(selectedOptions) => {
//                 handleSelectedSizesChange(selectedOptions as string[]);
//               }}
//             />
//             {product.selectedSizes && product.selectedSizes.length > 0 && (
//               <SizeChart
//                 onChange={(productMeasures) => {
//                   setProduct({ ...product, productMeasures });
//                 }}
//                 initialMeasurements={JSON.parse(product?.measures ?? "[]") as number[][]}
//                 rowLabels={product.selectedSizes}
//                 columnLabels={sizingMeasures(product.sizeChart) as any}
//               />
//             )}
//             <div className="flex justify-between">
//               <InputField
//                 type="number"
//                 id="price"
//                 value={product.price.toString()}
//                 onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
//                   setProduct({ ...product, price: parseInt(e.target.value) });
//                 }}
//                 label="Price"
//                 inputStyle="mr-2 w-24"
//               />
//               <InputField
//                 type="number"
//                 id="stock"
//                 value={product.stock.toString()}
//                 onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
//                   setProduct({ ...product, stock: parseInt(e.target.value) });
//                 }}
//                 label="Stock"
//                 labelStyle="ml-2"
//                 inputStyle="ml-2 w-24"
//               />
//             </div>
//             <div className="flex justify-end">
//               <Button type="submit" style="w-20 justify-center">
//                 Save
//               </Button>
//             </div>
//           </Form>
//         </Drawer>
//       )}

//       {/* VIEW PRODUCT */}
//       <Modal isOpen={modal} onClose={() => setModal(false)}>
//         <div className="mb-4">
//           <p className="text-lg font-bold">
//             {product.sku} {product.name}
//           </p>
//         </div>
//         <div className="flex mb-4">
//           <p className="text-medium font-bold">Stock: {product.stock} </p>
//           <div className="text-medium font-medium ">
//             <span
//               className={`p-1.5 ml-4 text-xs font-medium uppercase tracking-wider rounded-lg bg-opacity-50 
//                   ${
//                     product.status == "active"
//                       ? "text-green-100 bg-green-400"
//                       : "text-red-100 bg-red-400"
//                   }`}
//             >
//               {product.status}
//             </span>
//           </div>
//         </div>
//         <div className="flex justify-between">
//           <div className="flex">
//             <div className="flex flex-col space-y-2">
//               <div className="text-sm font-medium ">{product.description}</div>
//               <div className="text-sm font-medium ">Rs. {product.price}</div>
//               <div className="text-sm font-medium ">
//                 Category: {product.category?.name}
//               </div>
//               {/* <div className="text-sm font-medium ">
//                 Product Type: {product.productType}
//               </div> */}
//               <div className="text-sm font-medium ">Selected Colors: </div>
//               <div className="text-sm ">
//                 {product.selectedColors &&
//                   product.selectedColors.length > 0 &&
//                   product.selectedColors?.join(", ")}
//               </div>
//             </div>
//           </div>
//           <div className="flex flex-col">
//             <div className="text-sm font-medium ">
//               Images:{" "}
//               {product.images &&
//                 product.images.length > 0 &&
//                 product.images.map((image, index) => (
//                   <div key={index}>
//                     <img src={image} alt="product" className="w-20 h-20" />
//                   </div>
//                 ))}
//             </div>
//             <div className="text-sm font-medium mt-3">
//               Size Chart: {product.sizeChart}
//             </div>
//             <div className="w-72">
//               <SizeChart
//                 rowLabels={product.selectedSizes}
//                 columnLabels={
//                   product.sizeChart === "tops chart"
//                     ? measuresTop
//                     : product.sizeChart === "bottoms chart"
//                     ? measuresBottom
//                     : measuresFoot
//                 }
//                 initialMeasurements={product.productMeasures}
//               />
//             </div>
//           </div>
//         </div>
//       </Modal>

//       {/* DESKTOP VIEW */}
//       <Table style={{ maxHeight: calculateTableHeight() }}>
//         <Thead>
//           <tr>
//             <Th style="w-20">SKU</Th>
//             <Th style="w-32">Name</Th>
//             <Th style="w-52">Description</Th>
//             <Th style="w-24">Price</Th>
//             <Th style="w-32">Stock</Th>
//             <Th style="w-24">Status</Th>
//             <Th style="w-24">Action</Th>
//           </tr>
//         </Thead>
//         <Tbody>
//           {currentProducts.map((product) => (
//             <Trow key={product.sku}>
//               <Tdata>{product.sku}</Tdata>
//               <Tdata>{product.name}</Tdata>
//               <Tdata>{product.description}</Tdata>
//               <Tdata>Rs. {product.price}</Tdata>
//               <Tdata
//                 style={`${product.stock > 10 ? "" : "font-bold text-red-500"}`}
//               >
//                 {product.stock == 0 ? (
//                   <div>Out of stock</div>
//                 ) : (
//                   <div>
//                     {product.stock > 10 ? product.stock : product.stock + "*"}
//                   </div>
//                 )}
//               </Tdata>
//               <Tdata>
//                 <span
//                   className={`p-1.5 text-xs font-medium uppercase tracking-wider rounded-lg bg-opacity-50 cursor-pointer
//                     ${
//                       product.status == "active"
//                         ? "text-green-800 bg-green-200"
//                         : "text-red-800 bg-red-200"
//                     }`}
//                   onClick={() => changeStatus(product.id)}
//                 >
//                   {product.status}
//                 </span>
//               </Tdata>
//               <Tdata>
//                 <div className="flex space-x-2">
//                   <RiEdit2Line
//                     className="text-blue-500 cursor-pointer"
//                     onClick={() => handleEdit(product.id)}
//                   />
//                   <RiDeleteBin6Line
//                     className="text-red-500 cursor-pointer"
//                     onClick={() => handleDelete(product.id)}
//                   />
//                   {/* <RiEyeLine
//                     className="text-yellow-500 cursor-pointer"
//                     onClick={() => handleView(product.id)}
//                   /> */}
//                 </div>
//               </Tdata>
//             </Trow>
//           ))}
//         </Tbody>
//       </Table>
//       <Pagination
//         contents={products}
//         currentPage={currentPage}
//         contentsPerPage={productsPerPage}
//         handlePageChange={handlePageChange}
//         totalPages={Math.ceil(totalProducts / productsPerPage.md)}
//       />

//       {/* MOBILE VIEW */}

//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
//         {currentProducts.map((product) => (
//           <div
//             className="bg-white space-y-3 p-4 rounded-lg shadow"
//             key={product.sku}
//           >
//             <div className="flex items-center space-x-2 text-sm">
//               <div>{product.sku}</div>
//               <div className="text-gray-500">{product.name}</div>
//               <div>
//                 <span
//                   className={`p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50 cursor-pointer
//                 ${
//                   product.status == "active"
//                     ? "text-green-800 bg-green-200"
//                     : "text-red-800 bg-red-200"
//                 }`}
//                   onClick={() => changeStatus(product.id)}
//                 >
//                   {product.status}
//                 </span>
//               </div>
//             </div>
//             <div className="text-sm text-gray truncate">{product.description}</div>
//             <div className="text-sm font-medium text-black">
//               Rs. {product.price}
//             </div>
//             <div
//               className={`${
//                 product.stock > 10 ? "text-gray" : "font-bold text-red-500"
//               }`}
//             >
//               {product.stock == 0 ? (
//                 <div>Out of stock</div>
//               ) : (
//                 <div>
//                   {product.stock > 10 ? product.stock : product.stock + "*"}
//                 </div>
//               )}
//             </div>
//             <div className="flex space-x-2">
//               <RiEdit2Line
//                 className="text-blue-500 cursor-pointer"
//                 onClick={() => handleEdit(product.id)}
//               />
//               <RiDeleteBin6Line
//                 className="text-red-500 cursor-pointer"
//                 onClick={() => handleDelete(product.id)}
//               />
//               {/* <RiEyeLine
//                 className="text-yellow-500 cursor-pointer"
//                 onClick={() => handleView(product.id)}
//               /> */}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Products;


import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

//ICONS
import { RiDeleteBin6Line, RiEdit2Line, RiEyeLine } from "react-icons/ri";
import { PiSortAscending } from "react-icons/pi";
import { CiFilter } from "react-icons/ci";
import { MdAdd } from "react-icons/md";

//COMPONENTS
import {
  Alert,
  Button,
  Carousel,
  Drawer,
  Form,
  InputField,
  Modal,
  Image,
  Pagination,
  SearchBar,
  Select,
  SizeChart,
  Table,
  Tbody,
  Tdata,
  TextArea,
  Th,
  Thead,
  Trow,
  Filter,
  Sort,
} from "../../components";

interface Product {
  id?: number;
  sku: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  status: string;
  category?: string;
  // subCategory?: string; //hold
  images: string[];
  // type: string;
  selectedSizes: string[];
  selectedColors?: string[] | null;
  sizeChart: string;
  productMeasures?: number[][];
  measures?: string;
}

export const Products = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [modal, setModal] = useState(false);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [product, setProduct] = useState<Product>({
    id: 0,
    sku: "",
    name: "",
    description: "",
    price: 0,
    stock: 0,
    status: "active",
    category: "",
    images: [],
    selectedSizes: [],
    selectedColors: [],
    sizeChart: "",
    productMeasures: [[]],
  });

  interface Category {
    id: string;
    value: string;
    label: string;
  }

  const [products, setProducts] = useState<Product[]>([]);
  const [originalProducts, setOriginalProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  // const categories = [
  //   {
  //     id: "ready-to-wear",
  //     value: "ready-to-wear",
  //     label: "Ready-to-wear",
  //   },
  //   {
  //     id: "winters",
  //     value: "winters",
  //     label: "winters",
  //   },
  // ];

  const colors = [
    { id: "1", value: "white", label: "White" },
    { id: "2", value: "beige", label: "Beige" },
    { id: "3", value: "pink", label: "Pink" },
    { id: "4", value: "sage", label: "Sage" },
    { id: "5", value: "plum", label: "Plum" },
  ];

  const sizecharts = [
    { id: "1", value: "tops chart", label: "Tops Chart" },
    { id: "2", value: "bottoms chart", label: "Bottoms Chart" },
    { id: "3", value: "footwears chart", label: "Footwear Chart" },
  ];

  const sizeUnitsTop = [
    { id: "2", value: "S", label: "S" },
    { id: "3", value: "M", label: "M" },
    { id: "4", value: "L", label: "L" },
    { id: "5", value: "XL", label: "XL" },
    { id: "6", value: "XXL", label: "XXL" },
  ];

  const sizeUnitsBottom = [
    { id: "1", value: "36", label: "36" },
    { id: "2", value: "40", label: "40" },
    { id: "3", value: "50", label: "50" },
    { id: "4", value: "0", label: "0" },
    { id: "5", value: "10", label: "10" },
    { id: "6", value: "34", label: "34" },
  ];

  const sizeUnitsFoot = [
    { id: "1", value: "US-9", label: "US-9" },
    { id: "2", value: "EU-10", label: "EU-10" },
    { id: "3", value: "EU-28", label: "EU-28" },
    { id: "4", value: "EU-20", label: "EU-20" },
    { id: "5", value: "EU-50", label: "EU-50" },
    { id: "6", value: "EU-36", label: "EU-36" },
  ];

  const measuresTop = [
    "Chest",
    "Length",
    "Waist",
    "burst",
    "Sleeves",
    "Armhole",
    "Neck",
    "Shoulder",
    "Cuff",
  ];
  const measuresBottom = ["Waist", "Hip", "Thigh", "Length", "Inseam", "Rise"];
  const measuresFoot = [
    "length",
    "heel",
    "ball",
    "width",
    "circumference",
    "shaft",
    "height",
  ];

  //FETCH DATA FROM API

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/v1/category/', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token') 
          },
        });
        
        if(!response.ok) {
          const error = await response.text();
          throw new Error(error);
        }

        const data = await response.json();
        const categories = data.result.map((category: {name: string}) => {
          return {
            id: category.name,
            value: category.name,
            label: category.name,
          };
        });
        setCategories(categories);
      } catch (error) {
        window.alert(error);
      }
    }
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/v1/product/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token") 
          }
        })
        if (!response.ok) {
          const error = await response.text();
          throw new Error(error);
        }
        const data = await response.json();
        setProducts(data.result);
        setOriginalProducts(data.result);
      } catch (error) {
        window.alert(error);
      }
    };
    fetchProducts();
    fetchCategories();
  }, []);

  //CRUD OPERATIONS

  //HANDLE DELETE
  const handleDelete = async (id?: number) => {
    try {
      const response = await fetch(`http://localhost:5001/api/v1/product/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("token")
        }
      });
      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== id)
      );
    } catch (error) {
      window.alert(error);
    }
  };

  //HANDLE UPDATE
  const handleEdit = (id?: number) => {
    const selectedProduct: Product = products.find(
      (product) => product.id === id
    )!;
    if (selectedProduct) {
      setProduct(selectedProduct);
      setShowDrawer(true);
    }
  };

  const validateForm = () => {
    if (
      product.sku === "" ||
      product.name === "" ||
      product.sizeChart === "" ||
      product.selectedSizes.length === 0 ||
      product.images.length === 0
    ) {
      setErrors({
        ...errors,
        SKU: product.sku === "" ? "SKU is required" : "",
        name: product.name === "" ? "Name is required" : "",
        sizeChart: product.sizeChart === "" ? "Select a Size Chart" : "",
        selectedSizes: product.selectedSizes.length === 0 ? "Select Sizes" : "",
        images: product.images.length === 0 ? "Insert at least one image" : "",
      });
      return false;
    }

    //check SKU presence
    const isSkuAlreadyExists = products.some(
      (prod) => prod.sku === product.sku && prod.id !== product.id
    );

    if (product.id && isSkuAlreadyExists) {
      setErrors({
        ...errors,
        SKU: "SKU already exists!",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }
    try {
      const response = await fetch(`http://localhost:5001/api/v1/product/${product.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify({
          ...product,
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }

      const updatedProducts = products.map((prod: Product) =>
        prod.id === product.id ? { ...product } : prod
      );

      console.log(updatedProducts);
      setProducts(updatedProducts);
      setErrors({});
      setShowDrawer(false);
      alert("success");
    } catch (error) {
      window.alert(error);
    }
  };

  //SIZING OPTIONS

  const sizing = (chart: string) => {
    if (chart === "tops chart") {
      return sizeUnitsTop;
    } else if (chart === "bottoms chart") {
      return sizeUnitsBottom;
    } else if (chart === "footwears chart") {
      return sizeUnitsFoot;
    }
  };

  const sizingMeasures = (chart: string) => {
    if (chart === "tops chart") {
      return measuresTop;
    } else if (chart === "bottoms chart") {
      return measuresBottom;
    } else if (chart === "footwears chart") {
      return measuresFoot;
    }
  };

  //INPUT CHANGE HANDLERS

  const handleSizeChartChange = (chart: string) => {
    setProduct({
      ...product,
      sizeChart: chart,
      selectedSizes: [],
      productMeasures: [[]],
    });
  };

  const handleSelectedSizesChange = (selectedOptions: string[]) => {
    setProduct({
      ...product,
      selectedSizes: selectedOptions,
      productMeasures: [...Array(selectedOptions.length)].map(() => []),
    });
  };

  const handleSelectedColorsChange = (selectedOptions: string[]) => {
    setProduct({ ...product, selectedColors: selectedOptions });
  };

  const handleImageUpload = (newImage: string) => {
    setProduct({ ...product, images: [...product.images, newImage] });
  };

  //HANDLE VIEW
  
  const handleView = (id?: number) => {
    const product = products.find((product) => product.id === id);
    if (product) {
      setProduct(product);
      setModal(true);
    }
  };

  //HANDLE PRODUCT STATUS CHANGE 

  const changeStatus = async (id?: number) => {
    console.log(id);
    try {
      const prod = products.find((product) => product.id === id)!;
      console.log(prod.status);
      const response = await fetch(`http://localhost:5001/api/v1/product/update-status/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("token") 
        },
        body: JSON.stringify({
          status: prod.status === "active" ? "disabled" : prod.status === "disabled" ? "active" : "",
        }),
      });
  
      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }
  
      const newProducts = products.map((product) =>
        product.id === id ? { ...product, status: prod.status === "active" ? "disabled" : "active" } : product
      );

      setAlertText(prod.status === "active" ? "disabled" : "active");
      setProducts(newProducts);
      setShowAlert(true);

    } catch (error) {
      window.alert(error);
    }
  };
  
  //PAGINATION

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = {
    xs: 4,
    sm: 5,
    md: 6,
    lg: 10,
    xl: 15,
    xxl: 20,
  };

  const totalProducts = products.length;
  const indexOfLastProduct = currentPage * productsPerPage.md;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage.md;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const calculateTableHeight = () => {
    const lineHeight = 50;
    // Calculate the max height based on products to display per page
    const maxProductsToShow = productsPerPage.md;
    const maxTableHeight = lineHeight * maxProductsToShow;

    return maxTableHeight;
  };

  //SEARCH
  const handleSearch = (filteredProducts: Product[]) => {
    setProducts(filteredProducts);
  };

  //FILTER
  const [filter, setFilter] = useState(false);
  const onFilter = () => {
    setFilter(!filter);
  };

  const handleFilter = (selectedFilter: string) => {
    let filteredProducts: Product[] = [];

    if (selectedFilter === "Active") {
      filteredProducts = products.filter(
        (product) => product.status === "active"
      );
    } else if (selectedFilter === "Disabled") {
      filteredProducts = products.filter(
        (product) => product.status === "disabled"
      );
    } else if (selectedFilter === "Out of Stock") {
      filteredProducts = products.filter((product) => product.stock === 0);
    } else if (selectedFilter === "In Stock") {
      filteredProducts = products.filter((product) => product.stock > 0);
    } else {
      setProducts([...originalProducts]);
      setFilter(false);
      return;
    }

    setProducts(filteredProducts);
    setFilter(false);
  };

  //SORT
  const [sort, setSort] = useState(false);
  const onSort = () => {
    setSort(!sort);
  };

  const handleSort = (selectedSort: string) => {
    let sortedProducts: Product[] = [];

    if (selectedSort === "Price: Low to High") {
      sortedProducts = [...products].sort((a, b) => a.price - b.price);
    } else if (selectedSort === "Price: High to Low") {
      sortedProducts = [...products].sort((a, b) => b.price - a.price);
    } else if (selectedSort === "Stock: Low to High") {
      sortedProducts = [...products].sort((a, b) => a.stock - b.stock);
    } else if (selectedSort === "Stock: High to Low") {
      sortedProducts = [...products].sort((a, b) => b.stock - a.stock);
    } else {
      setProducts([...originalProducts]);
      setSort(false);
      return;
    }

    setProducts(sortedProducts);
    setSort(false);
  };

  //RENDER ITEMS

  return (
    <div className="p-5 h-screen rounded-3xl bg-light">
      {showAlert && (
        <Alert
          onClose={() => {
            setShowAlert(false);
          }}
          style={`${
            alertText === "active"
              ? "bg-green-300"
              : alertText === "disabled"
              ? "bg-red-200"
              : ""
          } `}
        >
          Product {alertText === "active" ? "Activated" : "Disabled"}!
        </Alert>
      )}
      <div className="m-3">
        <h1 className="text-xl font-bold mb-4 text-deepblue">PRODUCTS</h1>
        <div className="flex justify-between ">
          <div className="flex space-x-2">
            <Link to="add-products">
              <MdAdd
                className="text-light bg-deepblue cursor-pointer text-4xl shadow-md 
             hover:bg-purple rounded-full p-1.5 "
              />
            </Link>
          </div>
          <div className="relative">
            <div className="flex">
              <CiFilter
                className="text-deepblue cursor-pointer text-2xl mt-1 hover:text-purple"
                onClick={onFilter}
              />
              <PiSortAscending
                className="text-deepblue cursor-pointer text-2xl mt-1 mr-2  hover:text-purple"
                onClick={onSort}
              />
              <SearchBar
                onSearch={handleSearch}
                contents={products}
                base={"SKU"}
              />
            </div>
            {filter && (
              <Filter
                style=""
                filterItems={[
                  "All",
                  "Active",
                  "Disabled",
                  "Out of Stock",
                  "In Stock",
                ]}
                isOpen={filter}
                handleFilter={handleFilter}
              />
            )}
            {sort && (
              <Sort
                style=""
                sortItems={[
                  "All",
                  "Price: Low to High",
                  "Price: High to Low",
                  "Stock: Low to High",
                  "Stock: High to Low",
                ]}
                isOpen={sort}
                handleSort={handleSort}
              />
            )}
          </div>
        </div>
      </div>

      {/* UPDATE FORM */}
      {showDrawer && (
        <Drawer
          header="UPDATE PRODUCT"
          isOpen={true}
          onClose={() => setShowDrawer(false)}
        >
          <Form style="m-2" onSubmit={handleSubmit}>
            <span
              className={`cursor-pointer p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50
                ${
                  product.status === "active"
                    ? "text-green-800 bg-green-200"
                    : "text-red-800 bg-red-200"
                }`}
              onClick={() =>
                setProduct({
                  ...product,
                  status: product.status === "active" ? "disabled" : "active",
                })
              }
            >
              {product.status === "active" ? "active" : "disabled"}
            </span>
            <div className="flex mt-5">
              <InputField
                type="text"
                id="SKU"
                value={product.sku}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setProduct({ ...product, sku: e.target.value });
                }}
                label="SKU"
                inputStyle="mr-2 w-12"
                labelStyle="mr-2"
                error={errors.SKU}
              />
              <InputField
                type="text"
                id="name"
                value={product.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setProduct({ ...product, name: e.target.value });
                }}
                label="Name"
                inputStyle="ml-2 w-20"
                labelStyle="ml-2"
                error={errors.name}
              />
            </div>
            <TextArea
              id="description"
              value={product.description as string}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setProduct({ ...product, description: e.target.value });
              }}
              rows={5}
              label="Description"
            />
            <Select
              id="category"
              label="Category"
              options={categories}
              option={product.category as string}
              onChange={(category) => {
                setProduct({ ...product, category: category as string });
              }}
            />
            {/* <Select id="subCategory" label="Sub Category" options={categories[subOptions]} /> */}
            <Carousel images={product.images} />
            <Image
              onImageUpload={handleImageUpload}
              multiple={true}
              error={errors.images}
            />
            <Select
              id="colors"
              label="Colors"
              options={colors}
              multiple={true}
              styleSelect="w-44 ml-2"
              option={product.selectedColors as string[]}
              onChange={(selectedOptions) => {
                handleSelectedColorsChange(selectedOptions as string[]);
              }}
            />
            <Select
              id="sizeChart"
              label="Size Chart"
              options={sizecharts}
              option={product.sizeChart}
              error={errors.sizeChart}
              onChange={(chart) => {
                handleSizeChartChange(chart as string);
              }}
            />
            <Select
              id="sizes"
              label="Sizes Units"
              options={sizing(product.sizeChart) as any}
              multiple={true}
              error={errors.selectedSizes}
              option={product.selectedSizes}
              onChange={(selectedOptions) => {
                handleSelectedSizesChange(selectedOptions as string[]);
              }}
            />
            {product.selectedSizes && product.selectedSizes.length > 0 && (
              <SizeChart
                onChange={(productMeasures) => {
                  setProduct({ ...product, productMeasures });
                }}
                initialMeasurements={JSON.parse(product?.measures ?? "[]") as number[][]}
                rowLabels={product.selectedSizes}
                columnLabels={sizingMeasures(product.sizeChart) as any}
              />
            )}
            <div className="flex justify-between">
              <InputField
                type="number"
                id="price"
                value={product.price.toString()}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setProduct({ ...product, price: parseInt(e.target.value) });
                }}
                label="Price"
                inputStyle="mr-2 w-24"
              />
              <InputField
                type="number"
                id="stock"
                value={product.stock.toString()}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setProduct({ ...product, stock: parseInt(e.target.value) });
                }}
                label="Stock"
                labelStyle="ml-2"
                inputStyle="ml-2 w-24"
              />
            </div>
            <div className="flex justify-end">
              <Button type="submit" style="w-20 justify-center">
                Save
              </Button>
            </div>
          </Form>
        </Drawer>
      )}

      {/* VIEW PRODUCT */}
      <Modal isOpen={modal} onClose={() => setModal(false)}>
        <div className="mb-4">
          <p className="text-lg font-bold">
            {product.sku} {product.name}
          </p>
        </div>
        <div className="flex mb-4">
          <p className="text-medium font-bold">Stock: {product.stock} </p>
          <div className="text-medium font-medium ">
            <span
              className={`p-1.5 ml-4 text-xs font-medium uppercase tracking-wider rounded-lg bg-opacity-50 
                  ${
                    product.status == "active"
                      ? "text-green-100 bg-green-400"
                      : "text-red-100 bg-red-400"
                  }`}
            >
              {product.status}
            </span>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex">
            <div className="flex flex-col space-y-2">
              <div className="text-sm font-medium ">{product.description}</div>
              <div className="text-sm font-medium ">Rs. {product.price}</div>
              <div className="text-sm font-medium ">
                Category: {product.category}
              </div>
              {/* <div className="text-sm font-medium ">
                Product Type: {product.productType}
              </div> */}
              <div className="text-sm font-medium ">Selected Colors: </div>
              <div className="text-sm ">
                {product.selectedColors &&
                  product.selectedColors.length > 0 &&
                  product.selectedColors?.join(", ")}
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="text-sm font-medium ">
              Images:{" "}
              {product.images &&
                product.images.length > 0 &&
                product.images.map((image, index) => (
                  <div key={index}>
                    <img src={image} alt="product" className="w-20 h-20" />
                  </div>
                ))}
            </div>
            <div className="text-sm font-medium mt-3">
              Size Chart: {product.sizeChart}
            </div>
            <div className="w-72">
              <SizeChart
                rowLabels={product.selectedSizes}
                columnLabels={
                  product.sizeChart === "tops chart"
                    ? measuresTop
                    : product.sizeChart === "bottoms chart"
                    ? measuresBottom
                    : measuresFoot
                }
                initialMeasurements={product.productMeasures}
              />
            </div>
          </div>
        </div>
      </Modal>

      {/* DESKTOP VIEW */}
      <Table style={{ maxHeight: calculateTableHeight() }}>
        <Thead>
          <tr>
            <Th style="w-20">SKU</Th>
            <Th style="w-32">Name</Th>
            <Th style="w-52">Description</Th>
            <Th style="w-24">Price</Th>
            <Th style="w-32">Stock</Th>
            <Th style="w-24">Status</Th>
            <Th style="w-24">Action</Th>
          </tr>
        </Thead>
        <Tbody>
          {currentProducts.map((product) => (
            <Trow key={product.sku}>
              <Tdata>{product.sku}</Tdata>
              <Tdata>{product.name}</Tdata>
              <Tdata>{product.description}</Tdata>
              <Tdata>Rs. {product.price}</Tdata>
              <Tdata
                style={`${product.stock > 10 ? "" : "font-bold text-red-500"}`}
              >
                {product.stock == 0 ? (
                  <div>Out of stock</div>
                ) : (
                  <div>
                    {product.stock > 10 ? product.stock : product.stock + "*"}
                  </div>
                )}
              </Tdata>
              <Tdata>
                <span
                  className={`p-1.5 text-xs font-medium uppercase tracking-wider rounded-lg bg-opacity-50 cursor-pointer
                    ${
                      product.status == "active"
                        ? "text-green-800 bg-green-200"
                        : "text-red-800 bg-red-200"
                    }`}
                  onClick={() => changeStatus(product.id)}
                >
                  {product.status}
                </span>
              </Tdata>
              <Tdata>
                <div className="flex space-x-2">
                  <RiEdit2Line
                    className="text-blue-500 cursor-pointer"
                    onClick={() => handleEdit(product.id)}
                  />
                  <RiDeleteBin6Line
                    className="text-red-500 cursor-pointer"
                    onClick={() => handleDelete(product.id)}
                  />
                  {/* <RiEyeLine
                    className="text-yellow-500 cursor-pointer"
                    onClick={() => handleView(product.id)}
                  /> */}
                </div>
              </Tdata>
            </Trow>
          ))}
        </Tbody>
      </Table>
      <Pagination
        contents={products}
        currentPage={currentPage}
        contentsPerPage={productsPerPage}
        handlePageChange={handlePageChange}
        totalPages={Math.ceil(totalProducts / productsPerPage.md)}
      />

      {/* MOBILE VIEW */}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
        {currentProducts.map((product) => (
          <div
            className="bg-white space-y-3 p-4 rounded-lg shadow"
            key={product.sku}
          >
            <div className="flex items-center space-x-2 text-sm">
              <div>{product.sku}</div>
              <div className="text-gray-500">{product.name}</div>
              <div>
                <span
                  className={`p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50 cursor-pointer
                ${
                  product.status == "active"
                    ? "text-green-800 bg-green-200"
                    : "text-red-800 bg-red-200"
                }`}
                  onClick={() => changeStatus(product.id)}
                >
                  {product.status}
                </span>
              </div>
            </div>
            <div className="text-sm text-gray truncate">{product.description}</div>
            <div className="text-sm font-medium text-black">
              Rs. {product.price}
            </div>
            <div
              className={`${
                product.stock > 10 ? "text-gray" : "font-bold text-red-500"
              }`}
            >
              {product.stock == 0 ? (
                <div>Out of stock</div>
              ) : (
                <div>
                  {product.stock > 10 ? product.stock : product.stock + "*"}
                </div>
              )}
            </div>
            <div className="flex space-x-2">
              <RiEdit2Line
                className="text-blue-500 cursor-pointer"
                onClick={() => handleEdit(product.id)}
              />
              <RiDeleteBin6Line
                className="text-red-500 cursor-pointer"
                onClick={() => handleDelete(product.id)}
              />
              {/* <RiEyeLine
                className="text-yellow-500 cursor-pointer"
                onClick={() => handleView(product.id)}
              /> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;

