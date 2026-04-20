import formimg2 from "../../assests/images/formimg2.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button, InputField } from "../../components";

export const SignIn: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const navigate = useNavigate(); 

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username) {
      setErrors({ username: "Enter Username!" });
      return;
    }

    if (!password) {
      setErrors({ password: "Enter Password!" });
      return;
    }

    try {
      const response = await fetch("http://localhost:5001/api/v1/auth/retailer/sign-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      const user = await response.json();
      localStorage.setItem("token", user.result.sessionToken);

      console.log(user.result.sessionToken);
 
      setUsername("");
      setPassword("");
      
      navigate(`/dashboard`);

    } catch (err: any) {
      console.log(err.message);
      let error = err['message'].split(":")[1].trim();
      if (error === "User not Found") {
        setErrors((prevErrors) => {
          return {
            ...prevErrors,
            username: error as string,
          };
        });
      }
      if (error.includes("Invalid Password")) {
        setErrors((prevErrors) => {
          return {
            ...prevErrors,
            password: error as string,
          };
        });
      }
      if (error.includes("at least 8")) {
        setErrors((prevErrors) => {
          return {
            ...prevErrors,
            password: error,
          };
        });
      }
      if (error === "User is not verified") {
        navigate(`/verify-account`);
      }
    }
  };

  return (
    <div className="w-full h-screen flex flex-col md:flex-row items-center">
      {/* Show image on larger screens */}
      <div className="relative w-full h-60 md:w-1/2 md:h-full overflow-hidden">
        <img
          src={formimg2}
          className="w-full h-full object-cover md:object-contain"
          style={{ objectFit: "contain" }}
          alt="Background Image"
        />
      </div>

      {/* Show form on all screens */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-dark p-6 rounded-md shadow-md">
          <div className="text-center mb-4">
            <p className="text-2xl font-medium text-deepblue">
              SIGN IN TO YOUR ACCOUNT
            </p>
          </div>
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <InputField
              labelStyle=" font-medium"
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
              label="Username"
              error={errors.username}
            />
            <InputField
              labelStyle=" font-medium"
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              label="Password"
              error={errors.password}
            />
            {/* "Forgot Password" link */}
            <div className="mt-2 text-left">
              <Link to="/Resetpassword" className="text-sm underline">
                Forgot Password?
              </Link>
            </div>
            <div className="mt-6 flex items-center justify-center">
              <Button type="submit" style="w-20 items-center justify-center">
                Sign In
              </Button>
            </div>
          </form>
          <p className="mt-4 text-center text-deepblue font-medium">
            Don't have an account?{" "}
            <Link to="/sign-up" className="underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
