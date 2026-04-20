import React from 'react'

interface Props {
    children: React.ReactNode;
    style?: string;
    onSubmit: any;
  }

export const Form: React.FC<Props> = ({children, style, onSubmit}) => {

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <form onSubmit={handleSubmit} className={`mb-6 ${style}`}>
        {children}
    </form>
  )
}

export default Form;

