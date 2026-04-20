
interface TbodyProps {
    children: React.ReactNode;
}

export const Tbody: React.FC<TbodyProps> = ({ children }) => {
  return (
  <tbody className="divide-y divide-lightpurple">
    {children}
  </tbody>
  )
}

export default Tbody;