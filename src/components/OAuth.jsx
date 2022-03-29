import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { useLocation, useNavigate } from "react-router-dom";
import googleIcon from "../assets/googleIcon.svg";
import { db } from "../firebase.config";

const OAuth = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const onGoogleClick = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName,
          email: user.email,
          type: "buyer",
          timestamp: serverTimestamp(),
        });

        navigate("/profile");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <p className="m-auto text-sm font-bold mt-2 cursor-default">
        {location.pathname === "/sign-up" ? "Sign Up" : "Sign In"}
      </p>
      <div className="container m-auto w-10 mt-1" onClick={onGoogleClick}>
        <button className="rounded-full h-10 shadow-sm w-10 bg-green-50 transition-all hover:shadow-green-50">
          <img src={googleIcon} alt="" className="avatar h-6" />
        </button>
      </div>
    </>
  );
};

export default OAuth;
