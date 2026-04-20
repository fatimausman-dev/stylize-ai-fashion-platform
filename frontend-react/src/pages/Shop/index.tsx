import React, { useEffect, useState } from "react";
import {
  TextArea,
  Button,
  InputField,
  RadioList,
  Radio,
  Image,
  Form,
  Drawer,
  Trow,
  Table,
  Thead,
  Th,
  Tbody,
  Tdata,
} from "../../components";
import { RiDeleteBin6Line, RiEdit2Line } from "react-icons/ri";
import { MdAdd } from "react-icons/md";
import { FaShop } from "react-icons/fa6";

interface Category {
  id?: number;
  name: string;
}

export const Shop: React.FC = () => {
  const [businessName, setBusinessName] = useState("");
  const [businessLogo, setBusinessLogo] = useState("");
  const [businessSynopsis, setBusinessSynopsis] = useState("");
  const [productsType, setProductsType] = useState<string[]>([]);

  const [returnPolicy, setReturnPolicy] = useState("");
  const [refundPolicy, setRefundPolicy] = useState("");
  const [shippingInformation, setShippingInformation] = useState("");
  const [shippingRate, setShippingRate] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [selectedSocialMedia, setSelectedSocialMedia] = useState<string[]>([]);
  const [socialMediaUrls, setSocialMediaUrls] = useState<{
    [key: string]: string;
  }>({});
  const [social, setSocial] = useState<{ handle: string; url: string }[]>([]);

  const [shopEdit, setShopEdit] = useState(false);
  const [contactEdit, setContactEdit] = useState(false);
  const [policiesEdit, setPoliciesEdit] = useState(false);
  const [categoriesAdd, setCategoriesAdd] = useState(false);

  const [categories, setCategories] = useState<Category[]>([]);
  const [category, setCategory] = useState<Category>({
    name: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/v1/category/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });

        if (!response.ok) {
          const error = await response.text();
          throw new Error(error);
        }

        const data = await response.json();
        setCategories(data.result);

        console.log(categories);
      } catch (error) {
        window.alert(error);
      }
    };

    fetchCategories();

    const fetchShopData = async () => {
      try {
        const response = await fetch(
          "http://localhost:5001/api/v1/shop/shop-info",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );

        if (!response.ok) {
          const error = await response.text();
          throw new Error(error);
        }

        const shopData = await response.json();
        setBusinessName(shopData.result.shop.name || "");
        // setBusinessLogo(shopData.result.shop.logo || "");
        setBusinessSynopsis(shopData.result.shop.description || "");
        setProductsType(shopData.result.shop.productsType || []);

        setReturnPolicy(shopData.result.policy.returnPolicy || "");
        setRefundPolicy(shopData.result.policy.refund || "");
        setShippingInformation(shopData.result.policy.shipping || "");
        setShippingRate(shopData.result.policy.shippingFee.toString());

        setPhone(shopData.result.shop.phone);
        setEmail(shopData.result.shop.email || "");
        // setSocial(shopData.result.shop.socials);
        // setCategories(shopData.categories || []);

        // const selectedMedia = Object.keys(shopData.socialMediaUrls || {});
        // setSelectedSocialMedia(selectedMedia);
        // setSocialMediaUrls(shopData.socialMediaUrls || {});
      } catch (error) {
        window.alert(error);
      }
    };
    //   const fetchData = async () => {
    //     try {
    //       // '/shops/:userID' where :userID is the dynamic user ID
    //       const response = await fetch(`/shops/${userID}`);
    //       if (!response.ok) {
    //         throw new Error("Failed to fetch data");
    //       }
    //       const shopData = await response.json();

    //       // Update state with the fetched shop data
    // setBusinessName(shopData.businessName || "");
    // setBusinessSynopsis(shopData.businessSynopsis || "");
    // setReturnPolicy(shopData.returnPolicy || "");
    // setRefundPolicy(shopData.refundPolicy || "");
    // setShippingInformation(shopData.shippingInformation || "");
    // setShippingRate(shopData.shippingRate.toString());
    // setPhoneNumber(shopData.phoneNumber);
    // setEmail(shopData.email || "");
    // setSocial(shopData.social);
    // setCategories(shopData.categories || []);

    // const selectedMedia = Object.keys(shopData.socialMediaUrls || {});
    // setSelectedSocialMedia(selectedMedia);
    // setSocialMediaUrls(shopData.socialMediaUrls || {});
    //     }
    //     catch (error) {
    //       console.error("Error fetching data:", error);
    //     }
    //   };

    fetchShopData();
  }, []);

  //HANDLE PRODUCTS TYPE CHANGE
  const handleProductsTypeChange = (value: string) => {
    const updatedSelection = [...productsType];
    const index = updatedSelection.indexOf(value);

    if (index === -1) {
      updatedSelection.push(value);
    } else {
      updatedSelection.splice(index, 1);
    }

    setProductsType(updatedSelection);
  };

  //HANDLE SOCIALS CHANGE
  const handleSocialMediaChange = (value: string) => {
    const updatedSelection = [...selectedSocialMedia];
    const index = updatedSelection.indexOf(value);

    if (index === -1) {
      updatedSelection.push(value);
    } else {
      updatedSelection.splice(index, 1);
    }

    setSelectedSocialMedia(updatedSelection);
  };

  const handleUrlChange = (socialMedia: string, url: string) => {
    setSocialMediaUrls((prevUrls) => ({
      ...prevUrls,
      [socialMedia]: url,
    }));
  };

  //HANDLE RESPECTIVE FORMS EDITING

  const handleShopEdit = async () => {
    if (!businessName) {
      setErrors({
        businessName: "Shop name is required",
      });
      return;
    }

    // if (mockBusinessNames.includes(businessName)) {
    //   setErrors({
    //     businessName: "Shop with this name already exits",
    //   });
    //   return;
    // }

    try {
      const response = await fetch(
        `http://localhost:5001/api/v1/shop/business-info/`,
        {
          method: "PUT",
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
        const error = await response.text();
        throw new Error(error);
      }
      setShopEdit(false);
    } catch (error) {
      window.alert(error);
    }
  };

  const handleContactEdit = async () => {
    if (selectedSocialMedia.length !== 0) {
      const social = selectedSocialMedia.map((media) => ({
        handle: media,
        url: socialMediaUrls[media],
      }));
      setSocial(social);
    }
    try {
      const response = await fetch(
        `http://localhost:5001/api/v1/shop/contact-info/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify({
            phone,
            email,
            socials: social,
          }),
        }
      );
      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }
      setContactEdit(false);
    } catch (error) {
      window.alert(error);
    }
  };

  const handlePoliciesEdit = async () => {
    try {
      const response = await fetch(
        `http://localhost:5001/api/v1/shop/policy-info/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify({
            shippingFee: shippingRate,
            shipping: shippingInformation,
            returnPolicy: returnPolicy,
            refund: refundPolicy,
          }),
        }
      );
      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }
      setPoliciesEdit(false);
    } catch (error) {
      window.alert(error);
    }
  };

  // ADD CATEGORY
  const handleCategoriesAdd = async () => {
    if (!category) {
      return;
    }

    if (!category.name) {
      setErrors({ categoryError: "Enter category name!" });
      return;
    }

    const exists = categories.some(
      (cat) => cat.name.toLowerCase() === category.name.toLowerCase()
    );

    if (exists) {
      setErrors({
        categoryError: "Category name already exists!",
      });
      return;
    }

    try {
      const response = await fetch(`http://localhost:5001/api/v1/category/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          name: category.name,
        }),
      });
      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }

      setCategories((prevCategories) => [...prevCategories, category]);

      setCategory({ name: "" });
      setCategoriesAdd(false);
      setErrors({});
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  // DELETE CATEGORY
  const handleDelete = async (id?: number) => {
    try {
      const response = await fetch(
        `http://localhost:5001/api/v1/category/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }
      setCategories((prevCats) =>
        prevCats.filter((category) => category.id !== id)
      );
    } catch (error) {
      window.alert(error);
    }
  };

  // DELETE ALL CATEGORIES
  const deleteAllCategories = async () => {
    try {
      const response = await fetch(`http://localhost:5001/api/v1/category/`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      } else {
        setCategories([]);
      }
    } catch (error) {
      window.alert(error);
    }
  };

  return (
    <div className="p-5 h-screen rounded-3xl bg-light">
      <div className="flex mb-4">
        <p className="text-2xl font-medium text-deepblue">MY SHOP</p>
        <FaShop className="text-2xl text-deepblue h-8 ml-2" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="">
          <div className="flex justify-between">
            <p className="text-xl mb-2 text-deepblue font-medium">Shop Info</p>
            <RiEdit2Line
              className="text-purple cursor-pointer h-8 text-lg"
              onClick={() => setShopEdit(true)}
            />
          </div>
          {/* name */}
          <p className="block text-deepblue text-sm font-bold">Name:</p>
          <p className="text-gray mb-2">{businessName}</p>

          {/* logo */}

            {/* <p className="block text-deepblue text-sm font-bold">Logo:</p>
            <p className="text-gray mb-2 text-ellipsis">{businessLogo}</p> */}
         
          
          {/* about */}
          <TextArea
            id={"about"}
            value={businessSynopsis}
            label={"About:"}
            rows={10}
            textAreaStyle="text-gray"
          />

          {/* productsType */}
          <p className="block text-deepblue text-sm font-bold">
            Products' Types:
          </p>
          {productsType.map((type) => (
            <p className="text-gray mb-2">{type}</p>
          ))}
        </div>
        <div className="md:w-80 md:ml-8">
          <div className="flex justify-between">
            <p className="text-xl mb-2 text-deepblue font-medium">
              Policies and Shipping
            </p>
            <RiEdit2Line
              className="text-purple cursor-pointer h-8 text-lg"
              onClick={() => setPoliciesEdit(true)}
            />
          </div>
          <p className="block text-deepblue text-sm font-bold">
            Shipping Rate:
          </p>
          <p className="text-gray mb-2">{shippingRate}</p>
          <TextArea
            id={"shippingInfo"}
            value={shippingInformation}
            label={"Shipping Information: "}
            rows={2}
            textAreaStyle="text-gray"
          />
          {/* <div className="flex"> */}
          <TextArea
            id={"return"}
            value={returnPolicy}
            label={"Return Policy: "}
            rows={3}
            textAreaStyle="text-gray"
          />
          <TextArea
            id={"refund"}
            value={refundPolicy}
            label={"Refund Policy: "}
            rows={3}
            textAreaStyle="text-gray"
          />
          {/* </div> */}
        </div>
        <div className="md:ml-14">
          <div className="flex justify-between">
            <p className="text-xl mb-2 text-deepblue font-medium">
              Shop Contact
            </p>
            <RiEdit2Line
              className="text-purple cursor-pointer h-8 text-lg"
              onClick={() => setContactEdit(true)}
            />
          </div>
          <p className="block text-deepblue text-sm font-bold">Phone:</p>
          <p className="text-gray mb-2">{phone}</p>
          <p className="block text-deepblue text-sm font-bold">Email:</p>
          <p className="text-gray mb-2">{email}</p>
          {/* <p className="block text-deepblue text-medium font-bold mb-2">
            Social Media
          </p>
          {social.map((media: { handle: string; url: string }) => (
            <div className="flex">
              <p className="block text-gray text-sm">
                {media.handle}: {media.url}
              </p>
            </div>
          ))} */}
          <div>
            <div className="flex justify-between mt-4">
              <p className="text-xl text-deepblue font-medium">
                Product Categories
              </p>
              <div className="flex">
                <MdAdd
                  className="text-purple cursor-pointer h-8 text-2xl hover:text-lightpurple"
                  onClick={() => setCategoriesAdd(true)}
                />
                <RiDeleteBin6Line
                  className="text-deepblue cursor-pointer h-8 text-xl hover:text-red-300"
                  onClick={deleteAllCategories}
                />
              </div>
            </div>
            <Table style={{ height: "100px", overflow: "scroll" }}>
              <Thead>
                <tr>
                  <Th style="text-deepblue font-medium">Category Name</Th>
                </tr>
              </Thead>
              <Tbody>
                {categories.map((category: Category, index) => (
                  <Trow key={index}>
                    <Tdata>
                      <div className="flex justify-between">
                        <p className="block text-gray text-sm">
                          {category.name}
                        </p>
                        <RiDeleteBin6Line
                          className="text-red-500 cursor-pointer h-6 text-sm "
                          onClick={() => handleDelete(category.id)}
                        />
                      </div>
                    </Tdata>
                  </Trow>
                ))}
              </Tbody>
            </Table>
          </div>
        </div>
      </div>
      {shopEdit && (
        <Drawer
          isOpen={shopEdit}
          onClose={() => setShopEdit(false)}
          header="Edit Shop Info"
        >
          <Form onSubmit={handleShopEdit}>
            <div className="">
              <InputField
                labelStyle="font-medium"
                type="text"
                id="businessName"
                value={businessName}
                onChange={(e: {
                  target: { value: React.SetStateAction<string> };
                }) => setBusinessName(e.target.value)}
                label="Shop Name"
                error={errors.businessName}
                required
                inputStyle="bg-white"
              />

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
                label="*Select the types of products you sell"
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

              <TextArea
                labelStyle="font-medium"
                id="businessSynopsis"
                value={businessSynopsis}
                onChange={(e: {
                  target: { value: React.SetStateAction<string> };
                }) => setBusinessSynopsis(e.target.value)}
                label="Business Synopsis"
                error={errors.businessSynopsis}
                rows={6}
              />
            </div>
            <Button
              type="submit"
              style="absolute right-0 mr-4 w-20 justify-center"
            >
              Save
            </Button>
          </Form>
        </Drawer>
      )}
      {contactEdit && (
        <Drawer
          isOpen={contactEdit}
          onClose={() => setContactEdit(false)}
          header="Edit Contact Info"
        >
          <Form onSubmit={handleContactEdit}>
            <div>
              <InputField
                labelStyle="font-medium"
                type="tel"
                id="phoneNumber"
                value={phone}
                onChange={(e: {
                  target: { value: React.SetStateAction<string> };
                }) => setPhone(e.target.value)}
                label="Phone Number"
              />

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
              <RadioList
                label="Select Social Media"
                id={""}
                labelStyle="font-medium"
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

              {selectedSocialMedia.map((socialMedia) => (
                <div key={socialMedia} className="">
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
            </div>
            <Button
              type="submit"
              style="absolute right-0 mr-4 w-20 justify-center"
            >
              Save
            </Button>
          </Form>
        </Drawer>
      )}
      {policiesEdit && (
        <Drawer
          isOpen={policiesEdit}
          onClose={() => setPoliciesEdit(false)}
          header="Edit Policies and Shipping"
        >
          <Form onSubmit={handlePoliciesEdit}>
            <div>
              <InputField
                labelStyle="font-medium"
                type="number"
                id="shippingRate"
                value={shippingRate}
                onChange={(e: {
                  target: { value: React.SetStateAction<string> };
                }) => setShippingRate(e.target.value)}
                label="Shipping Rate"
                inputStyle="bg-white"
              />

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
              <TextArea
                labelStyle="font-medium"
                id="returnPolicy"
                value={returnPolicy}
                onChange={(e: {
                  target: { value: React.SetStateAction<string> };
                }) => setReturnPolicy(e.target.value)}
                label="Return Policy"
                error={errors.returnPolicy}
                rows={5}
              />

              <TextArea
                labelStyle="font-medium"
                id="refundPolicy"
                value={refundPolicy}
                onChange={(e: {
                  target: { value: React.SetStateAction<string> };
                }) => setRefundPolicy(e.target.value)}
                label="Refund Policy"
                error={errors.refundPolicy}
                rows={5}
              />
            </div>
            <Button
              type="submit"
              style="absolute right-0 mr-4 w-20 justify-center"
            >
              Save
            </Button>
          </Form>
        </Drawer>
      )}
      {categoriesAdd && (
        <Drawer
          isOpen={categoriesAdd}
          onClose={() => setCategoriesAdd(false)}
          header="Add Category"
        >
          <Form onSubmit={handleCategoriesAdd}>
            <div>
              <InputField
                labelStyle="font-medium"
                type="text"
                id="categories"
                value={category.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setCategory({ ...category, name: e.target.value })
                }
                label="Category Name:"
                inputStyle="bg-white"
                error={errors.categoryError}
              />
            </div>
            <Button
              type="submit"
              style="absolute right-0 mr-4 w-20 justify-center"
            >
              Add
            </Button>
          </Form>
        </Drawer>
      )}
    </div>
  );
};

export default Shop;
