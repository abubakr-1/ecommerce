import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { setDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import Spinner from "../components/layout/Spinner";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { toast } from "react-toastify";
import { CartContext } from "../context/cartContext";

const Product = ({}) => {
  const auth = getAuth();
  const [user] = useAuthState(auth);

  const { fetchCartLengthAndTotal, fetchCartProducts } =
    useContext(CartContext);

  const params = useParams();

  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, [params.productId]);

  const fetchProduct = async () => {
    const docRef = doc(db, "products", params.productId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setProduct({
        id: docSnap.id,
        data: docSnap.data(),
      });
      setLoading(false);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  const addToCart = async () => {
    const productCopy = product;
    productCopy.status = "not shipped";
    productCopy.count = 1;

    const docRef = doc(db, `users/${user.uid}/cart`, productCopy.id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      try {
        await setDoc(
          doc(db, `users/${user.uid}/cart`, productCopy.id),
          productCopy
        );

        fetchCartLengthAndTotal();
        fetchCartProducts();
        toast.success("Added to Cart");
        navigate("/cart");
      } catch (error) {
        console.log(error);
      }
    } else if (docSnap.exists()) {
      try {
        await updateDoc(docRef, {
          count: productCopy.count + 1,
        });
        fetchCartLengthAndTotal();
        fetchCartProducts();
        toast.success("Product is Added Again");
        navigate("/cart");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    product && (
      <main className="mx-10 mt-5">
        <h1 className="text-4xl font-bold capitalize">
          {product.data.name} - ${product.data.price}
        </h1>
        <div className="carousel carousel-center max-w-full p-6 space-x-6 bg-neutral mt-6 rounded-box">
          {product.data.imgUrls.map((img) => (
            <div className="carousel-item" key={img}>
              <img src={img} alt="" className="rounded-box" />
            </div>
          ))}
        </div>
        <p className="mt-6 font-semibold pb-6">{product.data.description}</p>
        <button className="btn mb-5 w-full" onClick={addToCart}>
          Add to Cart
        </button>
      </main>
    )
  );
};
export default Product;
