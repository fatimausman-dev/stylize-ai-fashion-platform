import React, { useState, FormEvent } from "react";
import { Button, InputField, ImageInput } from "../../components";
import { useNavigate } from "react-router-dom";

export const Payment: React.FC = () => {
  const [idName, setIdName] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [idDocumentFront, setIdDocumentFront] = useState<File | null>(null);
  const [idDocumentBack, setIdDocumentBack] = useState<File | null>(null);

  const [bankChequeFront, setBankChequeFront] = useState<File | null>(null);

  const [bankName, setBankName] = useState("");
  const [branchName, setBranchName] = useState("");
  const [branchCode, setBranchCode] = useState("");
  const [accountTitle, setAccountTitle] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [iban, setIban] = useState("");

  const [idError, setIdError] = useState("");
  const [bankError, setBankError] = useState("");

  const navigate = useNavigate();
  const [errors, setErrors] = useState({
    idName: "",
    idNumber: "",
    bankName: "",
    branchName: "",
    branchCode: "",
    accountNumber: "",
    iban: "",
    accountTitle: "",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log('aa')
    // const idNumberRegex = /^\d{13}$/;
    // if (!idNumberRegex.test(idNumber)) {
    //   setErrors((prevErrors) => ({
    //     ...prevErrors,
    //     idNumber: "ID number should be a 13-digit number without dashes",
    //   }));
    //   return;
    // } else {
    //   setErrors((prevErrors) => ({ ...prevErrors, idNumber: "" }));
    // }

    // if (!/^\d{3,7}$/.test(branchCode)) {
    //   setErrors((prevErrors) => ({
    //     ...prevErrors,
    //     branchCode: "Branch code should be a number between 3 and 7 digits",
    //   }));
    //   return;
    // } else {
    //   setErrors((prevErrors) => ({ ...prevErrors, branchCode: "" }));
    // }

    // const accountNumberRegex = /^\d{4}-\d{4}-\d{4}-\d{4}$/;
    // if (!accountNumberRegex.test(accountNumber)) {
    //   setErrors((prevErrors) => ({
    //     ...prevErrors,
    //     accountNumber:
    //       "Account number should be in the format xxxx-xxxx-xxxx-xxxx",
    //   }));
    //   return;
    // } else {
    //   setErrors((prevErrors) => ({ ...prevErrors, accountNumber: "" }));
    // }

    // const ibanRegex = /^PK-\d{2}-\d{4}-\d{16}$/;
    // if (!ibanRegex.test(iban)) {
    //   setErrors((prevErrors) => ({
    //     ...prevErrors,
    //     iban: "IBAN should be in the format PK-**-****-****************",
    //   }));
    //   return;
    // } else {
    //   setErrors((prevErrors) => ({ ...prevErrors, iban: "" }));
    // }

    // const accountTitleRegex = /^[A-Za-z ]+$/;
    // if (!accountTitleRegex.test(accountTitle)) {
    //   setErrors((prevErrors) => ({
    //     ...prevErrors,
    //     accountTitle: "Account title should only contain alphabets",
    //   }));
    //   return;
    // } else {
    //   setErrors((prevErrors) => ({ ...prevErrors, accountTitle: "" }));
    // }

    // if (!idName || !idNumber || !idDocumentFront || !idDocumentBack) {
    //   setIdError("All fields and images are required");
    //   return;
    // } else {
    //   setIdError("");
    // }

    try {
      const response = await fetch("http://localhost:5001/api/v1/user/retailer/", { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          name: idName,
          nic: idNumber,
          // idDocFront: idDocumentFront,
          // idDocBack: idDocumentBack,
          // bankCopy: bankChequeFront,
          bankName: bankName,
          branchName: branchName,
          branchCode: branchCode,
          accountTitle: accountTitle,
          accountNo: accountNumber,
          accountIban: iban,
        }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }
       
      navigate(`/dashboard`);

    } catch (error: any) {
        if (error.message.includes("nic")) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            idNumber: "Invalid ID number",
          })
        );
      }
      if (error.message.includes("bankName")) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          bankName: "Invalid bank name",
        }));
      }
      if (error.message.includes("branchName")) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          branchName: "Invalid branch name",
        }));
      }
      if (error.message.includes("branchCode")) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          branchCode: "Invalid branch code",
        }));
      }
      if (error.message.includes("accountNo")) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          accountNumber: "Invalid account number",
        }));
      }
      if (error.message.includes("accountIban")) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          iban: "Invalid IBAN",
        }));
      }
      if (error.message.includes("accountTitle")) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          accountTitle: "Invalid account title",
        }));
      }
      if (error.message.includes("idDocFront")) {
        setIdError("Invalid ID document front");
      }
      if (error.message.includes("idDocBack")) {
        setIdError("Invalid ID document back");
      }
      if (error.message.includes("bankCopy")) {
        setBankError("Invalid bank cheque");
      }
    }
  };

  const handleBackClick = () => {
    const isConfirmed = window.confirm(
      "If you go back, your information will be lost. Are you sure you want to proceed?"
    );

    if (isConfirmed) {
      navigate("/shop-setup");
    } else {
      return;
    }
  };

  return (
    <form
      className="max-w-3xl mx-auto mt-8 p-4 bg-white rounded-md shadow-md mb-8"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl mb-4 text-deepblue font-medium text-center">
        Enter Your ID and Bank Details
      </h2>
      <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-8">
        {/* ID Form */}
        <div className="flex-1 max-w-sm">
          <div className="flex mb-4">
            <div className="w-1/2 pr-2">
              <InputField
                labelStyle="font-medium"
                type="text"
                id="idName"
                value={idName}
                onChange={(e: {
                  target: { value: React.SetStateAction<string> };
                }) => setIdName(e.target.value)}
                label="ID Name"
                required
                error={errors.idName}
              />
            </div>
            <div className="w-1/2 pl-2">
              <InputField
                labelStyle="font-medium"
                type="text"
                id="idNumber"
                value={idNumber}
                onChange={(e: {
                  target: { value: React.SetStateAction<string> };
                }) => setIdNumber(e.target.value)}
                label="ID Number"
                required
                error={errors.idNumber}
              />
            </div>
          </div>
          <div className="flex mb-4">
            <div className="w-full">
              <ImageInput
                onChange={(file) => setIdDocumentFront(file)}
                label="Front Side ID Document"
                
              />
            </div>
          </div>
          <div className="flex mb-4">
            <div className="w-full">
              <ImageInput
                onChange={(file) => setIdDocumentBack(file)}
                label="Back Side ID Document"
                
              />
            </div>
          </div>
          {/* {idError && <p className="text-red-500">{idError}</p>} */}
        </div>
        {/* Bank Section Form */}
        <div className="flex-1 max-w-sm">
          <div className="flex mb-4">
            <div className="w-full">
              <ImageInput
                onChange={(file) => setBankChequeFront(file)}
                label="Bank Cheque/Bank Statement"
                
              />
            </div>
          </div>
          <div className="flex mb-4">
            <div className="w-1/2 pr-2">
              <InputField
                labelStyle="font-medium"
                type="text"
                id="bankName"
                value={bankName}
                onChange={(e: {
                  target: { value: React.SetStateAction<string> };
                }) => setBankName(e.target.value)}
                label="Bank Name"
                required
                error={errors.bankName}
              />
            </div>
            <div className="w-1/2 pl-2">
              <InputField
                labelStyle="font-medium"
                type="text"
                id="branchName"
                value={branchName}
                onChange={(e: {
                  target: { value: React.SetStateAction<string> };
                }) => setBranchName(e.target.value)}
                label="Branch Name"
                required
                error={errors.branchName}
              />
            </div>
          </div>
          <div className="flex mb-4">
            <div className="w-1/2 pr-2">
              <InputField
                labelStyle="font-medium"
                type="text"
                id="branchCode"
                value={branchCode}
                onChange={(e: {
                  target: { value: React.SetStateAction<string> };
                }) => setBranchCode(e.target.value)}
                label="Branch Code"
                required
                error={errors.branchCode}
              />
            </div>
            <div className="w-1/2 pl-2">
              <InputField
                labelStyle="font-medium"
                type="text"
                id="accountTitle"
                value={accountTitle}
                onChange={(e: {
                  target: { value: React.SetStateAction<string> };
                }) => setAccountTitle(e.target.value)}
                label="Account Title"
                required
                error={errors.accountTitle}
              />
            </div>
          </div>
          <div className="flex mb-4">
            <div className="w-1/2 pr-2">
              <InputField
                labelStyle="font-medium"
                type="text"
                id="accountNumber"
                value={accountNumber}
                onChange={(e: {
                  target: { value: React.SetStateAction<string> };
                }) => setAccountNumber(e.target.value)}
                label="Account Number"
                required
                error={errors.accountNumber}
              />
            </div>
            <div className="w-1/2 pl-2">
              <InputField
                labelStyle="font-medium"
                type="text"
                id="iban"
                value={iban}
                onChange={(e: {
                  target: { value: React.SetStateAction<string> };
                }) => setIban(e.target.value)}
                label="IBAN"
                required
                error={errors.iban}
              />
            </div>
          </div>
          {/* {bankError && <p className="text-red-500">{bankError}</p>} */}
        </div>
      </div>
      <div className="flex justify-between mt-8">
        <Button
          type="button"
          style="w-20 text-center justify-center"
          onClick={handleBackClick}
        >
          Back
        </Button>

        <Button type="submit" style="w-20 text-center justify-center">
          Submit
        </Button>
      </div>
    </form>
  );
};
export default Payment;
