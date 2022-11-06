// main
import React, { useState, useEffect } from "react";
import axios from "axios";
// import { Toast, Grid, Dialog, FloatingBubble } from "antd-mobile";

import { Image, List, FloatingBubble } from 'antd-mobile'
import { MessageFill } from 'antd-mobile-icons'
// import "styles/form.scss";

// service
import AddDialog from "./add-dialog";
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
  // 列表信息
  const [list, setList] = useState([]);
  // 弹窗显示隐藏
  const [isModalVisible, setIsModalVisible] = useState(false);
  // 当前行信息
  const [curRow, setCurRow] = useState({});
  const [type, setType] = useState(1);

  const users = [
    {
      id: '1',
      avatar:
        'https://images.unsplash.com/photo-1548532928-b34e3be62fc6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
      name: 'Novalee Spicer',
      description: 'Deserunt dolor ea eaque eos',
    },
    {
      id: '2',
      avatar:
        'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9',
      name: 'Sara Koivisto',
      description: 'Animi eius expedita, explicabo',
    },
    {
      id: '3',
      avatar:
        'https://images.unsplash.com/photo-1542624937-8d1e9f53c1b9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
      name: 'Marco Gregg',
      description: 'Ab animi cumque eveniet ex harum nam odio omnis',
    },
    {
      id: '4',
      avatar:
        'https://images.unsplash.com/photo-1546967191-fdfb13ed6b1e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
      name: 'Edith Koenig',
      description: 'Commodi earum exercitationem id numquam vitae',
    },
  ]

  useEffect(() => {
    // 请求列表
    getList();
  }, []);

  // 关闭弹窗
  const closeModel = () => {
    setIsModalVisible(false);
    setCurRow({});
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

  // 详情
  const viewHandle = (row: Member) => {
    // setType(3)
    // viewHandle(row);
    // setIsModalVisible(true);
  };

  // 删除
  // const deleteHandel = async (id: string) => {
  //   const result = await Dialog.confirm({
  //     content: "确认要删除此条数据？",
  //   });
  //   if (result) {
  //     axios
  //       .delete(`${apiUrl}/member/delete/` + id)
  //       .then((res) => res.data)
  //       .then((res) => {
  //         if (res.success) {
  //           Toast.show({ icon: "success", content: res.msg });
  //           getList();
  //         } else {
  //           Toast.show({ icon: "fail", content: res.msg });
  //         }
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   } else {
  //     Toast.show({ content: "已取消", position: "bottom" });
  //   }
  // };

  // li demo
  // const listItems = list.map((member: any, index: number) => (
  //   <li
  //     key={index}
  //     onClick={() => {
  //       viewHandle(member);
  //     }}
  //   >
  //     <div className="border-box">
  //       <div className="border-box2 clearfix">
  //         <h3>{member.name}</h3>
  //         <div className="tool-box">
  //           <i
  //             className="fas fa-pen primary"
  //             onClick={() => editHandel(member)}
  //           ></i>
  //           <i
  //             className="fas fa-trash error"
  //             onClick={() => deleteHandel(member.id)}
  //           ></i>
  //         </div>
  //         <p>
  //           <span>别名：{member.nickname}</span>
  //           <br />
  //           <span>性别：{member.sex === 1 ? "男" : "女"}</span>
  //           <br />
  //           <span>生辰：{member.birthday}</span>
  //           <br />
  //           <span>生死：{member.life === 1 ? "生" : "死"}</span>
  //           <br />
  //           <span>生肖：{member.zodiac}</span>
  //           <br />
  //           <span>星座：{member.constellation}</span>
  //           <br />
  //           <span>行当：{member.occupation}</span>
  //           <br />
  //           <span>通讯：{member.contact}</span>
  //           <br />
  //           <span>志趣：{member.interest}</span>
  //           <br />
  //           <span>简介：{member.intro}</span>
  //         </p>
  //       </div>
  //     </div>
  //   </li>
  // ));

  const addDialog = (
    <AddDialog
      type={type}
      closeModel={closeModel}
      getList={getList}
      curRow={curRow}
      isModalVisible={isModalVisible}
    ></AddDialog>
  );

  return (
    <div>
      <List header='用户列表'>
        {list.map((user: Member) => (
          // key={user.id}
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
            description={user.intro}
            // onClick={() => {viewHandle(member);}}
          >
            {user.name}
          </List.Item>
        ))}
      </List>

      <div
        style={{
          textAlign: 'center',
          padding: '50vh 32px 0',
        }}
      >
        {/* <DemoDescription>尝试拖拽和点击一下气泡吧</DemoDescription> */}
        <FloatingBubble
          style={{
            '--initial-position-bottom': '24px',
            '--initial-position-right': '24px',
            '--edge-distance': '24px',
          }}
          onClick={() => {
            setIsModalVisible(true);
            setType(1);
          }}
        >
          <MessageFill fontSize={32} />
        </FloatingBubble>
      </div>
      {/* 弹窗 */}
      { addDialog }




      {/* 新增 */}
      {/* <div className="g-bottom top-btns">
        <i
          className="fas fa-user-plus"
          onClick={() => {
            setIsModalVisible(true);
            setType(1);
          }}>
        </i>
      </div> */}
      {/* <div className="g-wrap clearfix">
        <div className="card-list">
          <ul>{listItems}</ul>
        </div>
      </div> */}

      {/* 分页 */}
      <div></div>
      

      {/* <FloatingBubble
        style={{
          "--initial-position-bottom": "1.5rem",
          "--initial-position-right": "0.1rem",
        }}
        onClick={() => {
          setIsModalVisible(true);
          setType(1);
        }}
      >
        <i className="fas fa-user-plus"></i>
      </FloatingBubble> */}
    </div>

    
  );
}
