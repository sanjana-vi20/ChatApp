import React from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
    <Toaster/>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path ="/" element ={<Home/>}/>
          <Route path ="/login" element ={<Login/>}/>
          <Route path ="/register" element ={<Register/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
