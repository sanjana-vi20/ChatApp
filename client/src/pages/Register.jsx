import React, { useState } from "react";
import toast from "react-hot-toast";
import api from "../config/Api.jsx";
// import { IoPerson } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobnumber: "",
    password: "",
    confirmPass: "",
    // role: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [validationError, setValidationError] = useState({});

  const handleClear = () => {
    setFormData({
      fullName: "",
      email: "",
      mobnumber: "",
      password: "",
      confirmPass: "",
    //   role: "",
    });
  };

  const validate = () => {
    let Error = {};

    if (formData.fullName.length < 3) {
      Error.fullName = "Name should be More Than 3 Characters";
    } else {
      if (!/^[A-Za-z ]+$/.test(formData.fullName)) {
        Error.fullName = "Only Contain A-Z , a-z and space";
      }
    }

    if (
      !/^[\w\.]+@(gmail|outlook|ricr|yahoo)\.(com|in|co.in)$/.test(
        formData.email,
      )
    ) {
      Error.email = "Use Proper Email Format";
    }

    if (!/^[6-9]\d{9}$/.test(formData.mobnumber)) {
      Error.mobnumber = "Only Indian Mobile Number allowed";
    }
    if (!formData.role) {
      Error.role = "Please choose anyone";
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

    // if (!validate()) {
    //   setIsLoading(false);

    //   console.log();
      
    //   toast.error("Fill the Form Correctly");
    //   return;
    // }

    try {
      // console.log(formData);
      const res = await api.post("/auth/register", formData);
      toast.success(res.data.message);
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
      <div className="bg-(--bg-accent)">
        <h1 className="text-center font-bold p-7 text-4xl text-(--text-primary)">
           Registration
        </h1>
        <div className="m-auto bg-(--bg-light) shadow shadow-gray-400 p-5  rounded-2xl w-2xl">
          <form onSubmit={handleSubmit} onReset={handleClear}>
            <div className=" relative m-10">
              <div className="space-y-4 ">
               
                <div className="flex flex-col justify-between">
                  <label htmlFor="fullName" className="text-(--text-primary) mb-2">
                    FullName :
                  </label>
                  <input
                    type="text"
                    className="input"
                    name="fullName"
                    placeholder="Enter your name"
                    onChange={handleChange}
                    value={formData.fullName}
                    disabled={isLoading}
                  />
                  {validationError.fullName && (
                    <span className="text-xs text-red-500">
                      {validationError.fullName}
                    </span>
                  )}
                </div>
                <div className="flex flex-col justify-between">
                  <label htmlFor="fullName" className="text-(--text-primary) mb-2">
                    Email :
                  </label>
                  <input
                    type="email"
                    className="input"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                  {validationError.email && (
                    <span className="text-xs text-red-500">
                      {validationError.email}
                    </span>
                  )}
                </div>
                <div className="flex flex-col justify-between">
                  <label htmlFor="fullName" className="text-(--text-primary) mb-2">
                    Mobile Number :
                  </label>
                  <input
                    type="number"
                    className="input"
                    name="mobnumber"
                    placeholder="Enter your Phone Number"
                    onChange={handleChange}
                    value={formData.mobnumber}
                    disabled={isLoading}
                  />
                  {validationError.mobnumber && (
                    <span className="text-xs text-red-500">
                      {validationError.mobnumber}
                    </span>
                  )}
                </div>
                <div className="flex flex-col justify-between">
                  <label htmlFor="fullName" className="text-(--text-primary) mb-2">
                    Password :
                  </label>
                  <input
                    type="password"
                    className="input"
                    name="password"
                    placeholder="Enter Password"
                    onChange={handleChange}
                    value={formData.password}
                    disabled={isLoading}
                  />
                </div>
                <div className="flex flex-col justify-between">
                  <label htmlFor="fullName" className="text-(--text-primary) mb-2">
                    Confirm Password :
                  </label>
                  <input
                    type="password"
                    className="input"
                    name="confirmPass"
                    placeholder="Confirm Your Password"
                    onChange={handleChange}
                    value={formData.confirmPass}
                    disabled={isLoading}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <button
                disabled={isLoading}
                className="btn btn-gradient bg-primary "
              >
                Clear Form
              </button>
              <button
                disabled={isLoading}
                className="btn btn-gradient"
              >
                {isLoading ? "Submitting" : "Submit"}
              </button>
            </div>
          </form>
          <div className="text-center mt-5">
            Already have Account?
            <button
              className="text-info pl-2"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
