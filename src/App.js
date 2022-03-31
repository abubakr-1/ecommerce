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
import EditProducts from "./pages/EditProducts";
import EditProduct from "./pages/EditProduct";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";

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
        <Route path="/edit-products" element={<PrivateRouteSeller />}>
          <Route path="/edit-products" element={<EditProducts />} />
        </Route>
        <Route path="/start-selling" element={<PrivateRoute />}>
          <Route path="/start-selling" element={<StartSelling />} />
        </Route>
        <Route path="/checkout" element={<PrivateRoute />}>
          <Route path="/checkout" element={<Checkout />} />
        </Route>
        <Route path="/orders" element={<PrivateRoute />}>
          <Route path="/orders" element={<Orders />} />
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
        <Route
          element={<PrivateRouteSeller />}
          path="/edit-products/:editProductId"
        >
          <Route
            element={<EditProduct />}
            path="/edit-products/:editProductId"
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
