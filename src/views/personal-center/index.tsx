import React from "react";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { SearchOutline } from 'antd-mobile-icons'
// import "./person.scss";
import "styles/index.scss";
import { Card, Grid, Button, Space, List, Avatar, AutoCenter, Ellipsis, Toast, Dialog } from "antd-mobile";
import UserContext from "context/UserContext";
const apiUrl = process.env.REACT_APP_API_URL;

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

  const logout = async () => {
    const result = await Dialog.confirm({
      content: "确认退出登陆",
    });
    if (result) {
      axios
      .get(`${apiUrl}/user/logout/${userInfo.token}`)
      .then((res) => res.data)
      .then((res) => {
        if (res.success) {
          Toast.show({ icon: "success", content: res.msg });
          setUserInfo({
            ...{
              id: "",
              username: "",
              nickname: "",
              token: "",
            },
          });
        }else {
          Toast.show({ icon: "error", content: res.msg });
        }
      });
    }else{
      Toast.show({ content: "已取消", position: "bottom" });
    }
    
   
  };

  const setActiveKey = (url: any) => {
    navigate(url);
  };

  return (
    <div className="person-page">
      <Card
        className="person-card"
      >
        <Grid columns={6} gap={8} className="person-card-main">
          <Grid.Item span={6}>
            <AutoCenter>
              <Avatar src='' style={{ '--size': '64px' }} />
            </AutoCenter>
          </Grid.Item>
          <Grid.Item span={2}><div>用户名：</div></Grid.Item>
          <Grid.Item span={4}><div>{userInfo.username || '-'}</div></Grid.Item>
          <Grid.Item span={2}><div>昵称：</div></Grid.Item>
          <Grid.Item span={4}><div>{userInfo.nickname || '-'}</div></Grid.Item>
          {/* <Grid.Item span={2}><div>编号：</div></Grid.Item>
          <Grid.Item span={4}><div style={{ 'wordBreak': 'break-all' }}>{userInfo.id || '-'}</div></Grid.Item>
          <Grid.Item span={2}><div>TOKEN：</div></Grid.Item>
          <Grid.Item span={4}><div style={{ 'wordBreak': 'break-all' }}>{userInfo.token || '-'}</div></Grid.Item> */}
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
          <Button block color='primary' size='large' onClick={() => { setActiveKey('/login') }} >
            <Space>
              <i className="fas fa-edit"></i>
              <span>注册</span>
            </Space>
          </Button>
        </Grid.Item>
        <Grid.Item>
          <Button block color='primary' size='large' >
            <Space>
              <i className="fas fa-unlock"></i>
              <span>修改密码</span>
            </Space>
          </Button>
        </Grid.Item>
        <Grid.Item span={2}>
          {userInfo.id ? (
            <Button block color='danger' size='large' onClick={() => { logout() }}>
              <Space>
                <i className="fas fa-sign-out"></i>
                <span>注销</span>
              </Space>
            </Button>
          ) : (
            <Button block color='primary' size='large' onClick={() => { setActiveKey('/login') }} >
              <Space>
                <i className="fas fa-sign-in"></i>
                <span>登陆</span>
              </Space>
            </Button>
          )}
        </Grid.Item>
      </Grid>
    </div>
  );
};
