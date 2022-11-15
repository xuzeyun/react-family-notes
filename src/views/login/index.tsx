// main
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Md5 } from "ts-md5";
import "styles/index.scss";
import { Toast, Grid, Form, Button, Input, Checkbox } from "antd-mobile";
import logo from "assets/images/logo.svg";
import UserContext from "context/UserContext";
import { Routes, Route, Link, useParams, useNavigate } from "react-router-dom";

const apiUrl = process.env.REACT_APP_API_URL;
interface User {
  id: string;
  username: string;
  nickname: string;
  password: string;
  token: string;
}

export default function Login() {
  let navigate = useNavigate();
  // 账号 昵称 密码
  const [user, setUser] = useState({
    username: "",
    nickname: "",
    password: "",
    repassword: "",
  });

  // @ts-ignore
  const { userInfo, setUserInfo } = useContext(UserContext);

  // true 登录 false 注册
  const [loginState, setLoginState] = useState(true);

  // 是否记录密码
  const [checked, setChecked] = React.useState(true);

  // 提交
  const submitHandle = (e: any) => {
    e.preventDefault();
    console.log(loginState, "登录状态");
    if (loginState) {
      // 登录
      let md5 = Md5.hashStr(user.password);
      let data = {
        username: user.username,
        password: md5,
      };
      console.log(data, "data");
      axios
        .post(`${apiUrl}/user/login`, data)
        .then((res) => res.data)
        .then((res) => {
          if (res.success) {
            Toast.show({ icon: "success", content: res.msg });
            // 登录成功后跳转路由，存储登录信息
            // data: {
            //   id: "5f35461d98ac4506b8c01b4ad280d817"
            //   nickname: "123"
            //   token: "ffe1061786aa46cfaa07046f41d974f7"
            //   username: "test"
            // }
            // msg: "登录成功"
            // success: true
            // const ThemeContext = React.createContext('light');
            // setUserInfo(res.data);
            // JSON.stringify(userInfo);
            setUserInfo({ ...res.data });
            console.log(userInfo, "userInfo");
            // 页面跳转
            navigate("/personalCenter");
          } else {
            Toast.show({ icon: "fail", content: res.msg });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // 注册
      let md5 = Md5.hashStr(user.password);
      let data = {
        username: user.username,
        nickname: user.nickname,
        password: md5,
      };
      axios
        .post(`${apiUrl}/user/save`, data)
        .then((res) => res.data)
        .then((res) => {
          if (res.success) {
            Toast.show({ icon: "success", content: res.msg });
            // 注册成功
          } else {
            Toast.show({ icon: "fail", content: res.msg });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const [isSubmit, setIsSubmit] = useState(true);

  const onFinish = (values: any) => {
    if(!isSubmit) return;
    setIsSubmit(false);

    if (loginState) {
      // 登录
      let md5 = Md5.hashStr(values.password);
      let data = {
        username: values.username,
        password: md5,
      };
      console.log(data, "data");
      axios
        .post(`${apiUrl}/user/login`, data)
        .then((res) => res.data)
        .then((res) => {
          if (res.success) {
            Toast.show({ icon: "success", content: res.msg });
            setUserInfo({ ...res.data });
            console.log(userInfo, "userInfo");
            // 页面跳转
            navigate("/member");
          } else {
            Toast.show({ icon: "fail", content: res.msg });
          }
          setIsSubmit(true);
        })
        .catch((err) => {
          console.log(err);
          setIsSubmit(true);
        });
    } else {
      if(values.password != values.repassword){
        Toast.show({ icon: "fail", content: "两次密码输入不一致" });
        return
      }
      // 注册
      let md5 = Md5.hashStr(values.password);
      let data = {
        username: values.username,
        nickname: values.nickname,
        password: md5,
      };
      axios
        .post(`${apiUrl}/user/save`, data)
        .then((res) => res.data)
        .then((res) => {
          if (res.success) {
            Toast.show({ icon: "success", content: res.msg });
            // 注册成功
          } else {
            Toast.show({ icon: "fail", content: res.msg });
          }
          setIsSubmit(true);
        })
        .catch((err) => {
          console.log(err);
          setIsSubmit(true);
        });
    }
    
  }

  // 登陆注册切换
  const regHandle = () => {
    setLoginState(!loginState);
  };

  // 记住密码
  const changeHandle = (e: any) => {
    setChecked(e.target.checked);
  };

  return (
    <div className="login">
      <Grid columns={1} gap={8}>
        <div className="logo">
          <img src={logo} alt="24G Logo"></img>
        </div>
        <Form
          layout='horizontal'
          // ref={formRef}
          onFinish={onFinish}
          footer={
            <Button block type='submit' color='primary' size='large'>
              {loginState ? "登 录" : "注 册"}
            </Button>
          }
        >
          <Form.Item
            name='username'
            label={<span><i className="fas fa-user"></i>用户名</span>}
            rules={[{ required: true, message: '请输入' }]}
          >
            <Input onChange={console.log} placeholder='请输入' />
          </Form.Item>
          {/* 昵称 - 注册 */}
          {!loginState ? (
            <Form.Item
              name='nickname'
              label={<span><i className="fas fa-address-book"></i>昵称</span>}
              rules={[{ required: true, message: '请输入' }]}
            >
              <Input onChange={console.log} placeholder='请输入' />
            </Form.Item>
            ) : null}
          <Form.Item
            name='password'
            label={<span><i className="fas fa-lock"></i>密码</span>}
            rules={[{ required: true, message: '请输入' }]}
          >
            <Input onChange={console.log} placeholder='请输入' />
          </Form.Item>
          {!loginState ? (
            <Form.Item
              name='repassword'
              label={<span><i className="fas fa-lock"></i>确认密码</span>}
              rules={[{ required: true, message: '请输入' }]}
            >
              <Input onChange={console.log} placeholder='请输入' />
            </Form.Item>
          ) : null}
        </Form>

        <div className="form-group">
          <div className="left">
            <Checkbox defaultChecked>记住密码</Checkbox>
          </div>
          <div className="right">
            {/* 登录|注册 切换 */}
            <span onClick={regHandle}>{!loginState ? "登 录" : "注 册"}</span>
          </div>
        </div>
      </Grid>
    </div>
  );
}
