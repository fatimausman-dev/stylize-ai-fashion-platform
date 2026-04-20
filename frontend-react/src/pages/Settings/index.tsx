import React, { useEffect, useState } from "react";
import {
  Button,
  Drawer,
  Form,
  ImageInput,
  InputField,
  Modal,
} from "../../components";
import { useNavigate } from "react-router-dom";
import { RiEdit2Line } from "react-icons/ri";

interface BankDetails {
  bankCopy?: File;
  bankName: string;
  branchName: string;
  branchCode: string;
  accountTitle: string;
  accountNo: string;
  accountIban: string;
}

interface LoginDetails {
  id: string;
  username: string;
  password: string;
  email: string;
  phone: string;
}

export const Settings = () => {
  const [drawer, setDrawer] = useState(false);
  const [loginDrawer, setLoginDrawer] = useState(false);
  const [modal, setModal] = useState(false);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [bankDetails, setBankDetails] = useState<BankDetails>({
    bankCopy: undefined,
    bankName: "",
    branchName: "",
    branchCode: "",
    accountTitle: "",
    accountNo: "",
    accountIban: "",
  });

  const [loginDetails, setLoginDetails] = useState<LoginDetails>({
    id: "",
    username: "",
    password: "",
    email: "",
    phone: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    //FETCH USER ACCOUNT DETAILS
    const fetchLoginDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/v1/auth/retailer/`, {
          method: "GET",
          headers: { 
            "Content-Type": "application/json", 
            "Authorization": "Bearer " + localStorage.getItem("token")
           },
        });
        if (!response.ok) { 
          const errorMessage = await response.text();
          throw new Error(errorMessage);
        }
          const data = await response.json();
          setLoginDetails(data.result);
      } catch (err) {
        window.alert(err);
      }
    }

     //FETCH THE USER'S BANK ACCOUNT DETAILS
    const fetchBankDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/v1/user/retailer/`, {
          method: "GET",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token") 
          },
        });
        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(errorMessage);
        }
          const data = await response.json();
          setBankDetails(data.result);
      }
      catch (err) {
        window.alert(err);
      }
    }

    fetchLoginDetails();
    fetchBankDetails();

  }, []);
  
  const validateLoginDetails = () => {
    //REQUIRE CHECKS
    if (loginDetails.username === "") {
      setErrors((prev) => ({ ...prev, username: "Username is required" }));
    }
    if (loginDetails.password === "") {
      setErrors((prev) => ({ ...prev, password: "Password is required" }));
    }
    if (loginDetails.email === "") {
      setErrors((prev) => ({ ...prev, email: "Email is required" }));
    }
    if (loginDetails.phone === "") {
      setErrors((prev) => ({ ...prev, phone: "Phone is required" }));
    }

    //UNIQUE CHECKS
    //if (Object.keys(errors).length < 0) {
    // if (users.includes(username)) {
    //   setErrors((prev) => ({ ...prev, username: "Username already exists" }));
    // }
    // if (users.includes(email)) {
    //   setErrors((prev) => ({ ...prev, email: "Email already linked to a shop" }));
    // }
    //}

    //FORMAT CHECKS
    if (Object.keys(errors).length < 0) {
      if (loginDetails.email.includes("@") === false) {
        setErrors((prev) => ({ ...prev, email: "Email is invalid" }));
      }
      if (loginDetails.phone.length !== 11) {
        setErrors((prev) => ({ ...prev, phone: "Phone number is invalid" }));
      }
      if (loginDetails.password.length < 8 || !(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(loginDetails.password))) {
        setErrors((prev) => ({
          ...prev,
          password: "Password must be at least 8 characters long, has at least one uppercase letter, one lowercase letter and a number",
        }));
      }
    }

    if (Object.keys(errors).length > 0) {
      return false;
    }
  };

  const validateBankDetails = () => {
    //REQUIRE CHECKS
    if (bankDetails.bankName === "") {
      setErrors((prev) => ({ ...prev, bankName: "Bank name is required" }));
    }
    if (bankDetails.branchName === "") {
      setErrors((prev) => ({ ...prev, branchName: "Branch name is required" }));
    }
    if (bankDetails.branchCode === "") {
      setErrors((prev) => ({ ...prev, branchCode: "Branch code is required" }));
    }
    if (bankDetails.accountTitle === "") {
      setErrors((prev) => ({ ...prev, accountTitle: "Account title is required" }));
    }
    if (bankDetails.accountNo === "") {
      setErrors((prev) => ({ ...prev, accountNo: "Account number is required" }));
    }
    if (bankDetails.accountIban === "") {
      setErrors((prev) => ({ ...prev, accountIban: "IBAN is required" }));
    }

    //FORMAT CHECKS
    if (Object.keys(errors).length < 0) {
      if (bankDetails.accountNo.length !== 16) {
        setErrors((prev) => ({ ...prev, accountNo: "Account number is invalid" }));
      }
      if (bankDetails.accountIban.length !== 13) {
        setErrors((prev) => ({ ...prev, accountIban: "IBAN is invalid" }));
      }
      if (bankDetails.branchCode.length < 3 || bankDetails.branchCode.length > 7) {
        setErrors((prev) => ({ ...prev, branchCode: "Branch code is invalid" }));
      }
    }

    if (Object.keys(errors).length > 0) {
      return false;
    }
  };

  const handleSubmitLogin = async () => {
    validateLoginDetails();
    try {
      const response = await fetch(
        `http://localhost:5001/api/v1/auth/retailer/`,
        {
          method: "PUT",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
          },
          body: JSON.stringify({
            username: loginDetails.username,
            password: loginDetails.password,
            email: loginDetails.email,
            phone: loginDetails.phone,
          }),
        }
      );
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }
    } catch (err) {
        window.alert(err);
    }
  };

  const handleSubmitBank = async () => {
    validateBankDetails();

    try {
      const response = await fetch('http://localhost:5001/api/v1/user/retailer/', {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify({
          bankName: bankDetails.bankName,
          branchName: bankDetails.branchName,
          branchCode: bankDetails.branchCode,
          accountTitle: bankDetails.accountTitle,
          accountNo: bankDetails.accountNo,
          accountIban: bankDetails.accountIban,
          // bankCopy: bankDetails.bankCopy,
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }

    } catch (err) {
      window.alert(err);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:5001/api/v1/auth/retailer/`,
        {
          method: "DELETE",
          headers: { 
            "Content-Type": "application/json", 
            "Authorization": "Bearer " + localStorage.getItem("token")
          },
        }
      );
      if (response.ok) {
        navigate("/sign-up");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-5 h-screen rounded-3xl bg-light">
      <div className="flex justify-between">
        <p className="text-2xl mb-5 font-bold text-deepblue">
          Profile Settings
        </p>
        <Button
          onClick={() => setModal(true)}
          style="mb-2 absolute right-0 mx-10"
        >
          Delete Account
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="">
          <div className="flex justify-between">
            <p className="text-xl mb-5 text-deepblue font-medium">Login Details</p>
            <RiEdit2Line
              className="text-purple cursor-pointer h-8 text-lg"
              onClick={() => setLoginDrawer(true)}
            />
          </div>
          <p className="block text-deepblue text-sm font-bold">Username:</p>
          <p className="text-gray mb-2">{loginDetails.username}</p>
          <hr className="text-lighter mb-4" />
          <p className="block text-deepblue text-sm font-bold">Password:</p>
          <p className="text-gray mb-2">{loginDetails.password}</p>
          <hr className="text-lighter mb-4" />
          <p className="block text-deepblue text-sm font-bold">Email:</p>
          <p className="text-gray mb-2">{loginDetails.email}</p>
          <hr className="text-lighter mb-4" />
          <p className="block text-deepblue text-sm font-bold">Phone:</p>
          <p className="text-gray mb-2">{loginDetails.phone}</p>
          <hr className="text-lighter mb-4" />
        </div>
        <div className="md:w-80 md:ml-8">
          <div className="flex justify-between">
            <p className="text-xl mb-5 text-deepblue font-medium">
              Bank Details
            </p>
            <RiEdit2Line
              className="text-purple cursor-pointer h-8 text-lg"
              onClick={() => setDrawer(true)}
            />
          </div>
          <p className="block text-deepblue text-sm font-bold">
            Bank Name:
          </p>
          <p className="text-gray mb-2">{bankDetails.bankName}</p>
          <hr className="text-lighter mb-4" />
          <p className="block text-deepblue text-sm font-bold">
            Account Title:
          </p>
          <p className="text-gray mb-2">{bankDetails.accountTitle}</p>
          <hr className="text-lighter mb-4" />
          <p className="block text-deepblue text-sm font-bold">
            Account Number:
          </p>
          <p className="text-gray mb-2">{bankDetails.accountNo}</p>
          <hr className="text-lighter mb-4" />
          <p className="block text-deepblue text-sm font-bold">
            IBAN:
          </p>
          <p className="text-gray mb-2">{bankDetails.accountIban}</p>
          <hr className="text-lighter mb-4" />
          <p className="block text-deepblue text-sm font-bold">
            Branch Name:
          </p>
          <p className="text-gray mb-2">{bankDetails.branchName}</p>
          <hr className="text-lighter mb-4" />
          <p className="block text-deepblue text-sm font-bold">
            Branch Code:
          </p>
          <p className="text-gray mb-2">{bankDetails.branchCode}</p>
          <hr className="text-lighter mb-4" />
          </div>
        </div>
      <div className="flex flex-col md:flex-row md:gap-8">
        {loginDrawer && (
          <Drawer
            isOpen={loginDrawer}
            onClose={() => setLoginDrawer(false)}
            header="Edit Login Details"
          >
            <Form onSubmit={handleSubmitLogin}>
              <p className="text-xl mb-5 font-bold text-deepblue">
                Login Details
              </p>

              <InputField
                type="text"
                id="username"
                value={loginDetails.username}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setLoginDetails({
                    ...loginDetails,
                    username: e.target.value,
                  })
                }
                label="Username"
                error={errors.username}
              />
              <InputField
                type="password"
                id="password"
                value={loginDetails.password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setLoginDetails({
                    ...loginDetails,
                    password: e.target.value,
                  })
                }
                label="Password"
                error={errors.password}
              />

              <InputField
                type="email"
                id="email"
                value={loginDetails.email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setLoginDetails({ ...loginDetails, email: e.target.value })
                }
                label="Email"
                error={errors.email}
              />
              <InputField
                type="tel"
                id="phone"
                value={loginDetails.phone}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setLoginDetails({ ...loginDetails, phone: e.target.value })
                }
                label="Phone"
                error={errors.phone}
              />

              <Button type="submit">Update</Button>
            </Form>
          </Drawer>
        )}
        {drawer && (
          <Drawer
            isOpen={drawer}
            onClose={() => setDrawer(false)}
            header="Edit Bank Details"
          >
            <Form onSubmit={handleSubmitBank}>
              <div className="mb-5">
                <ImageInput
                  onChange={(file) =>
                    setBankDetails({ ...bankDetails, bankCopy: file })
                  }
                  label="Bank Cheque/Bank Statement"
                  
                />
              </div>
              <div className="flex">
                <InputField
                  type="text"
                  id="bankName"
                  value={bankDetails.bankName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setBankDetails({ ...bankDetails, bankName: e.target.value })
                  }
                  label="Bank Name"
                  error={errors.bankName}
                  labelStyle="mr-2"
                  inputStyle="mr-2"
                />
                <InputField
                  type="text"
                  id="branchName"
                  value={bankDetails.branchName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setBankDetails({
                      ...bankDetails,
                      branchName: e.target.value,
                    })
                  }
                  label="Branch Name"
                  error={errors.branchName}
                  labelStyle="ml-2"
                  inputStyle="ml-2"
                />
              </div>
              <div className="flex">
                <InputField
                  type="text"
                  id="branchCode"
                  value={bankDetails.branchCode}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setBankDetails({
                      ...bankDetails,
                      branchCode: e.target.value,
                    })
                  }
                  label="Branch Code"
                  error={errors.branchCode}
                  inputStyle="mr-2"
                  labelStyle="mr-2"
                />
                <InputField
                  type="text"
                  id="accountTitle"
                  value={bankDetails.accountTitle}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setBankDetails({
                      ...bankDetails,
                      accountTitle: e.target.value,
                    })
                  }
                  label="Account Title"
                  error={errors.accountTitle}
                  inputStyle="ml-2"
                  labelStyle="ml-2"
                />
              </div>
              <div className="flex">
                <InputField
                  type="text"
                  id="accountNumber"
                  value={bankDetails.accountNo}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setBankDetails({
                      ...bankDetails,
                      accountNo: e.target.value,
                    })
                  }
                  label="Account Number"
                  error={errors.accountNo}
                  inputStyle="mr-2"
                  labelStyle="mr-2"
                />
                <InputField
                  type="text"
                  id="iban"
                  value={bankDetails.accountIban}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setBankDetails({ ...bankDetails, accountIban: e.target.value })
                  }
                  label="IBAN"
                  error={errors.accountIban}
                  inputStyle="ml-2"
                  labelStyle="ml-2"
                />
              </div>
              <Button type="submit" style="absoulte right-0">
                Update
              </Button>
            </Form>
          </Drawer>
        )}
      </div>
      <Modal isOpen={modal} onClose={() => setModal(false)}>
        <div className="flex flex-col items-center">
          <p className="text-xl mb-5 font-bold text-light">Delete Account</p>
          <p className="text-medium mb-5 font-medium text-light">
            Are you sure you want to delete your account?
          </p>
          <div className="flex gap-4">
            <Button onClick={() => setModal(false)}>Cancel</Button>
            <Button
              onClick={() => {
                handleDelete;
              }}
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Settings;
