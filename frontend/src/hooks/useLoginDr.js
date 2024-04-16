import React from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const useLoginDr = () => {
  const [loading2, setLoading] = React.useState(false);
  const { setAuthUser } = useAuthContext();
  const loginDr = async ({ email, password }) => {
    const success = handleInputError({
      email,
      password,
    });
    if (!success) return;

    console.log("check")
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signinDr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      localStorage.setItem("app-user", JSON.stringify(data));
      setAuthUser(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loginDr, loading2 };
};

export default useLoginDr;

function handleInputError({ email, password }) {
  //   console.log(email);
  if (!email || !password) {
    toast.error("Please fill all the fields");
    return false;
  }

  return true;
}
