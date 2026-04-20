import React from 'react';

interface Props {
  children: React.ReactNode;
  style?: string; 
}

export const Tdata: React.FC<Props> = ({ children, style }) => {
  return (
    <td className={`p-3 text-sm text-black whitespace-nowrap overflow-hidden ${style}`}>
      <div className="truncate">{children}</div>
    </td>
  );
};

export default Tdata;
