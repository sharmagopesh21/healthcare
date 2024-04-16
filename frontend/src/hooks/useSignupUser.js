import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSignupUser = () => {
  const [loading1, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const signupUser = async ({
    fullName,
    email,
    password,
    confirmPassword,
    gender,
    address,
    age,
    phone
  }) => {
    const success = handleInputError({
      fullName,
      email,
      password,
      confirmPassword,
      gender,
      address,
      age,
      phone
    });
    if (!success) return;

    setLoading(true);

    try {
      const res = await fetch("/api/auth/signupUser", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          password,
          confirmPassword,
          gender,
          address,
          age,
          phone,
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

  return { loading1, signupUser };
};

export default useSignupUser;

function handleInputError({
  fullName,
  email,
  password,
  confirmPassword,
  gender,
  address,
  age,
  phone,
}) {
  //   console.log(email);
  if (!fullName || !email || !password || !confirmPassword || !gender || !address || !age || !phone) {
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
