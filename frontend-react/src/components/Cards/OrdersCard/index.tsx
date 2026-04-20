import { BiPackage } from "react-icons/bi";

interface Props {
  title: string;
  count: string;
  productsCount: string;
}

export const OrdersCard: React.FC<Props> = ({ title, count, productsCount }) => {
  let orders: number = parseInt(count);
  if (orders >= 1000 && orders < 1000000) {
    count = (orders / 1000).toFixed(2) + "K";
  } else if (orders >= 1000000 && orders < 1000000000) {
    count = (orders / 1000000).toFixed(2) + "M";
  } else if (orders >= 1000000000) {
    count = (orders / 1000000000).toFixed(2) + "B";
  }

  let productsSold: number = parseInt(productsCount);
  if (productsSold >= 1000 && productsSold < 1000000) {
    productsCount = (productsSold / 1000).toFixed(2) + "K";
  } else if (productsSold >= 1000000 && productsSold < 1000000000) {
    productsCount = (productsSold / 1000000).toFixed(2) + "M";
  } else if (productsSold >= 1000000000) {
    productsCount = (productsSold / 1000000000).toFixed(2) + "B";
  }


  return (
    <div>
      <div className="flex gap-10 h-fit">
        <div className="flex gap-2">
          <BiPackage className="text-3xl text-lightpurple" />
          <p className="text-lg font-bold text-deepblue">{title}</p>
        </div>
        <div className="text-center w-16 mr-2">
          {" "}
          <p className="text-xl text-gray">{count}</p>
        </div>
      </div>
      <p className="text-gray text-sm mt-2">Products Sold - {productsCount}</p>
    </div>
  );
};

export default OrdersCard;
