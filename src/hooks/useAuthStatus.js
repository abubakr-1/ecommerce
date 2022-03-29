import { useEffect, useRef, useState } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase.config";

export const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [checkLogInStatus, setCheckLogInStatus] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  const isMounted = useRef(true);

  const auth = getAuth();

  useEffect(() => {
    if (isMounted) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          isASeller(user);
          setLoggedIn(true);
        }

        setCheckLogInStatus(false);
      });
    }
    return () => {
      isMounted.current = false;
    };
  }, [isMounted]);

  const isASeller = async (user) => {
    try {
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      setCurrentUser(userSnap.data());
    } catch (error) {
      console.log(error);
    }
  };

  return { loggedIn, checkLogInStatus, currentUser };
};
