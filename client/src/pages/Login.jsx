import React, { useState } from "react";
import toast from "react-hot-toast";
import api from "../config/Api";
import { IoPerson } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { BsSend } from "react-icons/bs";
import { FiLock } from "react-icons/fi";
import { IoMdPerson } from "react-icons/io";

function Login() {
//   const { setUser, setIsLogin, setRole } = useAuth();
//   const [isForgetPassword, setIsForgetPassword] = useState(false);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [validationError, setValidationError] = useState({});

  const handleClear = () => {
    setFormData({
      email: "",
      password: "",
    });
  };

  const validate = () => {
    let Error = {};
    if (
      !/^[\w\.]+@(gmail|outlook|ricr|yahoo)\.(com|in|co.in)$/.test(
        formData.email,
      )
    ) {
      Error.email = "Use Proper Email Format";
    }

    setValidationError(Error);

    return Object.keys(Error).length > 0 ? false : true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!validate()) {
      setIsLoading(false);
      toast.error("Fill the Form Correctly");
      return;
    }

    try {
      // console.log(formData);
      const res = await api.post("/auth/login", formData);
      toast.success(res.data.message);
    //   setUser(res.data.data);
    //   setIsLogin(true);
      sessionStorage.setItem("CravingUser", JSON.stringify(res.data.data));
      // navigate("/user-dashboard");
      handleClear();
    } catch (error) {
    //   console.log(error);
      toast.error(error?.response?.data?.message || "Unknown error");
    } finally {
      setIsLoading(false);
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
                  {validationError.email && (
                    <span className="text-xs text-red-500">
                      {validationError.email}
                    </span>
                  )}
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
                      disabled={isLoading}
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
                disabled={isLoading}
                className="btn btn-gradient hover:transform hover:scale-105 "
              >
                <BsSend />
                {isLoading ? "Submitting" : "Submit"}
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
        </div>
      </div>

     
    </>
  );
}

export default Login;
