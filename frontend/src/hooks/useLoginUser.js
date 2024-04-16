import React from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const useLoginUser = () => {
  const [loading1, setLoading] = React.useState(false);
  const { setAuthUser } = useAuthContext();
  const loginUser = async ({ email, password }) => {
    const success = handleInputError({
      email,
      password,
    });
    if (!success) return;

    setLoading(true);
    try {
      const res = await fetch("/api/auth/signinUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
       //console.log(data);
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

  return { loginUser, loading1 };
};

export default useLoginUser;

function handleInputError({ email, password }) {
  //   console.log(email);
  if (!email || !password) {
    toast.error("Please fill all the fields");
    return false;
  }

  return true;
}
