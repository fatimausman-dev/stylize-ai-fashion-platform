import { Link } from "react-router-dom";
import { useState } from "react";
import { Button, InputField, Alert } from "../../components";

export const Resetpassword: React.FC= () => {
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [showPasswordUpdatedAlert, setShowPasswordUpdatedAlert] = useState(false);
  const [passwordFieldActive, setPasswordFieldActive] = useState(false);
  const [isInvalidEmail, setIsInvalidEmail] = useState(false);

  const mockUserArray = ["user1@example.com", "user2@example.com"];

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    setIsInvalidEmail(false);
    setIsEmailValid(!!emailValue.trim());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (mockUserArray.includes(email)) {
      setIsEmailValid(true);
      setPasswordFieldActive(true);
    } else {
      setIsInvalidEmail(true);
      setIsEmailValid(false);
      setPasswordFieldActive(false);
    }

    setEmail("");
  };

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPasswordValue = e.target.value;
    setNewPassword(newPasswordValue);

    const isPasswordValid =
      newPasswordValue.length >= 8 &&
      /[a-z]/.test(newPasswordValue) &&
      /[A-Z]/.test(newPasswordValue) &&
      /\d/.test(newPasswordValue);

    setIsPasswordValid(isPasswordValid);
  };

  const handleSetNewPassword = () => {
    setShowPasswordUpdatedAlert(true);
  };

  const handleCloseAlert = () => {
    setShowPasswordUpdatedAlert(false);
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 bg-dark p-6 rounded-md shadow-lg border-lightpurple-500">
        <div className="text-center mb-4">
          <p className="text-2xl font-medium text-deepblue">Reset Password</p>
        </div>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          {!passwordFieldActive && (
            <div>
              <InputField
                labelStyle="font-medium"
                type="text"
                id="email"
                value={email}
                onChange={handleEmailChange}
                label="Email"
                required
              />
              {isInvalidEmail && (
                <p className="text-red-500 text-sm">
                  Invalid email. Please check your email and try again.
                </p>
              )}
            </div>
          )}
          <div className="mt-4 flex items-center justify-center">
            {!passwordFieldActive && (
              <Button
                type="submit"
                style="w-full md:w-20 items-center justify-center"
                disabled={!isEmailValid}
              >
                Submit
              </Button>
            )}
          </div>
        </form>
        {passwordFieldActive && (
          <form className="mt-4">
            <InputField
              labelStyle="font-medium"
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={handleNewPasswordChange}
              label="New Password"
            />
            {!isPasswordValid && (
              <p className="-mt-2 text-red-500 text-sm">
                Password must have 8 characters, a digit, an uppercase and
                lowercase letter.
              </p>
            )}
            <div className="mt-4 flex items-center justify-center">
              <Button
                type="button"
                style="w-full md:w-20 items-center justify-center"
                disabled={!isPasswordValid}
                onClick={handleSetNewPassword}
              >
                Submit
              </Button>
            </div>
          </form>
        )}

        {showPasswordUpdatedAlert && (
          <Alert onClose={handleCloseAlert} style="bg-black mt-2 pt-2 pb-2">
            Password successfully updated!
          </Alert>
        )}
        <p className="mt-4 text-center text-sm  text-deepblue">
          Password Reset?{" "}
          <Link to="/sign-in" className="underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Resetpassword;
