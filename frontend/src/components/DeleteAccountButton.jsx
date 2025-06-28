import { useState, useEffect, useContext } from "react";
import AccountDeletionForm from "./AccountDeletionForm";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import toast from "react-hot-toast";

export default function DeleteAccountButton () {
  const [deletionRequested, setDeletionRequested] = useState(false);
  const { user, showDeletionForm, setShowDeletionForm } = useContext(AuthContext);
  const token = JSON.parse(localStorage.getItem('user'))?.token;

  useEffect(() => {
    const fetchDeletionStatus = async () => {
      try {
        const response = await axios.get(
          `${__API_URL__}/users/${user._id}/deletion-status`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setDeletionRequested(response.data.requested);
      } catch (err) {
        console.error("Error fetching deletion status:", err);
      }
    };

    fetchDeletionStatus();
  }, [user._id]);

  const handleButtonClick = async () => {
    try {
      if (!deletionRequested) {
        setShowDeletionForm(true);
      } else {
        await axios.post(
          `${__API_URL__}/users/${user._id}/cancel-deletion?user_requested=true`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setDeletionRequested(false);
        toast.success("Request cancled Successfully")
      }
    } catch (err) {
      console.error("Error handling deletion request:", err);
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={handleButtonClick}
        className={`${
          deletionRequested 
            ? "bg-yellow-200 text-black hover:bg-yellow-300" 
            : "bg-red-400 text-white hover:bg-red-500"
        } p-2 rounded`}
      >
        {deletionRequested
          ? "Cancel Deletion Request"
          : "Request Account Deletion"}
      </button>

      {showDeletionForm && (
        <div className="mt-4">
          <AccountDeletionForm 
            userId={user._id} 
            onSuccess={() => {
              setDeletionRequested(true);
              setShowDeletionForm(false);
            }}
          />
        </div>
      )}
    </div>
  );
}