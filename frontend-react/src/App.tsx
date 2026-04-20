import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Dashboard,
  Products,
  Orders,
  Signup,
  SignIn,
  AddProduct,
  Settings,
  Shop,
  Sales,
  Home,
  Otp,
  Payment,
  Profilesetup,
  Resetpassword,
  Insights,
} from "./pages";

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="" element={<Insights />} />

          <Route path="insights" element={<Insights />} />
          <Route path="products" element={<Products />} />
          <Route path="products/add-products" element={<AddProduct />} />
          <Route path="sales" element={<Sales />} />
          <Route path="orders" element={<Orders />} />
          <Route path="shop" element={<Shop />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/Resetpassword" element={<Resetpassword />} />
        <Route path="/verify-account" element={<Otp />} />
        <Route path="/shop-setup" element={<Profilesetup />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </Router>
  );
};

export default App;
