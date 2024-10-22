import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from "./components/Footer";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import ViewProduct from "./components/ViewProduct";
import Login from "./components/Login";
import NotFound from "./components/404";
import Signup from "./components/Signup";
import TermsAndConditions from "./components/TermsAndConditions";
import PrivacyPolicy from "./components/PrivacyPolicy";
import ContactUs from "./components/Contact";
import AboutUs from "./components/AboutUs";
import AllProducts from "./components/AllProducts";
import SearchList from "./components/SearchList";
import Cart from "./components/Cart";
import { CartProvider } from './context/CartContext';
import Checkout from './components/Checkout';
import MyOrders from './components/MyOrders';
import SellerDashboard from './components/seller/SellerDashboard';
import CreateProduct from './components/seller/CreateProduct';
import GetAllOrders from './components/seller/GetAllOrders';
import GetAllProducts from './components/seller/GetAllProducts';
import UpdateProduct from './components/seller/UpdateProduct';
import VerifyOtp from './components/VerifyOtp';
import VerifyForgotOtp from './components/VerifyForgotOtp';
import ChangePassword from './components/ChangePassword';

export default function App() {
  return (
    <BrowserRouter>
    <CartProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/forgot-password" element={<VerifyForgotOtp />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/my-cart" element={<Cart />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/checkout/:seller" element={<Checkout />} />
        <Route path="/all-products" element={<AllProducts />} />
        <Route path="/*" element={<NotFound />} />
        <Route path="/searchresults/:searchTerm" element={<SearchList />} />
        <Route path="/product/:productId" element={<ViewProduct />} />
        <Route path="/seller/dashboard" element={<SellerDashboard />} />
        <Route path="/seller/create-product" element={<CreateProduct />} />
        <Route path="/seller/get-all-orders" element={<GetAllOrders />} />
        <Route path="/seller/get-all-products" element={<GetAllProducts />} />
        <Route path="/seller/products/update/:id" element={<UpdateProduct />} />
      </Routes>
      <Footer />
      </CartProvider>
    </BrowserRouter>
  );
}
