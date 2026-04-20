import React from "react";

interface Props {
  children: React.ReactNode;
  style?: string
}
export const Th: React.FC<Props> = ({ children, style }) => {
  return (
    <th className={`p-3 text-sm text-light font-semibold tracking-wide text-left ${style}`}>
      {children}
    </th>
  );
};

export default Th;
