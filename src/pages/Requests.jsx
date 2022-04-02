import { getDocs, orderBy, query, where, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase.config";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import RequestsItem from "../components/RequestsItem";
import Spinner from "../components/layout/Spinner";
import { itMatchesOne } from "daisyui/src/lib/postcss-prefixer/utils";

const Requests = ({}) => {
  const auth = getAuth();
  const [requests, setRequests] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const reqRef = collection(db, "requests");
      const reqSnap = await getDocs(reqRef);

      let rs = [];

      reqSnap.forEach((doc) => {
        return rs.push({
          data: doc.data(),
          id: doc.id,
        });
      });

      rs.filter((item) => item.data.userRef !== auth.currentUser.uid);

      setRequests(rs);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  if (requests.length <= 0) {
    return (
      <h1 className="text-2xl font-bold p-4">There are no requests for You</h1>
    );
  }

  return (
    <main className="pl-10 pt-6 pr-20 bg-gradient-to-br to-teal-700 from-slate-700 min-h-screen pb-6">
      <h1 className="text-4xl font-bold">Requests</h1>
      <div className="grid grid-cols-1">
        {requests.map((request) => (
          <RequestsItem request={request.data} id={request.id} />
        ))}
      </div>
    </main>
  );
};
export default Requests;
