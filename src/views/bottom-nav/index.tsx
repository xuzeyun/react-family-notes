import * as React from "react";
import { Badge, TabBar } from "antd-mobile";
import { Routes, Route, Link, useParams, useNavigate } from "react-router-dom";
import { UserOutline, TeamOutline, ReceivePaymentOutline, FillinOutline, ContentOutline } from 'antd-mobile-icons'
import "styles/index.scss";

export default function BottomNav() {
  let navigate = useNavigate();
  let params = useParams();
  const tabs = [
    {
      key: "/member",
      title: "家族成员",
      icon: <TeamOutline />,
    },
    {
      key: "/notes",
      title: "记事本",
      icon: <FillinOutline />,
    },
    {
      key: "/money",
      title: "账本",
      icon: <ReceivePaymentOutline />,
    },
    {
      key: "/books",
      title: "公告墙",
      icon: <ContentOutline />,
    },
    {
      key: "/personalCenter",
      title: "个人中心",
      icon: <UserOutline />,
    },
  ];
  // icon: (active: boolean) => active ? <i className="fas fa-book"></i> : <i className="fas fa-book"></i>,

  const setActiveKey = (url: any) => {    
    let title = '';
    tabs.forEach(item => {
      if (item.key === url) {
        title = item.title;
      }
    })
    navigate(url, {
      state: {
        topTitle: title,
      }
    });
  };

  return (
    // 家族成员，账房，府事记，家规家训家产，家族简介
    <div className="bottom-nav">
      {/* <TabBar onChange={setActiveKey}>
        {tabs.map((item) => (
          <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
        ))}
      </TabBar> */}
      <TabBar onChange={setActiveKey}>
        {tabs.map(item => (
          <TabBar.Item key={item.key} icon={item.icon} title={item.title}/>
        ))}
      </TabBar>
    </div>
  );
}
