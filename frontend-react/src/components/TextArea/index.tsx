interface Props {
  id: any;
  value: string;
  onChange?: any;
  label: string;
  error?: string;
  rows?: number;
  textAreaStyle?: string;
  labelStyle?: string;
}

export const TextArea: React.FC<Props> = ({
  id,
  value,
  onChange,
  label,
  error,
  rows,
  textAreaStyle,
  labelStyle,
}) => {
  return (
    <div className={`mb-6 ${error ? "mb-8" : ""}`}>
      <label
        htmlFor={id}
        className={`block text-deepblue text-sm font-bold mb-2 ${labelStyle}`}
      >
        {label}
      </label>
      <textarea
        id={id}
        rows={rows}
        value={value}
        onChange={onChange}
        className={`block p-2.5 w-full text-sm text-deepblue bg-lighter rounded-lg border 
        focus:outline-none focus:ring-2 focus:ring-deepblue focus:ring-opacity-50 
        ${error ? "border-red-500" : "border-lighter"}
        ${textAreaStyle}`}
        placeholder=""
      ></textarea>
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
};

export default TextArea;
