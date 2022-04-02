import { useNavigate, Link } from "react-router-dom";
import { getAuth } from "firebase/auth";

const Profile = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  const onLogOut = () => {
    auth.signOut();
    navigate("/sign-in");
  };

  return (
    <div className="px-5 sm:px-10 mt-3">
      <div className="heading">
        <h3 className="text-4xl font-bold">Profile</h3>
      </div>
      <div className="grid grid-cols-1 lg:gap-8 gap-4 lg:grid-cols-2 mt-8">
        <div className="card  w-full md:w-96 bg-primary text-primary-content pr-5 md:pr-0">
          <div className="card-body">
            <h2 className="card-title">{auth.currentUser.displayName}</h2>
            <p>{auth.currentUser.email}</p>
            <div className="card-actions justify-start">
              <button
                onClick={() => navigate("/edit-products")}
                className="btn btn-sm text-xs mt-3 btn-outline"
              >
                Edit Products
              </button>
              <button
                className="btn btn-sm text-xs mt-3 btn-outline"
                onClick={onLogOut}
              >
                log out
              </button>
            </div>
          </div>
        </div>
        <div className="card w-full md:w-96  bg-accent text-accent-content">
          <div className="card-body">
            <h2 className="card-title capitalize">Create a product</h2>
            <p>Sell Your Product all over the World</p>
            <div className="card-actions justify-start">
              <Link
                to="/create-product"
                className="btn btn-sm text-xs mt-3 btn-outline"
              >
                Create a Product
              </Link>
            </div>
          </div>
        </div>
        <div className="card w-full md:w-96  bg-secondary text-secondary-content">
          <div className="card-body">
            <h2 className="card-title capitalize">Orders</h2>
            <p>Check your active orders</p>
            <div className="card-actions justify-start">
              <Link
                to="/orders"
                className="btn btn-sm text-xs mt-3 btn-outline"
              >
                Check Orders
              </Link>
            </div>
          </div>
        </div>
        <div className="card w-full md:w-96  bg-neutral mb-6 text-neutral-content">
          <div className="card-body">
            <h2 className="card-title capitalize">Requests</h2>
            <p>Check your active Requests</p>
            <div className="card-actions justify-start">
              <Link
                to="/requests"
                className="btn btn-sm text-xs mt-3 btn-outline"
              >
                Check Requests
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
