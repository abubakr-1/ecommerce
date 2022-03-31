import { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { db } from "../firebase.config";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import { toast } from "react-toastify";

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    type: false,
    address: "",
  });

  const [display, setDisplay] = useState(false);

  const navigate = useNavigate();

  const { email, name, password, type, address } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleType = (e) => {
    setFormData({ ...formData, type: e.target.checked });
    setDisplay(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      updateProfile(auth.currentUser, {
        displayName: name,
      });

      const formDataCopy = { ...formData, type: type ? "seller" : "buyer" };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();
      formDataCopy.cart = [];
      !formDataCopy.address || (!display && delete formDataCopy.address);
      await setDoc(doc(db, "users", user.uid), formDataCopy);

      navigate("/");
    } catch (error) {
      toast.error("Please fill out all the fields");
    }
  };

  return (
    <form className="form-control mx-10 my-10" onSubmit={handleSubmit}>
      <label className="label cursor-pointer flex justify-start mb-5">
        <span className="label-text">Seller</span>
        <input
          type="checkbox"
          className="toggle ml-4"
          value={type}
          onChange={handleType}
        />
      </label>
      <label className="input-group mb-8">
        <span>Email</span>
        <input
          type="text"
          placeholder="info@site.com"
          className="input w-full input-bordered"
          id="email"
          onChange={handleChange}
          value={email}
        />
      </label>
      <label className="input-group input-group mb-8">
        <span>Name</span>
        <input
          type="text"
          placeholder="Name"
          className="input input-bordered w-full"
          id="name"
          onChange={handleChange}
          value={name}
        />
      </label>
      <label className="input-group input-group mb-6">
        <span>Password</span>
        <input
          type="password"
          placeholder="password"
          className="input input-bordered w-full"
          id="password"
          onChange={handleChange}
          value={password}
        />
      </label>
      {display && (
        <label className="input-group input-group mb-6">
          <span>Address</span>
          <input
            type="text"
            placeholder="Address"
            className="input input-bordered w-full"
            id="address"
            onChange={handleChange}
            value={address}
          />
        </label>
      )}
      <button className="btn mb-3">Sign Up</button>
      <Link to="/sign-in" className="btn btn-link mt-5">
        Sign In Instead
      </Link>
      <OAuth />
    </form>
  );
};

export default SignUp;
