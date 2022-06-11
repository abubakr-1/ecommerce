//* firebase
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase.config";
//component
import ProductItem from "../components/ProductItem";
import Spinner from "../components/layout/Spinner";

const Category = () => {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastProduct, setLastProduct] = useState(null);
  const [isEnd, setIsEnd] = useState(false);

  const isMounted = useRef(true);

  useEffect(() => {
    if (isMounted) {
      fetchProducts();
    }
    return () => {
      isMounted.current = false;
    };
  }, [isMounted]);

  const params = useParams();

  const fetchProducts = async () => {
    try {
      const productsRef = collection(db, "products");

      const q = query(
        productsRef,
        where("type", "==", params.categoryName),
        orderBy("timestamp", "desc"),
        limit(10)
      );

      const querySnap = await getDocs(q);

      const lastVisible = querySnap.docs[querySnap.docs.length - 1];

      setLastProduct(lastVisible);

      const products = [];

      querySnap.forEach((doc) => {
        return products.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setProducts(products);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMoreProducts = async () => {
    try {
      const productsRef = collection(db, "products");

      const q = query(
        productsRef,
        where("type", "==", params.categoryName),
        orderBy("timestamp", "desc"),
        startAfter(lastProduct),
        limit(10)
      );

      const querySnap = await getDocs(q);

      const lastVisible = querySnap.docs[querySnap.docs.length - 1];

      setLastProduct(lastVisible);

      const products = [];

      querySnap.forEach((doc) => {
        return products.push({
          id: doc.id,
          data: doc.data(),
        });
      });

      if (products.length < 10) {
        setIsEnd(true);
      }

      setProducts((prevState) => [...prevState, ...products]);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="mx-10 my-10">
      <h1 className="badge h-8 w- text-lg font-semibold">
        Category: {params.categoryName}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 mt-10">
        {loading ? (
          ""
        ) : products && products.length > 0 ? (
          products.map((product) => (
            <ProductItem
              product={product.data}
              id={product.id}
              key={product.id}
            />
          ))
        ) : (
          <h3 className="text-lg font-semibold mt-8">
            No products for {params.categoryName}
          </h3>
        )}
      </div>

      <br />

      {lastProduct && !isEnd && (
        <button className="btn mt-3 btn-xs text-xs" onClick={fetchMoreProducts}>
          Load More
        </button>
      )}

      {isEnd && <p className="badge badge-outline mt-3">No more Products</p>}
    </div>
  );
};

export default Category;
