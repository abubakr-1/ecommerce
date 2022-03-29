import { Link } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const onChange = (e) => {
    setEmail(e.target.value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();

      await sendPasswordResetEmail(auth, email);
      toast.success("Email was sent");
    } catch (error) {
      toast.error("Could not Send Email");
    }
  };

  return (
    <div className="mx-10 mt-3">
      <div className="heading">
        <p className="text-4xl font-bold">Forgot Password</p>
      </div>
      <form onSubmit={onSubmit} className="mt-10 form-control">
        <label className="input-group mt-2 ">
          <span>Email</span>
          <input
            type="text"
            required
            className="input input-bordered w-full"
            onChange={onChange}
            placeholder="email"
            value={email}
          />
        </label>
        <Link
          to="sign-in"
          className="btn btn-link btn-xs text-emerald-400 mt-6 justify-end"
        >
          Sign In
        </Link>
        <button className="btn mt-8">Send Reset Link</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
