import React from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ChattingWindow from "./pages/ChattingWindow";
import { AuthProvider } from "./config/AuthContext";

const App = () => {
  return (
    <>
   <AuthProvider>
     <Toaster/>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path ="/" element ={<Login/>}/>
          <Route path ="/login" element ={<Login/>}/>
          <Route path ="/register" element ={<Register/>}/>
          <Route path ="/chatting" element ={<ChattingWindow/>}/>
        </Routes>
      </BrowserRouter>
   </AuthProvider>
    </>
  );
};

export default App;
