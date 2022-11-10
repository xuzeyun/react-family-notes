import * as React from "react";
import { Badge, TabBar } from "antd-mobile";
import { Routes, Route, Link, useParams, useNavigate } from "react-router-dom";
import "views/styles/index.scss";

export default function BottomNav() {
  let navigate = useNavigate();
  let params = useParams();
  const tabs = [
    {
      key: "member",
      title: "家族成员",
      icon: <i className="fas fa-users bottom-icon"></i>,
    },
    {
      key: "money",
      title: "账房",
      icon: <i className="fas fa-piggy-bank bottom-icon"></i>,
    },
    {
      key: "note",
      title: "府事记",
      icon: <i className="fas fa-book bottom-icon"></i>,
    },
    {
      key: "books",
      title: "书房",
      icon: <i className="fab fa-leanpub bottom-icon"></i>,
    },
    // 简介 家规 家训
    {
      key: "person",
      title: "个人中心",
      icon: <i className="fas fa-id-card-alt bottom-icon"></i>,
    },
  ];
  // icon: (active: boolean) => active ? <i className="fas fa-book"></i> : <i className="fas fa-book"></i>,

  const setActiveKey = (e: any) => {
    navigate(`/${e}`);
  };

  return (
    // 家族成员，账房，府事记，家规家训家产，家族简介
    <div className="bottom-nav">
      {/* <TabBar onChange={setActiveKey}>
        {tabs.map((item) => (
          <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
        ))}
      </TabBar> */}
      <TabBar>
        {tabs.map(item => (
          <TabBar.Item key={item.key} icon={item.icon} />
        ))}
      </TabBar>
    </div>
  );
}
