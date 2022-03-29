import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import OAuth from "../components/OAuth";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (userCredential.user) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="form-control mx-10 my-10" onSubmit={handleSubmit}>
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
      <label className="input-group input-group mb-2">
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
      <Link
        to="/forgot-password"
        className="btn btn-link btn-xs text-emerald-400 mb-12 justify-end ml-1"
      >
        Forgot Password
      </Link>
      <button className="btn">Sign In</button>
      <Link to="/sign-up" className="btn btn-link mt-5">
        Sign Up Instead
      </Link>
      <OAuth />
    </form>
  );
};

export default SignIn;
