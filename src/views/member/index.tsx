// main
import React, { useState, useEffect, useRef } from "react";
// import React, { FC, useRef } from 'react'
import axios from "axios";
// import { Toast, Grid, Dialog, FloatingBubble } from "antd-mobile";

import { Image, List, FloatingBubble, PullToRefresh, SwipeAction, Toast, Dialog } from 'antd-mobile'
import { Routes, Route, Link, useParams, useNavigate } from "react-router-dom";
import { AddOutline } from 'antd-mobile-icons'
// import "styles/form.scss";

// service
import AddDialog from "./add-dialog";
import { sleep } from 'antd-mobile/es/utils/sleep'

import { Action, SwipeActionRef } from 'antd-mobile/es/components/swipe-action'
// import "./index.scss";
const apiUrl = process.env.REACT_APP_API_URL;

// ts
interface Member {
  id: String;
  name: String;
  nickname: String;
  sex: Number;
  birthday: Date;
  life: Number;
  zodiac: String;
  constellation: String;
  occupation: String;
  interest: String;
  contact: String;
  intro: String;
}

export default function MemberList() {
  const navigate = useNavigate();
  // 列表信息
  const [list, setList] = useState([]);
  // 弹窗显示隐藏
  const [isModalVisible, setIsModalVisible] = useState(false);
  // 当前行信息
  const [curRow, setCurRow] = useState({});
  const [type, setType] = useState(1);

  useEffect(() => {
    // 请求列表
    getList();
  }, []);

  // 关闭弹窗
  const closeModel = () => {
    setIsModalVisible(false);
    // setCurRow({});
  };

  // 请求列表
  const getList = () => {
    axios
      .get(`${apiUrl}/member/list?name=`)
      .then((res) => res.data)
      .then((res) => {
        res.data.forEach((item: any) => {
          item.birthday = item.birthday.substring(0, 10);
        });
        setList(res.data);
      });
  };

  // 修改
  const editHandel = (row: Member) => {
    setType(2);
    setCurRow(row);
    setIsModalVisible(true);
  };

  // 详情（跳转详情页）
  const viewHandle = (row: Member) => {
    // setType(3)
    // viewHandle(row);
    // setIsModalVisible(true);
    console.log(row, '1111111111111');
    
    navigate('/member/detail', {
      state: {
        topTitle: '成员详情',
        ...row
      }
    })
  };

  // 删除
  const deleteHandel = async (id: any) => {
    const result = await Dialog.confirm({
      content: "确认要删除此条数据？",
    });
    if (result) {
      axios
        .delete(`${apiUrl}/member/delete/` + id)
        .then((res) => res.data)
        .then((res) => {
          if (res.success) {
            Toast.show({ icon: "success", content: res.msg });
            getList();
          } else {
            Toast.show({ icon: "fail", content: res.msg });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      Toast.show({ content: "已取消", position: "bottom" });
    }
  };

  const addDialog = (
    <AddDialog
      type={type}
      closeModel={closeModel}
      getList={getList}
      curRow={curRow}
      isModalVisible={isModalVisible}
    ></AddDialog>
  );

 
  const ref = useRef<SwipeActionRef>(null)

  return (
    <div className="body-wrap">
      <PullToRefresh
        onRefresh={async () => {
          await sleep(1000)
          // setData([...getNextData(), ...data])
          getList();
        }}
        >
        {/* <List header='用户列表'> */}
        <List>
          {list.map((user: Member, index: number) => (
            <SwipeAction
              ref={ref}
              key={index}
              rightActions={[
                {
                  key: 'edit',
                  text: <i className="fas fa-edit"></i>,
                  color: 'primary',
                  onClick: async () => {
                    editHandel(user)
                  },
                },
                {
                  key: 'delete',
                  text: <i className="fas fa-trash"></i>,
                  color: 'danger',
                  onClick: async () => {
                    deleteHandel(user.id)
                  },
                },
              ]}
            >
              <List.Item
                prefix={
                  <Image
                    src={''}
                    // src={user.avatar}
                    style={{ borderRadius: 20 }}
                    fit='cover'
                    width={40}
                    height={40}
                  />
                }
                description={user.intro ? user.intro : '暂无简介'}
                onClick={() => {viewHandle(user);}}
              >
                <span className={user.sex && user.sex == 1 ? 'icon-man' : 'icon-women'}>{user.name}{user.sex && user.sex == 1 ? <i className="fas fa-mars"></i> : <i className="fas fa-venus"></i>}</span>
                
              </List.Item>
            </SwipeAction>
          ))}
        </List>
        {/* <DemoDescription>尝试拖拽和点击一下气泡吧</DemoDescription> */}
        <FloatingBubble
          style={{
            '--initial-position-bottom': '100px',
            '--initial-position-right': '24px',
            '--edge-distance': '24px',
          }}
          onClick={() => {
            setIsModalVisible(true);
            setType(1);
          }}
        >
          <AddOutline fontSize={32} />
        </FloatingBubble>
      </PullToRefresh>

      {/* 弹窗 */}
      { addDialog }
    </div>
  );
}
