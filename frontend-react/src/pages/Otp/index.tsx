// OTPVerification.tsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, InputField } from "../../components";

export const Otp = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const enteredOtp = e.target.value;

    // Ensure that the entered OTP is only numeric and 6 digits long
    if (/^\d{0,6}$/.test(enteredOtp)) {
      setOtp(enteredOtp);
      setError("");
    } else {
      setError("Please enter a valid 6-digit OTP");
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }

    try {
      const response = await fetch('http://localhost:5001/api/v1/auth/retailer/code-verify', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
        body: JSON.stringify({ code: otp, codeType: "SIGN_UP" })
      })
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      const data = await response.json();
      localStorage.setItem('token', data.result.sessionToken);

      setOtp("");
      navigate("/shop-setup");
    } catch (error) {
        setError(error as string);
    }
  };

  const handleResendOtp = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/v1/auth/retailer/code-resend', {
        
      })
    } catch (error: unknown) {
        setError(error as string);
    }
    // Logic to resend OTP
  //   setOtp(""); // Clear the OTP input field
  //   setError(""); // Clear any previous error message
  //   const user = getUserData(); // Retrieve user data based on your logic
  //   if (user) {
  //     user.otpCode = generateRandomCode(); // Replace with your logic to resend and generate a new OTP code
  //   }
  // };

  // const getUserData = () => {
  //   // Logic to retrieve user data based on your application (could be from API, context, etc.)
  //   // For simplicity, I'm returning user1, but in a real scenario, you would fetch user data.
  //   return user1;
   };

  return (
    <div className="min-h-screen flex overflow-hidden items-center justify-center">
      {/* OTP Verification Form */}
      <div className="w-full md:w-1/2 p-4 flex items-center justify-center">
        <div className="max-w-md w-full md:w-85 bg-dark p-5 rounded-md shadow-md ">
          <p className="text-2xl mb-3 text-center font-medium text-deepblue">
            VERIFY ACCOUNT
          </p>
          <form onSubmit={handleSubmit}>
            <InputField
              labelStyle="font-medium"
              type="text"
              id="otp"
              value={otp}
              onChange={handleOtpChange}
              label="Enter Code"
              error={error}
            />
            <div className="mt-3 mb-2 flex flex-row justify-between">
              <Button
                type="button"
                onClick={handleResendOtp}
                style="text-underline text-sm text-white-500 hover:text-white-700"
              >
                Resend OTP
              </Button>
                <Button
                  type="submit"
                  style="text-white-500 hover:text-white-700 w-20 items-center justify-center"
                >
                  Verify
                </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Otp;

