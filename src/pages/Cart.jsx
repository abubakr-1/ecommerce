import { useContext, useEffect, useState } from "react";
import CartItem from "../components/CartItem";
import Spinner from "../components/layout/Spinner";
import { CartContext } from "../context/cartContext";

const Cart = ({}) => {
  const { cartProducts, loading, total, increment, decrement, remove } =
    useContext(CartContext);

  if (loading) {
    return <Spinner />;
  }

  if (cartProducts.length === 0) {
    return (
      <h1 className="mx-10 mt-10 text-4xl font-semibold">Your Cart is Empty</h1>
    );
  }

  return (
    <main className="mx-10 my-5">
      <h1 className="text-4xl font-bold">Cart</h1>
      {cartProducts.map((product) => (
        <CartItem
          cartProduct={product}
          key={product.id}
          increment={increment}
          decrement={decrement}
          remove={remove}
        />
      ))}
      <h3 className="pt-4 font-semibold">Total: ${total}</h3>
      <button className="btn w-full mt-8">Checkout</button>
    </main>
  );
};
export default Cart;
