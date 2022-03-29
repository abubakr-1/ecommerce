import { Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import Category from "./pages/Category";
import CreateProducts from "./pages/CreateProducts";
import Ecommerce from "./pages/Ecommerce";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import PrivateRouteSeller from "./components/PrivateRouteSeller";
import StartSelling from "./pages/StartSelling";
import { ToastContainer } from "react-toastify";
import ForgotPassword from "./pages/ForgotPassword";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import { CartProvider } from "./context/cartContext";

function App() {
  return (
    <CartProvider>
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route element={<Ecommerce />} path="/" />
        <Route element={<SignUp />} path="/sign-up" />
        <Route element={<SignIn />} path="/sign-in" />
        <Route element={<Category />} path="/category/:categoryName" />
        <Route path="/profile" element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/create-product" element={<PrivateRouteSeller />}>
          <Route path="/create-product" element={<CreateProducts />} />
        </Route>
        <Route path="/start-selling" element={<PrivateRoute />}>
          <Route path="/start-selling" element={<StartSelling />} />
        </Route>
        <Route
          path="/category/:catrgoryName/:productId"
          element={<PrivateRoute />}
        >
          <Route
            element={<Product />}
            path="/category/:catrgoryName/:productId"
          />
        </Route>
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/cart" element={<PrivateRoute />}>
          <Route path="/cart" element={<Cart />} />
        </Route>
      </Routes>
    </CartProvider>
  );
}

export default App;
