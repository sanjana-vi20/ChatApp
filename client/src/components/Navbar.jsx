import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import logo from "../assets/logo.png";
import {useNavigate} from 'react-router-dom'

const Navbar = () => {
  const [theme, setTheme] = useState("");
  const naviagte = useNavigate();

  const handleChange = (e) => {
    setTheme(e.target.value);
    localStorage.setItem("chatTheme", e.target.value);
    document.documentElement.setAttribute("data-theme", e.target.value);
  };

  useEffect(() => {
    const currentTheme = localStorage.getItem("chatTheme");
    document.documentElement.setAttribute("data-theme", currentTheme);
    setTheme(currentTheme);
  });

  return (
    <>
      <div className="flex justify-between bg-primary p-3 ">
        <div className="flex items-center gap-3">
          <div>
            <img src={logo} alt="" className="w-[4rem] rounded-full" />
          </div>
          <div className="text-3xl font-bold text-accent-content">BUDDYCHAT</div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex gap-3">
            <button className="btn btn-accent-content btn-gradient" onClick={() =>naviagte("/login")}>Login</button>
            <button className="btn btn-gradient" onClick={() =>naviagte("/register")}>Register</button>
          </div>
          <div className="px-5 w-[15rem] ">
            <select
              name="theme"
              id="theme"
              className="select"
              onChange={handleChange}
            >
              <option value="light">default</option>
              
              <option value="dark">Dark</option>
              <option value="perplexity">Perplexity</option>
              <option value="ghibli">Ghibli</option>
              <option value="gourmet">Gourmet</option>
              <option value="luxury">Luxury</option>
              <option value="spotify">Spotify</option>
              <option value="claude">Claude</option>
              <option value="soft">Soft</option>
              <option value="slack">Slack</option>
              <option value="mintlify">Mintlify</option>
              <option value="shadcn">Shadcn</option>
              <option value="valorant">Valorant</option>
              <option value="vscode">VScode</option>
              <option value="black">Black</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
