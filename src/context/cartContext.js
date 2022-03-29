import { createContext } from "react";
import { getAuth } from "firebase/auth";
import { getDocs, collection, deleteDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { db } from "../firebase.config";
import { doc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const auth = getAuth();

  const [cartProducts, setCartProducts] = useState(null);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [user] = useAuthState(auth);
  const [cartLength, setCartLength] = useState(0);

  useEffect(() => {
    fetchCartProducts();
    fetchCartLengthAndTotal();
  }, [user]);

  const fetchCartLengthAndTotal = async () => {
    if (user) {
      try {
        const docRef = collection(db, `users/${user.uid}/cart`);
        const docSnap = await getDocs(docRef);

        const item = docSnap.docs.map((doc) => doc.data());

        const price = item.reduce(
          (a, v) => (a = a + parseInt(v.data.price) * v.count),
          0
        );

        setCartLength(docSnap.docs.length);
        setTotal(price);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const fetchCartProducts = async () => {
    try {
      if (user) {
        const docRef = collection(db, `users/${user.uid}/cart`);
        const docSnap = (await getDocs(docRef)).docs.map((doc) => doc.data());

        setCartProducts(docSnap);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const increment = async (cartProduct) => {
    setLoading(true);
    try {
      const docRef = doc(db, `users/${user.uid}/cart/${cartProduct.id}`);
      await updateDoc(docRef, {
        count: cartProduct.count + 1,
      });

      fetchCartProducts();
      fetchCartLengthAndTotal();
    } catch (error) {
      toast.error("Something went wrong");
      setLoading(true);
    }
  };

  const decrement = async (cartProduct) => {
    setLoading(true);
    try {
      const docRef = doc(db, `users/${user.uid}/cart/${cartProduct.id}`);
      await updateDoc(docRef, {
        count: cartProduct.count - 1,
      });
      fetchCartProducts();
      fetchCartLengthAndTotal();
    } catch (error) {
      toast.error("Something went wrong");
      setLoading(true);
    }
  };

  const remove = async (cartProduct) => {
    setLoading(true);
    try {
      const docRef = doc(db, `users/${user.uid}/cart/${cartProduct.id}`);
      await deleteDoc(docRef);

      fetchCartProducts();
      fetchCartLengthAndTotal();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        remove,
        increment,
        decrement,
        loading,
        total,
        cartLength,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
