import { CartContext } from "../context/cartContext";
import { useEffect, useContext, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import Spinner from "../components/layout/Spinner";
import { db } from "../firebase.config";
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Checkout = ({}) => {
  const auth = getAuth();
  const [user] = useAuthState(auth);

  const {
    fetchCartProducts,
    cartProducts,
    loading,
    total,
    fetchCartLengthAndTotal,
  } = useContext(CartContext);

  const [spinning, setSpinning] = useState(false);
  const [address, setAddress] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchCartProducts();
  }, [user]);

  if (loading || spinning) {
    return <Spinner />;
  }

  const order = async (e) => {
    setSpinning(true);
    e.preventDefault();

    await addDoc(collection(db, "orders"), {
      address,
      cartProducts,
      total: total / 1.5,
      buyerTotal: total,
      status: "not shipped",
      buyerRef: user.uid,
    });

    for (let i = 0; i < cartProducts.length; i++) {
      await addDoc(collection(db, "requests"), cartProducts[i]);
    }

    for (let i = 0; i < cartProducts.length; i++) {
      await deleteDoc(doc(db, `users/${user.uid}/cart`, cartProducts[i].id));
      fetchCartProducts();
      fetchCartLengthAndTotal();
    }

    toast.success("Thank You for your order it will be shipped soon");
    navigate(`/orders/`);
    setSpinning(false);
  };

  return (
    <div>
      <h1 className="mx-10 mt-4 text-4xl font-bold">Checkout</h1>
      <form className="mx-auto px-4 mt-20 shadow-lg bg-slate-50 text-slate-700  w-72 rounded-lg">
        <input
          type="text"
          placeholder="Address"
          className="input input-bordered mt-3 text-slate-100"
          required
          minLength="10"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <p className="mt-5 font-semibold">
          Shipping: <span>${Math.round(total / 3 - total / 5)}</span>
        </p>
        <p className="mt-2 font-semibold">
          Total: <span className="font-medium">${total}</span>
        </p>
        <p className="mt-2 font-semibold">
          Products:{" "}
          {cartProducts.map((product) => (
            <span className="font-medium ml-1" key={product.id}>
              {product.count} {product.data.name},
            </span>
          ))}
        </p>
        <button className="btn mt-4 w-full btn-sm mb-3" onClick={order}>
          Order
        </button>
      </form>
    </div>
  );
};
export default Checkout;
