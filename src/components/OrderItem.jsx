import { TrashIcon } from "@heroicons/react/solid";

const OrderItem = ({ order, deleteOrder, id }) => {
  return (
    <main className="card w-full mt-8 card-compact glass card-bordered">
      <div className="card-body">
        {order.cartProducts.map((cartProduct) => (
          <h1 key={cartProduct.id} className="card-title font-bold">
            {cartProduct.data.name}
          </h1>
        ))}
        <p className="badge badge-accent mt-1">${order.buyerTotal}</p>
        <p className="badge badge-primary mt-1">{order.status}</p>

        <div className="card-actions justify-end">
          <button onClick={() => deleteOrder(id)}>
            <TrashIcon className="h-8  hover:scale-110 transition-all duration-75 ease-in" />
          </button>
        </div>
      </div>
    </main>
  );
};
export default OrderItem;
