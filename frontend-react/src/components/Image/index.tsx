import React, { useState } from "react";
import { Button } from "..";

interface ImageUploadProps {
  onImageUpload: (image: string) => void;
  error?: string;
  multiple?: boolean;
}

export const Image: React.FC<ImageUploadProps> = ({
  onImageUpload,
  multiple,
  error,
}) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setPreviewImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = () => {
    if (selectedImage) {
      onImageUpload(previewImage || "");
      setSelectedImage(null);
    }
  };

  return (
    <div className={`mb-6 ${error ? "mb-8" : ""}`}>
      <div className="flex items-center justify-center bg-lighter rounded-lg p-2">
        <input
          multiple={multiple}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="mr-4 text-deepblue outline-none"
        />
        <Button onClick={handleImageUpload} disabled={!selectedImage}>
          Add
        </Button>
      </div>
      {error && <p className="text-red-500 text-sm mt-1 ">{error}</p>}
    </div>
  );
};

export default Image;
