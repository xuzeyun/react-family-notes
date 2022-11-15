import React from "react";
import { useEffect, useState, useContext } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { SearchOutline } from 'antd-mobile-icons'
// import "./person.scss";
import "styles/index.scss";
import { Card, Grid, Button, Space, List, Avatar, AutoCenter } from "antd-mobile";
import UserContext from "context/UserContext";

export const PersonalCenter = () => {
  // @ts-ignore
  const { userInfo, setUserInfo } = useContext(UserContext);
  let navigate = useNavigate();

  useEffect(() => {
    console.log(userInfo, "userInfo 个人中心");
  });

  const updatePassword = () => {
    console.log("修改密码", userInfo.id);
  };

  const logout = () => {
    console.log("注销登录");
    setUserInfo({
      ...{
        id: "",
        username: "",
        nickname: "",
        token: "",
      },
    });
  };

  const setActiveKey = (url: any) => {    
    navigate(url);
  };

  return (
    <div className="person-page">
      <Card
        className="person-card"
      >
        <Grid columns={6} gap={8}>
          <Grid.Item span={6}>
            <AutoCenter>
              <Avatar src='' style={{ '--size': '64px' }} />
            </AutoCenter>
          </Grid.Item>
          <Grid.Item span={2}><div><i className="fas fa-user"></i>用户名：</div></Grid.Item>
          <Grid.Item span={4}><div>{userInfo.username ? userInfo.username : '-'}</div></Grid.Item>
          <Grid.Item span={2}><div><i className="fas fa-id-card"></i>昵称：</div></Grid.Item>
          <Grid.Item span={4}><div>{userInfo.nickname ? userInfo.nickname : '-'}</div></Grid.Item>
          <Grid.Item span={2}><div><i className="fas fa-id-badge"></i>编号：</div></Grid.Item>
          <Grid.Item span={4}><div>{userInfo.id ? userInfo.id : '-'}</div></Grid.Item>
          <Grid.Item span={2}><div><i className="fas fa-link"></i>TOKEN：</div></Grid.Item>
          <Grid.Item span={4}><div>{userInfo.token ? userInfo.token : '-'}</div></Grid.Item>
        </Grid>
      </Card>

      <Grid columns={2} gap={8} className="num-card">
        <Grid.Item>
          <div className="card">
            <div className="num">13</div>
            <div>成员数量</div>
          </div>
        </Grid.Item>
        <Grid.Item>
          <div className="card">
            <div className="num">323</div>
            <div>账目笔数</div>
          </div>
        </Grid.Item>
        <Grid.Item>
          <div className="card">
            <div className="num">8</div>
            <div>日记数量</div>
          </div>
        </Grid.Item>
        <Grid.Item>
          <div className="card">
            <div className="num">23</div>
            <div>大事记数量</div>
          </div>
        </Grid.Item>
      </Grid>

      <Grid columns={2} gap={8}>
        <Grid.Item>
          {userInfo.id ? (
            <Button block color='primary' size='large'>
              <Space>
                <i className="fas fa-sign-out"></i>
                <span>注销</span>
              </Space>
            </Button>
          ) : (
            <Button block color='primary' size='large' onClick={() => {setActiveKey('/login')}} >
              <Space>
                <i className="fas fa-sign-in"></i>
                <span>登陆</span>
              </Space>
            </Button>
          )}
        </Grid.Item>
        <Grid.Item>
          <Button block color='primary' size='large' onClick={() => {setActiveKey('/login')}} >
            <Space>
              <i className="fas fa-edit"></i>
              <span>注册</span>
            </Space>
          </Button>
        </Grid.Item>

      </Grid>
    </div>
  );
};
