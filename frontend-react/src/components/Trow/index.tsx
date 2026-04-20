import React from 'react'

interface Props {
    children: React.ReactNode;
    style?: string;
    onClick?: () => void;
}

export const Trow: React.FC<Props> = ({ children, style, onClick }) => {
  return (
    <tr onClick={onClick} className={` hover:bg-lighter ${style}`}>{children}</tr>
  )
}

export default Trow