import React from "react";
interface Props {
    children: React.ReactNode;
}
export const Thead: React.FC<Props> = ({children}) => {
  return (
    <thead className="bg-deepblue border-b-2 border-lightpurple top-0 sticky ">
        {children}
    </thead>
  );
};

export default Thead;
