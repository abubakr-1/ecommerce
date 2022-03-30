import { getAuth } from "firebase/auth";
import Spinner from "../components/layout/Spinner";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import { useEffect, useState } from "react";

const StartSelling = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const auth = getAuth();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const userRef = doc(db, "users", auth.currentUser.uid);
    const user = await getDoc(userRef);

    setCurrentUser(user.data());
    setLoading(false);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const userRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(userRef, {
        type: "seller",
        address,
      });

      toast.success("You are a seller now");
      navigate("/create-product");
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      {currentUser &&
        (currentUser.type === "buyer" ? (
          <div className="px-5 sm:px-10 mt-3">
            <form
              onSubmit={onSubmit}
              className="card w-full md:w-96  bg-secondary text-secondary-content mt-8 mr-5 md:pr-0"
            >
              <div className="card-body">
                <h2 className="card-title capitalize">Sell your products</h2>
                <p>Become an international brand</p>
                <div className="card-actions justify-start">
                  <input
                    type="text"
                    required
                    placeholder="Your Address"
                    className="input input-sm my-2 bg-secondary-content focus:outline-none w-full mr-5 text-secondary"
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <button className="btn btn-sm text-xs btn-outline">
                    Start Selling
                  </button>
                </div>
              </div>
            </form>
          </div>
        ) : (
          <div className="px-5 sm:px-10 mt-3">
            <div className="card w-full lg:w-96  bg-secondary text-secondary-content  mt-8 mr-5 md:pr-0">
              <div className="card-body">
                <h2 className="card-title capitalize">Create a Product</h2>
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
          </div>
        ))}
    </>
  );
};

export default StartSelling;
