import {
  PlusCircleIcon,
  MinusCircleIcon,
  TrashIcon,
} from "@heroicons/react/solid";

const CartItem = ({ cartProduct, increment, decrement, remove }) => {
  return (
    <main className="card lg:card-side shadow-2xl mt-8 bg-slate-50 card-compact">
      <figure>
        <img src={cartProduct.data.imgUrls[0]} alt="" />
      </figure>
      <div className="card-body text-slate-700 mx-5">
        <div className="mb-2">
          <h1 className="card-title text-4xl">{cartProduct.data.name}</h1>
          <p className="badge badge-primary">{cartProduct.data.sellerName}</p>
          <p className="ml-2 mt-2 font-bold badge badge-accent">
            $
            {cartProduct.data.price
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </p>
        </div>
        <div className="card-actions justify-start mt-10 w-full">
          <div className="flex justify-between">
            <button onClick={() => increment(cartProduct)}>
              <PlusCircleIcon className="h-10 text-emerald-400 hover:scale-125 transition-all duration-75 ease-in" />
            </button>
            <p className="mt-3 ml-2 font-semibold">{cartProduct.count}</p>
            <button className="ml-2" onClick={() => decrement(cartProduct)}>
              <MinusCircleIcon className="h-10 text-blue-400 hover:scale-125 transition-all duration-75 ease-in" />
            </button>
          </div>
        </div>
        <div className="card-actions justify-end">
          <button onClick={() => remove(cartProduct)}>
            <TrashIcon className="h-10 text-red-400 hover:scale-125 transition-all duration-75 ease-in" />
          </button>
        </div>
      </div>
    </main>
  );
};
export default CartItem;
