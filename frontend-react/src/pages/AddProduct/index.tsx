import React, { useEffect, useState } from "react";
import {
  Form,
  InputField,
  Button,
  SizeChart,
  Select,
  Image,
  Carousel,
  TextArea,
  Radio,
  RadioList,
} from "../../components";
import { useNavigate } from "react-router-dom";

interface Category {
  id: string;
  value: string;
  label: string;
}

interface Product {
  id?: number;
  sku: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  status: string;
  category?: string;
  images: string[];
  selectedSizes: string[];
  selectedColors?: string[] | null;
  sizeChart: string;
  productMeasures: number[][];
  specifications?: { [question: string]: string };
}

export const AddProduct: React.FC = () => {
  const navigate = useNavigate();
  // spec questions
  const fashion_questions = [
    {
      question: "Primary fabric?",
      options: ["Cotton", "Polyester", "Silk"],
    },
    {
      question: "Dominant color palette?",
      options: [
        "Monochrome (black, white, and greys)",
        "Earth tones (browns, tans, greens)",
        "Bright and bold (reds, blues, yellows)",
      ],
    },
    {
      question: "Type of fit?",
      options: ["Slim fit", "Regular fit", "Loose fit"],
    },
    {
      question: "Target season?",
      options: ["Spring/Summer", "Autumn/Winter", "All-season"],
    },
    {
      question: "Main style theme?",
      options: ["Casual", "Formal", "Sportswear"],
    },
    {
      question: "Size range?",
      options: [
        "Standard sizes (S, M, L)",
        "Plus sizes (XL, XXL, XXXL)",
        "Petite and Tall sizes",
      ],
    },
    {
      question: "Age group?",
      options: [
        "Teens and Young Adults (13-24)",
        "Adults (25-54)",
        "Seniors (55+)",
      ],
    },
    {
      question: "Price range?",
      options: ["Budget-friendly", "Mid-range", "Luxury"],
    },
  ];

  const [selectedSpecifications, setSelectedSpecifications] = useState<{
    [question: string]: string;
  }>({});

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [products, setProducts] = useState<Product[]>([]);

  const [product, setProduct] = useState<Product>({
    id: 1,
    sku: "",
    name: "",
    description: "",
    price: 0,
    stock: 0,
    status: "active",
    category: "",
    images: [],
    selectedSizes: [],
    selectedColors: [],
    sizeChart: "",
    productMeasures: [[]],
    specifications: {},
  });

  const [categories, setCategories] = useState<Category[]>([]);

  const sizeUnitsTop = [
    { id: "2", value: "S", label: "S" },
    { id: "3", value: "M", label: "M" },
    { id: "4", value: "L", label: "L" },
    { id: "5", value: "XL", label: "XL" },
    { id: "6", value: "XXL", label: "XXL" },
  ];

  const sizeUnitsBottom = [
    { id: "1", value: "XS", label: "XS" },
    { id: "2", value: "S", label: "S" },
    { id: "3", value: "M", label: "M" },
    { id: "4", value: "L", label: "L" },
    { id: "5", value: "XL", label: "XL" },
    { id: "6", value: "XXL", label: "XXL" },
  ];

  const sizeUnitsFoot = [
    { id: "1", value: "EU-36", label: "EU-36" },
    { id: "2", value: "EU-37", label: "EU-37" },
    { id: "3", value: "EU-38", label: "EU-38" },
    { id: "4", value: "EU-39", label: "EU-39" },
    { id: "5", value: "EU-40", label: "EU-40" },
    { id: "6", value: "EU-41", label: "EU-41" },
    { id: "7", value: "US-6", label: "US-6" },
    { id: "8", value: "US-7", label: "US-7" },
    { id: "9", value: "US-8", label: "US-8"}
  ];

  const colors = [
    { id: "1", value: "white", label: "White" },
    { id: "2", value: "beige", label: "Beige" },
    { id: "3", value: "pink", label: "Pink" },
    { id: "4", value: "sage", label: "Sage" },
    { id: "5", value: "plum", label: "Plum" },
    { id: "6", value: "black", label: "Black"},
    { id: "7", value: "blue", label: "Blue"},
    { id: "8", value: "red", label: "Red"},
    { id: "9", value: "green", label: "Green"},
    { id: "10", value: "yellow", label: "Yellow" },
    { id: "11", value: "orange", label: "Orange" },
    { id: "12", value: "purple", label: "Purple" },
    { id: "13", value: "brown", label: "Brown" },
    { id: "14", value: "gray", label: "Gray" },
    { id: "15", value: "cyan", label: "Cyan" },
    { id: "16", value: "magenta", label: "Magenta" },
    { id: "17", value: "lavender", label: "Lavender" },
    { id: "18", value: "maroon", label: "Maroon" },
    { id: "19", value: "navy", label: "Navy" },
    { id: "20", value: "teal", label: "Teal" },
    { id: "21", value: "turquoise", label: "Turquoise" },
    { id: "22", value: "peach", label: "Peach" },
    { id: "23", value: "mint", label: "Mint" },
    { id: "24", value: "lime", label: "Lime" },
  ];

  const sizecharts = [
    { id: "1", value: "tops chart", label: "Tops Chart" },
    { id: "2", value: "bottoms chart", label: "Bottoms Chart" },
    { id: "3", value: "footwears chart", label: "Footwear Chart" },
  ];

  const measuresTop = [
    "Chest",
    "Length",
    "Waist",
    "burst",
    "Sleeves",
    "Armhole",
    "Neck",
    "Shoulder",
    "Cuff",
  ];
  const measuresBottom = ["Waist", "Hip", "Thigh", "Length", "Inseam", "Rise"];
  const measuresFoot = [
    "length",
    "heel",
    "ball",
    "width",
    "circum",
    "shaft",
    "height",
  ];

  // const [color, setColor] = useState("");

  const sizing = (chart: string) => {
    if (chart === "tops chart") {
      return sizeUnitsTop;
    } else if (chart === "bottoms chart") {
      return sizeUnitsBottom;
    } else if (chart === "footwears chart") {
      return sizeUnitsFoot;
    }
  };

  const sizingMeasures = (chart: string) => {
    if (chart === "tops chart") {
      return measuresTop;
    } else if (chart === "bottoms chart") {
      return measuresBottom;
    } else if (chart === "footwears chart") {
      return measuresFoot;
    }
  };

  const handleImageUpload = (newImage: string) => {
    product.images = [...product.images, newImage];
    setProduct({ ...product });
  };

  // Handle changing of specification selection
  const handleSpecificationChange = (question: string, answer: string) => {
    const updatedSpecifications = {...selectedSpecifications, [question]: answer};
    setSelectedSpecifications(updatedSpecifications);
    // Update the product state with the new specifications
    setProduct(prevProduct => ({
        ...prevProduct,
        specifications: updatedSpecifications,
    }));
};


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/v1/product/", {
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
        setProducts(data.result);
      } catch (error) {
        window.alert(error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/v1/category/", {
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
        const categories = data.result.map((category: { name: string }) => {
          return {
            id: category.name,
            value: category.name,
            label: category.name,
          };
        });
        setCategories(categories);
      } catch (error) {
        window.alert(error);
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);

  const validateForm = () => {
    if (
      product.sku === "" ||
      product.name === "" ||
      product.sizeChart === "" ||
      product.selectedSizes.length === 0 ||
      product.images.length === 0
    ) {
      setErrors({
        ...errors,
        SKU: product.sku === "" ? "Enter SKU" : "",
        name: product.name === "" ? "Enter Name" : "",
        sizeChart: product.sizeChart === "" ? "Select a Size Chart" : "",
        selectedSizes: product.selectedSizes.length === 0 ? "Select Sizes" : "",
        images: product.images.length === 0 ? "Insert at least one image" : "",
      });
      return false;
    }

    //check SKU presence
    const isSkuAlreadyExists = products.some(
      (prod) => prod.sku === product.sku && prod.id !== product.id
    );

    if (product.id && isSkuAlreadyExists) {
      setErrors({
        ...errors,
        SKU: "SKU already exists!",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }
    console.log(product);
    const newProduct: Product = {
      id: products.length + 1,
      sku: product.sku,
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      status: product.status,
      category: product.category,
      images: product.images,
      selectedSizes: product.selectedSizes,
      selectedColors: product.selectedColors,
      sizeChart: product.sizeChart,
      productMeasures: product.productMeasures,
      specifications: product.specifications,
    };
    console.log(newProduct);
    try {
      const response = await fetch("http://localhost:5001/api/v1/product/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          ...newProduct,
          measures: JSON.stringify(newProduct.productMeasures),
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }
      // Product added successfully
      alert("Product added successfully");
      setErrors({});
      setProduct({
        sku: "",
        name: "",
        description: "",
        price: 0,
        stock: 0,
        status: "active",
        category: "",
        images: [],
        selectedSizes: [],
        selectedColors: [],
        sizeChart: "",
        productMeasures: [[]],
        specifications: {},
      });
    } catch (error) {
      window.alert(error);
    }
  };

  function handleSizeChartChange(chart: string) {
    setProduct({
      ...product,
      sizeChart: chart,
      selectedSizes: [],
      productMeasures: [[]],
    });
  }

  const handleSelectedSizesChange = (selectedOptions: string[]) => {
    setProduct({
      ...product,
      selectedSizes: selectedOptions,
      productMeasures: [...Array(selectedOptions.length)].map(() => []),
    });
  };

  const renderSpecifications = () => {
    return fashion_questions.map((item, index) => (
      <div key={index} className="mb-4">
        <RadioList id={item.question} label={item.question}>
          {item.options.map((option, optionIndex) => (
            <Radio
              id={option}
              value={option}
              name={item.question}
              checked={selectedSpecifications[item.question] === option}
              onChange={() => handleSpecificationChange(item.question, option)}
            >
              {option}
            </Radio>
          ))}
        </RadioList>
      </div>
    ));
  };

  return (
    <div className="p-5 rounded-3xl bg-light">
      <h1 className="text-xl font-bold mb-3 text-deepblue">ADD PRODUCTS</h1>
      <Form style="m-2 flex flex-wrap justify-between" onSubmit={handleSubmit}>
        <Button
          type="submit"
          style="w-16 justify-center absolute top-0 right-0 m-10 border-purple border shadow-none"
        >
          Add
        </Button>
        <Button
          onClick={() => {
            navigate("../products");
          }}
          style="w-16 justify-center absolute top-0 right-0 my-10 mx-28 bg-white text-purple border-purple border shadow-none"
        >
          Back
        </Button>
        <span
          className={`cursor-pointer p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50
                ${
                  product.status === "active"
                    ? "text-green-800 bg-green-200"
                    : "text-red-800 bg-red-200"
                }`}
          onClick={() =>
            setProduct({
              ...product,
              status: product.status === "active" ? "disabled" : "active",
            })
          }
        >
          {product.status === "active" ? "active" : "disabled"}
        </span>
        <div className="w-full flex mt-2">
          <div className="w-1/3 pr-4">
            <InputField
              type="text"
              id="SKU"
              value={product.sku}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setProduct({ ...product, sku: e.target.value });
              }}
              label="SKU"
              error={errors.SKU}
            />
          </div>
          <div className="w-1/3">
            <InputField
              type="text"
              id="name"
              value={product.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setProduct({ ...product, name: e.target.value });
              }}
              label="Name"
              error={errors.name}
            />
          </div>
          <div className="flex ml-4">
            <InputField
              type="number"
              id="price"
              value={product.price.toString()}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setProduct({ ...product, price: parseInt(e.target.value) });
              }}
              label="Price"
              inputStyle="mr-2 w-24"
            />
            <InputField
              type="number"
              id="stock"
              value={product.stock.toString()}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setProduct({ ...product, stock: parseInt(e.target.value) });
              }}
              label="Stock"
              labelStyle="ml-2"
              inputStyle="ml-2 w-24"
            />
          </div>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3 pr-4 -mt-1">
          <TextArea
            id="description"
            value={product.description as string}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setProduct({ ...product, description: e.target.value });
            }}
            rows={5}
            label="Description"
          />
          {/* <InputField
              id="colors"
              type="color"
              value={color}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setColor(e.target.value);
                if (product.selectedColors) {
                  setProduct({ ...product, selectedColors: [...product.selectedColors, color] });
                } else {
                  setProduct({ ...product, selectedColors: [color] });
                }
              
              }}
              label="Colors"
            /> */}
          <Select
            id="category"
            label="Category"
            options={categories}
            option={product.category as string}
            onChange={(category) => {
              setProduct({ ...product, category: category as string });
            }}
          />
          <Select
            id="colors"
            label="Colors"
            options={colors}
            multiple={true}
            styleSelect="h-16"
            option={product.selectedColors as string[]}
            onChange={(selectedOptions) => {
              setProduct({
                ...product,
                selectedColors: selectedOptions as string[],
              });
            }}
          />
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3 md:pl-2 md:pr-2">
          <Select
            id="sizeChart"
            label="Size Chart"
            options={sizecharts}
            option={product.sizeChart}
            error={errors.sizeChart}
            onChange={(chart) => {
              handleSizeChartChange(chart as string);
            }}
          />
          <Select
            id="sizes"
            label="Sizes Units"
            options={sizing(product.sizeChart) as any}
            multiple={true}
            error={errors.selectedSizes}
            styleSelect="h-16"
            option={product.selectedSizes}
            onChange={(selectedOptions) => {
              handleSelectedSizesChange(selectedOptions as string[]);
            }}
          />
          {product.selectedSizes && product.selectedSizes.length > 0 && (
            <SizeChart
              onChange={(productMeasures) => {
                setProduct({ ...product, productMeasures });
              }}
              initialMeasurements={product.productMeasures}
              rowLabels={product.selectedSizes}
              columnLabels={sizingMeasures(product.sizeChart) as any}
            />
          )}
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3 md:pl-4">
          <div>
            <p className="block text-deepblue h- text-sm font-bold mb-2 ">
              Images:
            </p>

            <Carousel images={product.images} style="" />
            <Image
              onImageUpload={handleImageUpload}
              multiple={true}
              error={errors.images}
            />
          </div>
        </div>

        {/* SPECS */}
        <div className="w-full ">
          <div>
            <p className="block text-deepblue text-md font-bold mb-2">
              Make your products more reachable by adding specifications
            </p>
            <div className="flex flex-wrap">
              {/* Render specifications on the left */}
              <div className="w-full">{renderSpecifications()}</div>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default AddProduct;
