import React, { useState } from "react";
import {
  Image,
  TextArea,
  Button,
  InputField,
  RadioList,
  Radio,
} from "../../components";
import { useNavigate } from "react-router-dom";

export const Profilesetup: React.FC = () => {
  const [businessName, setBusinessName] = useState("");
  const [productsType, setProductsType] = useState<string[]>([]); // TODO: Add products type to the form [e.g. tops, bottoms, footwear] etc.
  const [businessLogo, setBusinessLogo] = useState(""); // TODO: Add business logo to the form
  const [businessSynopsis, setBusinessSynopsis] = useState("");
  const [returnPolicy, setReturnPolicy] = useState("");
  const [refundPolicy, setRefundPolicy] = useState("");
  const [shippingInformation, setShippingInformation] = useState("");
  const [shippingRate, setShippingRate] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [selectedSocialMedia, setSelectedSocialMedia] = useState<string[]>([]);
  const [socialMediaUrls, setSocialMediaUrls] = useState<{
    [key: string]: string;
  }>({});

  const [errors, setErrors] = useState<{ [key: string]: string }>({}); // Validation errors
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors: { [key: string]: string } = {};
    if (!businessName) {
      validationErrors.businessName = "Business name is required";
    }

    if (!businessLogo) {
      validationErrors.businessLogo = "Logo is required";
    }

    if (productsType.length === 0) {
      validationErrors.productsType = "Select at least one product's type";
    }

    selectedSocialMedia.forEach((socialMedia) => {
      const url = socialMediaUrls[socialMedia];
      if (!url) {
        validationErrors[socialMedia] = `${socialMedia} URL is required`;
      }
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5001/api/v1/shop/business-info/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify({
            name: businessName,
            description: businessSynopsis,
            logo: businessLogo,
            productsType: productsType,
          }),
        }
      );
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }
    } catch (error) {
      if (error === "Shop name already exists") {
        setErrors({
          businessName: error as string,
        });
      }
    }

    try {
      const response = await fetch(
        `http://localhost:5001/api/v1/shop/contact-info/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify({
            phone: phoneNumber,
            email: email,
            socials: selectedSocialMedia,
          }),
        }
      );
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error(error);
    }

    try {
      const response = await fetch(
        "http://localhost:5001/api/v1/shop/policy-info/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify({
            returnPolicy: returnPolicy,
            refund: refundPolicy,
            shipping: shippingInformation,
            shippingFee: shippingRate,
          }),
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      navigate("/payment");
    } catch (error) {
      console.error(error);
    }
  };

  const handleBackClick = () => {
    const isConfirmed = window.confirm(
      "If you go back, your information will be lost. Are you sure you want to proceed?"
    );

    if (isConfirmed) {
      navigate("/sign-in");
    } else {
      return;
    }
  };

  const handleSocialMediaChange = (value: string) => {
    if (selectedSocialMedia.includes(value)) {
      setSelectedSocialMedia((prevSelected) =>
        prevSelected.filter((item) => item !== value)
      );
    } else {
      setSelectedSocialMedia((prevSelected) => [...prevSelected, value]);
    }
  };

  const handleProductsTypeChange = (value: string) => {
    if (productsType.includes(value)) {
      setProductsType((prevSelected) =>
        prevSelected.filter((item) => item !== value)
      );
    } else {
      setProductsType((prevSelected) => [...prevSelected, value]);
    }
  };

  const handleUrlChange = (socialMedia: string, url: string) => {
    setSocialMediaUrls((prevUrls) => ({
      ...prevUrls,
      [socialMedia]: url,
    }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto mt-8 p-4 bg-white rounded-md shadow-md mb-8"
    >
      <h1 className="text-2xl font-medium mb-4 text-deepblue text-center ">
        Let's Build Your Shop
      </h1>

      <div className="mb-4">
        <InputField
          labelStyle="font-medium"
          type="text"
          id="businessName"
          value={businessName}
          onChange={(e: { target: { value: React.SetStateAction<string> } }) =>
            setBusinessName(e.target.value)
          }
          label="Shop Name"
          error={errors.businessName}
          required
        />
      </div>

      <div className="flex sm:flex-row justify-between flex-col">
        <div className="">
          <label className="block text-deepblue text-sm font-medium mb-2">
            *Brand Logo
          </label>
          <Image
            error={errors.businessLogo}
            onImageUpload={(img) => setBusinessLogo(img)}
          />
        </div>

        <RadioList
          label="*What types of products do you sell?"
          id={""}
          labelStyle="font-medium"
        >
          <Radio
            id="tops"
            name="tops"
            value="tops"
            checked={productsType.includes("tops")}
            onChange={() => handleProductsTypeChange("tops")}
          >
            Tops
          </Radio>
          <Radio
            id="bottoms"
            name="bottoms"
            value="bottoms"
            checked={productsType.includes("bottoms")}
            onChange={() => handleProductsTypeChange("bottoms")}
          >
            Bottoms
          </Radio>
          <Radio
            id="footwear"
            name="footwear"
            value="footwear"
            checked={productsType.includes("footwear")}
            onChange={() => handleProductsTypeChange("footwear")}
          >
            Footwear
          </Radio>
        </RadioList>
      </div>

      <div className="mb-4">
        <TextArea
          labelStyle="font-medium"
          id="businessSynopsis"
          value={businessSynopsis}
          onChange={(e: { target: { value: React.SetStateAction<string> } }) =>
            setBusinessSynopsis(e.target.value)
          }
          label="Business Synopsis"
          error={errors.businessSynopsis}
          rows={4}
        />
      </div>

      {/* Policies and Shipping Section */}
      <div className="mb-4">
        <h2 className="text-xl mb-2 text-deepblue font-medium">
          Policies and Shipping Information
        </h2>

        <div className="flex mb-4">
          <div className="w-1/2 pr-2">
            <TextArea
              labelStyle="font-medium"
              id="returnPolicy"
              value={returnPolicy}
              onChange={(e: {
                target: { value: React.SetStateAction<string> };
              }) => setReturnPolicy(e.target.value)}
              label="Return Policy"
              error={errors.returnPolicy}
            />
          </div>
          <div className="w-1/2 pl-2">
            <TextArea
              labelStyle="font-medium"
              id="refundPolicy"
              value={refundPolicy}
              onChange={(e: {
                target: { value: React.SetStateAction<string> };
              }) => setRefundPolicy(e.target.value)}
              label="Refund Policy"
              error={errors.refundPolicy}
            />
          </div>
        </div>

        <div className="flex mb-4">
          <div className="w-1/2 pr-2">
            <TextArea
              labelStyle="font-medium"
              id="shippingInformation"
              value={shippingInformation}
              onChange={(e: {
                target: { value: React.SetStateAction<string> };
              }) => setShippingInformation(e.target.value)}
              label="Shipping Information"
              error={errors.shippingInformation}
              rows={4}
            />
          </div>
          <div className="w-1/2 pl-2">
            <InputField
              labelStyle="font-medium"
              type="number"
              id="shippingRate"
              value={shippingRate}
              onChange={(e: {
                target: { value: React.SetStateAction<string> };
              }) => setShippingRate(e.target.value)}
              label="Shipping Rate"
            />
          </div>
        </div>
      </div>

      {/* Contact Medium Section */}
      <div className="flex flex-col md:flex-row mb-4 -mt-4">
        <div className=" mb-0">
          <h2 className="text-xl mb-2 text-deepblue font-medium">
            Add Your Contact
          </h2>
          <div className="flex mb-4">
            <div className="w-1/2 pl-2">
              <InputField
                labelStyle="font-medium"
                type="tel"
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e: {
                  target: { value: React.SetStateAction<string> };
                }) => setPhoneNumber(e.target.value)}
                label="Phone Number"
              />
            </div>
            <div className="w-1/2 pl-2">
              <InputField
                labelStyle="font-medium"
                type="email"
                id="email"
                value={email}
                onChange={(e: {
                  target: { value: React.SetStateAction<string> };
                }) => setEmail(e.target.value)}
                label="Email"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Radio buttons for social media */}
      <RadioList
        label="Select Social Media"
        id={""}
        labelStyle="-mt-8 font-medium"
      >
        <Radio
          id="instagram"
          name="socialMedia"
          value="instagram"
          checked={selectedSocialMedia.includes("instagram")}
          onChange={() => handleSocialMediaChange("instagram")}
        >
          Instagram
        </Radio>
        <Radio
          id="facebook"
          name="Media"
          value="facebook"
          checked={selectedSocialMedia.includes("facebook")}
          onChange={() => handleSocialMediaChange("facebook")}
        >
          Facebook
        </Radio>
        {/* <Radio
          id="linkedin"
          name="ss"
          value="linkedin"
          checked={selectedSocialMedia.includes("linkedin")}
          onChange={() => handleSocialMediaChange("linkedin")}
        >
          LinkedIn
        </Radio> */}
        <Radio
          id="youtube"
          name="SNS"
          value="youtube"
          checked={selectedSocialMedia.includes("youtube")}
          onChange={() => handleSocialMediaChange("youtube")}
        >
          YouTube
        </Radio>
      </RadioList>

      {/* URL input fields based on selected social media */}
      {selectedSocialMedia.map((socialMedia) => (
        <div key={socialMedia} className="mb-4">
          <InputField
            type="URL"
            id={`${socialMedia}-url`}
            value={socialMediaUrls[socialMedia] || ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleUrlChange(socialMedia, e.target.value)
            }
            label={`${socialMedia} URL`}
            error={errors[socialMedia]}
          />
        </div>
      ))}

      <div className="flex justify-between mt-4">
        <Button
          type="button"
          style="bg-gray-300 w-20 text-center justify-center"
          onClick={handleBackClick}
        >
          Back
        </Button>

        <Button
          type="submit"
          style="bg-gray-300 w-20 text-center justify-center"
        >
          Next
        </Button>
      </div>
    </form>
  );
};

export default Profilesetup;
