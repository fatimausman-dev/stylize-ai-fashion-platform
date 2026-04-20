import { useEffect, useState } from "react";
import {
  Alert,
  Table,
  Tbody,
  Tdata,
  Th,
  Thead,
  Trow,
  Modal,
  Filter,
  Pagination,
} from "../../components";
import { RiDeleteBin6Line, RiEyeLine } from "react-icons/ri";
import { CiFilter } from "react-icons/ci";

interface Product {
  id: number;
  name: string;
  price: number;
  images: string[];
}

interface OrderDetail {
  quantity: number;
  size: string;
  color: string;
  subTotal: number;
  Product: Product;
}

interface Buyer {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  country: string;
  zip: string;
  user: {
    email: string;
    phone: string;
  };
}

interface Order {
  id: number;
  status: string;
  subTotal: number;
  shippingFee: number;
  total: number;
  Order: {
    date: string;
    paymentMethod: string;
    paymentStatus: string;
    Buyer: Buyer;
  };
  OrderDetails: OrderDetail[];
}

export const Orders = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [modal, setModal] = useState(false);

  const [order, setOrder] = useState<Order>({} as Order);
  const [orders, setOrders] = useState<Order[]>([]);

  console.log("hello from orders");
  const [originalOrders, setOriginalOrders] = useState<Order[]>([...orders]);

  useEffect(() => {
    console.log("Component Mounted");
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    console.log("fetching orders");
    try {
      const response = await fetch(
        "http://localhost:5001/api/v1/order/shop-orders",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }
      console.log("response successful");
      const data = await response.json();
      console.log(data.result);
      setOrders(data.result);
      setOriginalOrders(data.result);
    } catch (error) {
      window.alert(error);
    }
  };

  const changeStatus = async (id: number) => {
    const order = orders.find((order) => order.id === id);
    console.log("Order", order, "id", id, "status", order?.status);
    const status =
      order?.status === "PENDING"
        ? "COMPLETED"
        : order?.status == "COMPLETED"
        ? "CANCELLED"
        : order?.status == "CANCELED"
        ? "PENDING"
        : "PENDING";
    try {
      const response = await fetch(
        `http://localhost:5001/api/v1/order/${id}/order-status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify({
            status,
          }),
        }
      );
      if (response.ok) {
        let newOrders = orders.map((order) => {
          if (order.id === id) {
            order.status === status;
            if (status === "COMPLETED") setAlertText("Completed");
            else if (status === "CANCELLED") setAlertText("Canceled");
            else if (status === "PENDING") setAlertText("Pending");
            return {
              ...order,
              status: status,
            };
          }
          return order;
        });
        setOrders(newOrders);
        setShowAlert(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleView = async (_id: number) => {
    console.log("View Order", orders, "id", _id);
    setOrder(orders.find((order) => order.id === _id) as Order);
    console.log("Order", order);
    setModal(true);
  };

  const handleDelete = async (_id: number) => {
    try {
      const response = await fetch(
        `http://localhost:5001/api/v1/order/${_id}/delete-retail-order`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (response.ok) {
        const newOrders = orders.filter((order) => order.id !== _id);
        setOrders(newOrders);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteAll = async () => {
    try {
      const response = await fetch(
        "http://localhost:5001/api/v1/order/delete-all",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (response.ok) {
        setOrders([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //FILTER
  const [filter, setFilter] = useState(false);
  const onFilter = () => {
    setFilter(!filter);
  };

  const handleFilter = (selectedFilter: string) => {
    let filteredOrders: Order[] = [];

    if (selectedFilter === "Pending") {
      filteredOrders = orders.filter((order) => order.status === "PENDING");
    } else if (selectedFilter === "Completed") {
      filteredOrders = orders.filter((order) => order.status === "COMPLETED");
    } else if (selectedFilter === "Canceled") {
      filteredOrders = orders.filter((order) => order.status === "CANCELED");
    } else {
      setOrders([...originalOrders]);
      setFilter(false);
      return;
    }

    setOrders(filteredOrders);
    setFilter(false);
  };

  //PAGINATION

  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = {
    xs: 4,
    sm: 5,
    md: 6,
    lg: 10,
    xl: 15,
    xxl: 20,
  };

  const totalOrders = orders.length;
  const indexOfLastOrder = currentPage * ordersPerPage.md;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage.md;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const calculateTableHeight = () => {
    const lineHeight = 50;
    // Calculate the max height based on products to display per page
    const maxProductsToShow = ordersPerPage.md;
    const maxTableHeight = lineHeight * maxProductsToShow;

    return maxTableHeight;
  };

  return (
    <div className="p-5 h-screen rounded-3xl bg-light">
      {showAlert && (
        <Alert
          onClose={() => {
            setShowAlert(false);
          }}
          style={`${
            alertText === "Completed"
              ? "bg-green-300"
              : alertText === "Canceled"
              ? "bg-red-200"
              : alertText === "Pending"
              ? "text-yellow-800 bg-yellow-200"
              : ""
          } `}
        >
          Order {alertText}!
        </Alert>
      )}
      <div className="m-3">
        <h1 className="text-xl font-bold mb-4 text-deepblue">ORDERS</h1>
      </div>
      <div className="flex mb-2">
        <RiDeleteBin6Line
          className="text-purple cursor-pointer text-lg hover:text-red-300"
          onClick={deleteAll}
        />
        <CiFilter
          className="text-deepblue cursor-pointer text-lg hover:text-purple"
          onClick={onFilter}
        />
      </div>
      {filter && (
        <Filter
          style=""
          filterItems={["All", "Pending", "Completed", "Canceled"]}
          isOpen={filter}
          handleFilter={handleFilter}
        />
      )}
      {/* DESKTOP VIEW */}
      <Table style={{ maxHeight: calculateTableHeight() }}>
        <Thead>
          <tr>
            <Th style="w-24">Order #</Th>
            <Th>Customer</Th>
            <Th style="w-24">Date</Th>
            <Th>Method</Th>
            <Th>Subtotal</Th>
            <Th>Shipping</Th>
            <Th>Total</Th>
            <Th style="w-24">Status</Th>
            <Th>Actions</Th>
          </tr>
        </Thead>
        {orders.length !== 0 ? (
          <Tbody>
            {currentOrders.map((order) => (
              <Trow key={order.id} style="hover:cursor-pointer">
                <Tdata>{order.id}</Tdata>
                <Tdata>
                  {order.Order.Buyer.firstName} {order.Order.Buyer.lastName}
                </Tdata>
                <Tdata>{order.Order.date}</Tdata>
                <Tdata>{order.Order.paymentMethod}</Tdata>
                <Tdata>{order.subTotal}</Tdata>
                <Tdata>{order.shippingFee}</Tdata>
                <Tdata>{order.total}</Tdata>
                <Tdata>
                  <span
                    className={`p-1.5 text-xs font-medium uppercase tracking-wider rounded-lg bg-opacity-50 cursor-pointer
                  ${
                    order.status === "COMPLETED"
                      ? "text-green-800 bg-green-200"
                      : order.status === "CANCELED"
                      ? "text-red-800 bg-red-200"
                      : order.status === "PENDING"
                      ? "text-yellow-800 bg-yellow-200"
                      : "text-gray"
                  }`}
                    onClick={() => changeStatus(order.id)}
                  >
                    {order.status}
                  </span>
                </Tdata>
                <Tdata>
                  <div className="flex space-x-2">
                    <RiDeleteBin6Line
                      className="text-red-500 cursor-pointer"
                      onClick={() => handleDelete(order.id)}
                    />
                    <RiEyeLine
                      className="text-yellow-500 cursor-pointer"
                      onClick={() => handleView(order.id)}
                    />
                  </div>
                </Tdata>
              </Trow>
            ))}
          </Tbody>
        ) : (
          <div className="flex items-center justify-center m-4">
            <p className="text-center text-gray">No Orders Yet</p>
          </div>
        )}
      </Table>
      <Pagination
        contents={orders}
        currentPage={currentPage}
        contentsPerPage={ordersPerPage}
        handlePageChange={handlePageChange}
        totalPages={Math.ceil(totalOrders / ordersPerPage.md)}
      />

      {/* MOBILE VIEW */}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
        {orders.length === 0 && (
          <p className="text-center text-gray">No Orders Yet</p>
        )}
        {currentOrders.map((order) => (
          <div
            className="bg-light space-y-3 p-4 rounded-lg shadow hover:bg-lighter hover:cursor-pointer"
            key={order.id}
          >
            <div className="flex items-center space-x-10 text-sm">
              <div className="text-deepblue">#{order.id}</div>
              <div>
                <span
                  className={`p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50 cursor-pointer
                  ${
                    order.status === "COMPLETED"
                      ? "text-green-800 bg-green-200"
                      : order.status === "CANCELED"
                      ? "text-red-800 bg-red-200"
                      : order.status === "PENDING"
                      ? "text-yellow-800 bg-yellow-200"
                      : "text-gray"
                  }`}
                  onClick={() => {
                    changeStatus(order.id);
                  }}
                >
                  {order.status}
                </span>
              </div>
            </div>
            <div className="text-sm text-gray">
              {order.Order.Buyer.firstName} {order.Order.Buyer.lastName}
            </div>
            <div className="text-sm text-gray">{order.Order.date}</div>
            <div className="flex justify-between">
              <div className="text-sm text-deepblue">Products Total</div>
              <div className="text-sm text-gray">{order.subTotal}</div>
            </div>
            <div className="flex justify-between">
              <div className="text-sm text-deepblue">Shipping </div>
              <div className="text-sm text-gray">{order.shippingFee}</div>
            </div>
            <div className="text-sm font-medium text-deepblue">
              Rs. {order.total}
            </div>
            <div className="text-sm text-gray">{order.Order.paymentMethod}</div>
            <div className="flex space-x-2">
              <RiDeleteBin6Line
                className="text-red-500 cursor-pointer"
                onClick={() => handleDelete(order.id)}
              />
              <RiEyeLine
                className="text-yellow-500 cursor-pointer"
                onClick={() => handleView(order.id)}
              />
            </div>
          </div>
        ))}
      </div>

      {/* VIEW ORDER */}
      <Modal
        isOpen={modal}
        onClose={() => {
          setModal(false);
        }}
      >
        <div className="items-center">
          <div className="flex mb-4">
            <p className="text-xl font-bold">Order #{order.id}</p>
            <div className="ml-5">
              <span
                className={`p-1.5 text-xs font-medium uppercase tracking-wider rounded-lg bg-opacity-50 
              ${
                order.status === "COMPLETED"
                  ? "text-green-100 bg-green-400"
                  : order.status === "CANCELED"
                  ? "text-red-100 bg-red-500"
                  : order.status === "PENDING"
                  ? "text-yellow-100 bg-yellow-300"
                  : "text-gray"
              }`}
              >
                {order.status}
              </span>
            </div>
          </div>
          {modal && (
            <p className="-mt-4 mb-3 text-sm">
              {order.Order.date ? order.Order.date : ""}
            </p>
          )}
          <div>
            <div>
              <p className="text-medium font-medium">Order Details</p>
              <div className="mt-2 rounded-md text-deepblue shadow-sm shadow-lighter bg-lighter max-h-24 overflow-y-auto">
                {order.OrderDetails &&
                  order.OrderDetails.length > 0 &&
                  order.OrderDetails.map((detail, index) => (
                    <div key={index}>
                      <div className="flex justify-between mx-4">
                        <p>{detail.Product.name}</p>
                        <p>Rs. {detail.subTotal}</p>
                      </div>
                      <p className="mx-4 text-xs">
                        {detail.quantity} x {detail.Product.price}{" "}
                      </p>
                    </div>
                  ))}
              </div>
              <div>
                <p className="text-medium font-medium mt-4">Payment Details</p>
                <div className="flex justify-between">
                  <p className="text-sm">Products Total</p>
                  <p className="text-sm">Rs. {order.subTotal}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm">Shipping</p>
                  <p className="text-sm">Rs. {order.shippingFee}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm">Order Total</p>
                  <p className="text-sm">Rs. {order.total}</p>
                </div>
                {modal && (
                  <p className="text-sm font-medium">
                    {order.Order.paymentMethod}
                  </p>
                )}
              </div>
            </div>
            {modal && order.Order.Buyer && (
              <div>
                <p className="text-medium font-medium mt-2">Customer Details</p>
                <p>
                  {order.Order.Buyer.firstName} {order.Order.Buyer.lastName}
                </p>
                <p>{order.Order.Buyer.address}</p>
                <div className="flex">
                  <p className="mr-2">{order.Order.Buyer.city}</p>
                  <p className="mr-2">{order.Order.Buyer.zip}</p>
                  <p>{order.Order.Buyer.country}</p>
                </div>
                <p className="text-medium font-medium mt-2">Customer Contact</p>
                <p>{order.Order.Buyer.user.email}</p>
                <p>{order.Order.Buyer.user.phone}</p>
              </div>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Orders;
