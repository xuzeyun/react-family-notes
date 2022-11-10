import React from "react";
import { useEffect, useState } from "react";
import { NavBar, Space, Toast } from 'antd-mobile'
import logo from "assets/images/logo_2.svg";

export const TopBar = () => {

  const back = () =>{
    Toast.show({
      content: '点击了返回区域',
      duration: 1000,
    })
  }
    
  return (
    // <div className="top-bar g-bottom">
    //   <h1 className="logo">
    //     <img src={logo} alt="24G Logo"></img>
    //   </h1>
    // </div>
    <NavBar onBack={back}>
      家族成员
      {/* <img src={logo} alt="24G Logo"></img> */}
    </NavBar>
  );
};