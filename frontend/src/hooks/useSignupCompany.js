import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSignupComp = () => {
  const [loading3, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const signupComp = async ({
    Name,
    email,
    password,
    confirmPassword,
    address,
    phone
  }) => {
    const success = handleInputError({
        Name,
        email,
        password,
        confirmPassword,
        address,
        phone
    });
    if (!success) return;

    setLoading(true);

    try {
      const res = await fetch("/api/auth/signupComp", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
            Name,
            email,
            password,
            confirmPassword,
            address,
            phone
        }),
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      //local storage
      localStorage.setItem("app-user", JSON.stringify(data));
      //context
      setAuthUser(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading3, signupComp };
};

export default useSignupComp;

function handleInputError({
    Name,
    email,
    password,
    confirmPassword,
    address,
    phone
}) {
  //   console.log(email);
  if (!Name || !email || !password || !confirmPassword || !address || !phone) {
    toast.error("Please fill all the fields");
    return false;
  }

  if (password != confirmPassword) {
    toast.error("Passwords do not match");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }

  return true;
}
