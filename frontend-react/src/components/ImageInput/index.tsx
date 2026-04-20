import React, { ChangeEvent, useState } from "react";

interface ImageInputProps {
  onChange: (file: File) => void;
  label: string;
  required?: boolean;
}

export const ImageInput: React.FC<ImageInputProps> = ({
  onChange,
  label,
  required,
}) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const generateUniqueId = () => {
    return `imageInput-${Math.floor(Math.random() * 1000)}`;
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;

    if (fileList && fileList.length > 0) {
      const selectedFile = fileList[0];
      onChange(selectedFile);

      // Display a preview of the selected image
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const inputId = generateUniqueId();

  return (
    <div
      className={`flex flex-col items-center border shadow-border rounded-lg p-4 ${
        required ? "required" : ""
      }`}
    >
      {label && (
        <label
          htmlFor={inputId}
          className="cursor-pointer mb-2 text-sm font-medium"
        >
          {label}
        </label>
      )}
      <label
        htmlFor={inputId}
        className="cursor-pointer w-32 h-32 bg-gray-300 relative rounded-full overflow-hidden"
      >
        {previewImage ? (
          <img
            src={previewImage}
            alt="Preview"
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-lightpurple rounded-full">
            <span className="text-gray-600 text-center">Upload Image</span>
          </div>
        )}
      </label>
      <input
        type="file"
        id={inputId}
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
        required={required}
      />
    </div>
  );
};

export default ImageInput;
