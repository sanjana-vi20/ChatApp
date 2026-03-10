import React, { useState } from "react";
import toast from "react-hot-toast";
import api from "../config/Api";
import { IoPerson } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { BsSend } from "react-icons/bs";
import { FiLock } from "react-icons/fi";
import { IoMdPerson } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import { useGoogleAuth } from "../config/GoogleAuth";

function Login() {
 const navigate = useNavigate();

  const { isLoading, error, isInitialized, signInWithGoogle } = useGoogleAuth();

  const handleGoogleSuccess = async (userData) => {
    console.log("Google Login Data", userData);
    setLoading(true);
    try {
      const res = await api.post("/auth/googleLogin", userData);

      toast.success(res.data.message);

      // optional: store user or token
      sessionStorage.setItem("AppUser", JSON.stringify(res.data.data));

      handleClear();

      // simple redirect
      navigate("/chatting");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const GoogleLogin = () => {

    signInWithGoogle(handleGoogleSuccess, handleGoogleFailure);
  };

  const handleGoogleFailure = (error) => {
    console.error("Google login failed:", error);
    toast.error("Google login failed. Please try again.");
  };

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [Loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClear = () => {
    setFormData({ email: "", password: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/auth/login", formData);

      toast.success(res.data.message);

      // optional: store user or token
      sessionStorage.setItem("AppUser", JSON.stringify(res.data.data));

      handleClear();

      // simple redirect
      navigate("/chatting");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className=" p-6 h-full">
        <h1 className="text-center font-bold p-7 text-4xl text-(--text-primary)">
          Student Login
        </h1>
        <div className="m-auto bg-(--bg-light) shadow shadow-gray-400 p-5  rounded-2xl w-[30vw]">
          <form onSubmit={handleSubmit} onReset={handleClear}>
            <div className=" relative m-10">
              <div className="space-y-5">
                <div className="flex flex-col justify-between">
                  <label htmlFor="fullName" className="text-(--text-primary) mb-2">
                    Email :
                  </label>
                  <div className="flex ">
                    {/* <IoMdPerson className="text-(--text-primary) text-2xl" /> */}
                    <input
                      type="email"
                      className="input"
                      name="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={isLoading}
                    />
                  </div>
                  {/* {validationError.email && (
                    <span className="text-xs text-red-500">
                      {validationError.email}
                    </span>
                  )} */}
                </div>

                <div className="flex flex-col justify-between">
                  <label htmlFor="fullName" className="text-(--text-primary) mb-2">
                    Password :
                  </label>
                  <div className="flex">
                    <input
                      type="password"
                      className=" input"
                      name="password"
                      placeholder="Enter Password"
                      onChange={handleChange}
                      value={formData.password}
                      disabled={Loading}
                    />
                  </div>

                  <div className="text-info flex justify-end text-xs">
                    <button
                      onClick={(e) => {
                        (e.preventDefault());
                        // setIsForgetPassword(true);
                      }}
                    >
                      Forget Password?
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center items-center gap-4">
              <button
                disabled={Loading}
                className="btn btn-gradient hover:transform hover:scale-105 "
              >
                <BsSend />
                {Loading ? "Submitting" : "Submit"}
              </button>
            </div>
          </form>
          <div className="text-center mt-5">
            Don't have any Account?{" "}
            <button
              className="text-info"
              onClick={() => navigate("/register")}
            >
              Register
            </button>
          </div>

           <div className="mt-4">
              {error ? (
                <button
                  className="btn btn-outline btn-error font-sans flex items-center justify-center gap-2 w-full"
                  disabled
                >
                  <FcGoogle className="text-xl" />
                  {error}
                </button>
              ) : (
                <button
                  onClick={GoogleLogin}
                  className="btn btn-outline border-primary font-sans flex items-center justify-center gap-2 w-full"
                  disabled={!isInitialized || isLoading}
                >
                  <FcGoogle className="text-xl" />
                  {isLoading
                    ? "Loading..."
                    : isInitialized
                      ? "Continue with Google"
                      : "Google Auth Error"}
                </button>
              )}
            </div>
        </div>
      </div>

     
    </>
  );
}

export default Login;
