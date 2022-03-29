import { Link } from "react-router-dom";

const Ecommerce = () => {
  return (
    <div className="container px-6 mt-36">
      <h1 className="text-4xl font-bold mb-4">Ecommerce</h1>
      <div className=" mt-5 w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        <Link
          to={`/category/groceries`}
          className="card w-full bg-accent text-accent-content shadow-lg"
        >
          <div className="card-body">
            <h2 className="card-title">Groceries</h2>
          </div>
        </Link>
        <Link
          to={`/category/gaming-tech`}
          className="card w-full bg-secondary text-secondary-content shadow-lg"
        >
          <div className="card-body">
            <h2 className="card-title">Gaming and Tech</h2>
          </div>
        </Link>
        <Link
          to={`/category/electronics`}
          className="card w-full bg-neutral text-neutral-content shadow-lg"
        >
          <div className="card-body">
            <h2 className="card-title">Electronics</h2>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Ecommerce;
