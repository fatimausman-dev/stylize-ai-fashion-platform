import formimg2 from "../../assests/images/formimg2.jpg";
import { Link, useNavigate } from "react-router-dom";
import { SetStateAction, useState } from "react";
import { Button, InputField } from "../../components";

export const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
  });

  const navigate = useNavigate();

  const handleUsernameChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setUsername(e.target.value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      username: "",
    }));
  };

  const handleEmailChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setEmail(e.target.value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      email: "",
    }));
  };

  const handlePasswordChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setPassword(e.target.value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      password: "",
    }));
  };

  const handlePhoneNumberChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setPhone(e.target.value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      phone: "",
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // Validate username
    if (!username) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        username: "Username is required",
      }));
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Please enter a valid email address",
      }));
      return;
    }

    // Validate password format (at least 8 characters and contains special characters)
    const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/;
    if (!password || !passwordRegex.test(password)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password:
          "Password must be 8 letters long with a special char, a digit, an uppercase and lowercase letter.",
      }));
      return;
    }

    // Validate phone number format (Pakistan format)
    const phoneRegex = /^(\+92|0)\d{10}$/;
    if (!phone || !phoneRegex.test(phone)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        phoneNumber: "Please enter a valid Pakistan phone number",
      }));
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5001/api/v1/auth/retailer/sign-up",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, email, password, phone }),
        }
      );
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      const user = await response.json();
      localStorage.setItem("token", user.result.sessionToken);

      setUsername("");
      setEmail("");
      setPassword("");
      setPhone("");

      navigate(`/verify-account`);
      
    } catch (error) {
      if (error === "Username already exists") {
        setErrors((prevErrors) => {
          return {
            ...prevErrors,
            username: error as string,
          };
        });
      }
      if (error === "Email already exists") {
        setErrors((prevErrors) => {
          return {
            ...prevErrors,
            email: error as string,
          };
        });
      }
    }
  };

  return (
    <div className="w-full h-screen flex flex-col md:flex-row items-center">
      {/* Image */}
      <div className="relative w-50  md:w-1/2 md:h-full overflow-hidden">
        <img
          src={formimg2}
          alt="image not displayed"
          className="w-full h-full object-cover md:object-contain"
        />
      </div>
      {/* Signup Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center ">
        <div className="w-full max-w-md bg-dark p-6 rounded-md shadow-md">
          <div className="text-center mb-4">
            <p className="text-2xl font-medium text-deepblue">CREATE ACCOUNT</p>
          </div>
          <form onSubmit={handleSubmit}>
            <InputField
              labelStyle="font-medium"
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
              label="Username"
              error={errors.username}
              required
            />
            <InputField
              labelStyle="font-medium"
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              label="Password"
              error={errors.password}
            />
            <InputField
              labelStyle="font-medium"
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              label="Email"
              error={errors.email}
            />
            <InputField
              labelStyle="font-medium"
              type="tel"
              id="phoneNumber"
              value={phone}
              onChange={handlePhoneNumberChange}
              label="Phone Number"
              error={errors.phone}
            />
            <div className="mt-6 flex items-center justify-center">
              <Button type="submit" style="w-20 items-center justify-center">
                Sign Up
              </Button>
            </div>
          </form>
          <p className="mt-4 text-center text-deepblue font-medium">
            Already have an account?{" "}
            <Link to="/sign-in" className="underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
