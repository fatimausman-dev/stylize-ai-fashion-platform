import React from "react";

interface Props {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export const Table: React.FC<Props> = ({ children, style }) => {
  return (
    <div className="rounded-lg shadow hidden md:block max-h-[80vh]">
      <table className="w-full table-fixed" style={style}>{children}</table>
    </div>
  );
};

export default Table;
