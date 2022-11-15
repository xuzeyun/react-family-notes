import React from "react";
import { useEffect, useState } from "react";
import { NavBar, Space, Toast } from 'antd-mobile'
import logo from "assets/images/logo_2.svg";
import { Routes, Route, Link, useParams, useNavigate, useLocation } from "react-router-dom";


export const TopBar = () => {
  const location = useLocation();
  const back = () =>{
    window.history.back()
  }
    
  return (
    // <div className="top-bar g-bottom">
    //   <h1 className="logo">
    //     <img src={logo} alt="24G Logo"></img>
    //   </h1>
    // </div>
    <NavBar onBack={back}>
      <span>{location.state && location.state.topTitle ? location.state.topTitle: '府云笺'}</span>
    </NavBar>
  );
};