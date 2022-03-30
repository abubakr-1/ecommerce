import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { db } from "../firebase.config";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import Spinner from "../components/layout/Spinner";
import ProductItem from "../components/ProductItem";

const EditProducts = ({}) => {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);

  const auth = getAuth();
  const [user] = useAuthState(auth);

  useEffect(() => {
    fetchUserProducts();
  }, [user.uid]);

  const fetchUserProducts = async () => {
    const productsRef = collection(db, "products");
    const q = query(
      productsRef,
      where("userRef", "==", user.uid),
      orderBy("timestamp", "desc")
    );

    const querSnap = await getDocs(q);

    let products = [];

    querSnap.forEach((doc) => {
      return products.push({
        data: doc.data(),
        id: doc.id,
      });
    });

    setProducts(products);
    setLoading(false);
  };

  if (loading) {
    return <Spinner />;
  }

  if (products.length === 0) {
    return <h1 className="p-4">You have no Products</h1>;
  }

  return (
    <main className="px-10 mt-3">
      <h1 className="text-4xl font-bold">Edit Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 mt-10">
        {products.map((product) => (
          <ProductItem
            product={product.data}
            id={product.id}
            onEdit={true}
            key={product.id}
          />
        ))}
      </div>
    </main>
  );
};
export default EditProducts;
