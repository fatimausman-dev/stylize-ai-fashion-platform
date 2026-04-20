import { IoAnalytics } from "react-icons/io5";
import {
  CustomersCard,
  EarnigsCard,
  SalesChart,
  OrderChart,
} from "../../components";
import { useEffect, useState } from "react";
import { BiBulb } from "react-icons/bi";

interface Buyer {
  name: string;
  email: string;
  totalSpendings: number;
}

interface Product {
  name: string;
  quantity: number;
}

interface Data {
  totalEarnings: number;
  productsSold: number;
  topProducts: Product[];
  orders: number;
  buyers: Buyer[];
  monthlyOrders: [];
}

export const Insights = () => {
  const [data, setData] = useState<Data>({
    totalEarnings: 0,
    productsSold: 0,
    topProducts: [],
    orders: 0,
    buyers: [],
    monthlyOrders: [],
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://localhost:5001/api/v1/insights/retail",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const jsonData = await response.json();
      console.log(jsonData);
      setData(jsonData.result);
      console.log(data);
    } catch (error) {
      console.log("err");
    }
  };

  return (
    <div className="p-5 rounded-3xl bg-light">
      <div className="flex">
        <h1 className="text-2xl font-bold pr-2">Insights</h1>
        <IoAnalytics className="text-4xl text-deepblue" />
      </div>
      <div className="flex p-4 gap-8 w-full">
        <div>
          <div className="flex gap-8 mb-8 p-2 max-w-full">
            <div>
              <div className="flex pb-8 gap-8">
                <div className="w-full h-fit p-4 bg-light rounded-lg shadow-lg">
                  <EarnigsCard
                    title="Total Earnings"
                    earnings={data.totalEarnings}
                    ordersCardtitle="Orders"
                    count={data.orders.toString()}
                    productsCount={data.productsSold.toString()}
                  />
                </div>
              </div>
              <div className="w-full p-4 bg-light rounded-lg shadow-lg">
                <div className="flex gap-2">
                  <BiBulb className="text-3xl text-lightpurple" />
                  <p className="text-lg font-bold text-deepblue">
                    Best Sellers
                  </p>
                </div>
                <div className="mt-2 p-2">
                  {data.topProducts.map((product, index) => (
                    <div key={index} className="flex justify-between gap-2">
                      <p
                        key={index}
                        className="text-sm font-semibold text-gray truncate"
                      >
                        {product.name}
                      </p>
                      <p className="text-sm font-semibold text-gray ju">
                        {product.quantity}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-4 w-full bg-light rounded-lg shadow-lg">
              <OrderChart data={data.monthlyOrders} />
              {/* <Graph data={
                    [{
                    name: "Profits",
                    data: [{x: 1, y: 2}, {x: 2, y: 3}, {x: 3, y: 4}]
                    },
                    {
                    name: "Losses",
                    data: [{x: 1, y: -1}, {x: 2, y: 2}, {x: 3, y: 3}]
                    }
                ]
                }
                /> */}
            </div>
          </div>
          {/* <div className="w-full bg-light rounded-lg shadow-lg">
            <SalesChart />
          </div> */}
        </div>
        <div className="">
          <CustomersCard buyers={data.buyers} />
        </div>
      </div>
    </div>
  );
};

export default Insights;
