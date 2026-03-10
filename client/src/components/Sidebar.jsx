import { Profiler } from "react";
import { IoChatbubbleEllipsesOutline, IoLogOutOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { useAuth } from "../config/AuthContext";
import api from '../config/Api'
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Sidebar = ({setFetchmode}) => {

  const {setIsLogin , setUser} = useAuth()
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await api.get("/auth/logout");
      setUser("");
      setIsLogin(false);
      sessionStorage.removeItem("AppUser");
      toast.success(res?.data?.message);
      navigate("/");
    } catch (error) {
      toast.error(error?.message);
    }
  };
  return (
    <div className="w-20 bg-neutral flex flex-col items-center py-6 justify-between rounded-l-3xl border-r border-base-content/5">
      <div className="flex flex-col justify-between gap-8 items-center">
        <div className="avatar online"></div>
        {/* Primary color for active icon */}
        <button className="btn btn-ghost btn-circle text-2xl text-primary bg-primary/10" onClick={() => setFetchmode("AC")}>
          <IoChatbubbleEllipsesOutline />
        </button>
      </div>
      <div className="flex flex-col gap-4">
        <button className="btn btn-ghost btn-circle text-2xl text-primary bg-primary/10">
          <CgProfile />
        </button>
        <button className="btn btn-ghost btn-circle text-2xl text-error" onClick={handleLogout}>
          <IoLogOutOutline />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
