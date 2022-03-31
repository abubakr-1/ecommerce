import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase.config";
import { getAuth } from "firebase/auth";
import Spinner from "../components/layout/Spinner";
import OrderItem from "../components/OrderItem";
import { Link } from "react-router-dom";

const Orders = ({}) => {
  const [orders, setOrders] = useState(null);
  const [loading, setLoading] = useState(true);

  const auth = getAuth();

  useEffect(() => {
    fetchUserOrders();
  }, []);

  const fetchUserOrders = async () => {
    try {
      const ordersRef = collection(db, "orders");
      const q = query(ordersRef, where("buyerRef", "==", auth.currentUser.uid));
      const qSnap = await getDocs(q);

      let orders = [];

      qSnap.forEach((doc) => {
        orders.push({
          data: doc.data(),
          id: doc.id,
        });
      });

      setOrders(orders);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteOrder = async (id) => {
    setLoading(true);
    try {
      const docRef = doc(db, "orders", id);
      await deleteDoc(docRef);
      setLoading(false);
      fetchUserOrders();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  if (orders && orders.length === 0) {
    return (
      <div className=" pt-6 mx-10">
        <h1 className="text-2xl font-semibold">
          You haven't Ordered Anything Yet
        </h1>
        <Link className="btn mt-5 " to="/">
          Go to Home
        </Link>
      </div>
    );
  }

  return (
    <main className="pl-10 pr-20 bg-gradient-to-br bg-1 pt-10 from-emerald-500 min-h-screen to-cyan-700">
      <h1 className="text-4xl pt-4 mb-2 font-bold">Your Orders</h1>
      {orders.map((order) => (
        <OrderItem
          order={order.data}
          key={order.id}
          id={order.id}
          deleteOrder={deleteOrder}
        />
      ))}
    </main>
  );
};
export default Orders;
