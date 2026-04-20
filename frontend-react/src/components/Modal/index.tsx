import { IoClose } from "react-icons/io5";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  style?: string
}

export const Modal: React.FC<Props> = ({ isOpen, onClose, children, style }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-lighter bg-opacity-50">
      <div className={`bg-deepblue text-light w-full sm:w-1/2 p-6 rounded-lg relative ${style}`}>
        <button
          type="button"
          className="absolute top-0 right-0 m-4 p-2 text-white"
          onClick={onClose}
        >
          <span className="sr-only">Dismiss</span>
          <IoClose className="w-5 h-5" />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
