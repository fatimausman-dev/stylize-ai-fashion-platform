import { OrdersCard } from "..";

interface Props {
  title: string;
  earnings: number;

  ordersCardtitle: string;
  count: string;
  productsCount: string;
}

export const EarnigsCard: React.FC<Props> = ({ title, earnings, ordersCardtitle, count, productsCount }) => {
  return (
    <div className="w-full items-center justify-between mb-4">
      <p className="text-lg font-bold text-deepblue">{title}</p>
      <p className="text-xl text-gray pb-4">Rs. {earnings}</p>
      <OrdersCard title={ordersCardtitle} count={count} productsCount={productsCount} />
    </div>
  );
};

export default EarnigsCard;
