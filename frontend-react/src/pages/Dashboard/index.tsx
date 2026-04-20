import { Outlet, useNavigate } from "react-router-dom";
import { Navbar, Sidebar } from "../../components";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { BiPackage } from "react-icons/bi";
import { FaShop } from "react-icons/fa6";
import { GrAnalytics } from "react-icons/gr";
import { IoMdSettings } from "react-icons/io";
import { MdInventory } from "react-icons/md";
import { useEffect, useState } from "react";

interface Order {
  id: number; //order number
  status: string;
}

export const Dashboard = () => {

  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  const navItemsRight = [
    {
      link: "Logout",
      path: "!logout",
      icon: <RiLogoutCircleRLine/>
    },
  ];

  const sidebarItems = [
    { title: "Insights", link: "insights", icon: <GrAnalytics />, spacing: true },
    {
      title: "Inventory",
      link: "products",
      icon: <MdInventory />,
      submenu: true,
      subItems: [
        { title: "Products", link: "products" },
        { title: "Sales", link: "sales" },
      ],
    },
    { title: "Orders", link: "orders", icon: <BiPackage />, badge: count },
    { title: "My Shop", link: "shop", icon: <FaShop />, spacing: true },
    { title: "Settings", link: "settings", icon: <IoMdSettings /> },
  ];

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/v1/user/@me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token"),
          },
        });

        if (!response.ok) {
          console.log("Error fetching user");
          navigate("/sign-in");
          return;
        }

        // navigate("/dashboard");

      } catch (error) {
        console.error(error);
      }
    }

    fetchUser();

    //fetch orders
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/v1/order/shop-orders", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token"),
          },
        });

        if (!response.ok) {
          console.log("Error fetching orders");
          return;
        }
        console.log("orders fetched");
        const data = await response.json();
        const orders = data.result;
        console.log(orders);
        if (orders.length > 0) {
          const pendingOrders = orders.filter((order: any) => order.status === "PENDING");
          setCount(pendingOrders.length);
        }
      }
      catch (error) {
        console.error(error);
      }
    } 
    console.log("hello from dashboard");
    fetchOrders();
  }, []);

  return (
    <div className="relative bg-slate-100 w-full h-screen overflow-auto bg-gray-200 ">
      <Navbar navItemsRight={navItemsRight} />
      <div className="flex absolute top-[60px] inset-0">
        <Sidebar sidebarItems={sidebarItems} />
        <div className="m-5 shadow-gray w-full h-screen overflow-auto rounded-3xl shadow-lg">
           <Outlet />
           
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
