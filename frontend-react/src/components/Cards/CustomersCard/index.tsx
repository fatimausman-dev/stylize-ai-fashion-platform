import React from "react";
import { HiUsers } from "react-icons/hi2";

interface Buyer {
  name: string;
  email: string;
  totalSpendings: number;
}

interface Props {
  buyers: Buyer[];
}

export const CustomersCard: React.FC<Props> = ({ buyers }) => {
  return (
    <div className="p-4 bg-light rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xl font-bold text-deepblue">Latest Customers</p>
          <p className="text-gray text-sm mt-2">Buyers and their spendings till date</p>
        </div>
        <HiUsers className="text-3xl text-lightpurple -mt-5 ml-8" />
      </div>
      <div>
        {buyers.length === 0 && (
          <p className="text-sm text-gray">No buyers yet!</p>
        
        )}
        {buyers.length > 0 && (
          <ul className="divide-y divide-lighter dark:divide-gray-700">
            {buyers.slice(0, 5).map((buyer, index) => (
              <li key={index} className="py-3 sm:py-4">
                <div className="flex items-center">
                  <div className="flex-1 min-w-0 ml-2">
                    <p className="text-sm font-medium text-purple truncate dark:text-white">{buyer.name}</p>
                    <p className="text-sm text-gray truncate dark:text-gray-400">{buyer.email}</p>
                  </div>
                  <div className="inline-flex items-center text-base font-semibold text-gray dark:text-white">Rs. {buyer.totalSpendings}</div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CustomersCard;
