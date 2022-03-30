import { Link } from "react-router-dom";
import { PencilIcon } from "@heroicons/react/solid";

const ProductItem = ({ product, id, onEdit }) => {
  if (!product.inStock) {
    return (
      <div className="card w-full bg-slate-50 shadow-2xl card-compact">
        <figure>
          <img src={product.imgUrls[0]} alt="" className="mt-3" />
        </figure>
        <div className="card-body text-slate-700">
          <h1 className="card-title ">
            {product.name}{" "}
            {onEdit && (
              <button>
                <PencilIcon />
              </button>
            )}
          </h1>
          <p>{product.sellerName}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-error btn-disabled btn-sm mb-1">
              Out of Stock
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card bg-slate-50 w-full md:w-10/12 shadow-2xl card-compact">
      <figure>
        <img src={product.imgUrls[0]} alt="" />
      </figure>
      <div className="card-body text-slate-900 flex flex-col justify-end">
        <div className="mb-2">
          <h1 className="card-title capitalize">{product.name} </h1>
          <p className="badge badge-primary">{product.sellerName}</p>
          <p className="ml-2 mt-2 font-bold badge badge-accent">
            $ {product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </p>
        </div>
        <div className="card-actions -mt-12 md:-mt-16 justify-end">
          {!onEdit ? (
            <Link
              to={`/category/${product.type}/${id}`}
              className="btn text-emerald-500 btn-sm border-2 border-emerald-500 bg-transparent transition-all mt-10 hover:bg-emerald-500 hover:border-emerald-500 hover:text-slate-50 ease-in-out"
            >
              Add to Cart
            </Link>
          ) : (
            <Link
              to={`/edit-products/${id}`}
              className="btn w-1/3 text-orange-500 btn-sm border-2 border-orange-500 bg-transparent transition-all mt-10 hover:bg-orange-500 hover:border-orange-500 hover:text-slate-50 ease-in-out"
            >
              Edit
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
