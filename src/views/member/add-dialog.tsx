// main
import React, { useState, useEffect } from "react";
import axios from "axios";
// import "styles/form.scss";
import { Toast, Grid, Popup, Form, Button, TextArea, Switch, Input, Selector, Picker, Space } from "antd-mobile";

const apiUrl = process.env.REACT_APP_API_URL;

// const Transition = React.forwardRef(function Transition(
//   props: TransitionProps & {
//     children: React.ReactElement;
//   },
//   ref: React.Ref<unknown>
// ) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });

export default function FullScreenDialog(props: {
  type: number;
  closeModel: any;
  getList: any;
  curRow: any;
  isModalVisible: boolean;
}) {
  const [member, setMember] = useState({
    id: "",
    name: "",
    nickname: "",
    sex: "1",
    birthday: "",
    life: "1",
    zodiac: "",
    constellation: "",
    occupation: "",
    interest: "",
    contact: "",
    intro: "",
  });

  const [pickersData, setPickersDatar] = useState({
    birthdayPicker: [],
  });
  

  

  

  const birthdayColumns = [
    [
      { label: '1990', value: '1990' },
      { label: '1991', value: '1991' },
      { label: '1992', value: '1992' },
      { label: '1993', value: '1993' },
      { label: '1994', value: '1994' },
    ],
    [
      { label: '01', value: '01' },
      { label: '02', value: '02' },
    ],
    [
      { label: '01', value: '01' },
      { label: '02', value: '02' },
    ],
  ]

  const zodiacColumns = [
    [
      { label: '（子）鼠', value: '鼠' },
      { label: '（丑）牛', value: '牛' },
      { label: '（寅）虎', value: '虎' },
      { label: '（卯）兔', value: '兔' },
      { label: '（辰）龙', value: '龙' },
      { label: '（巳）蛇', value: '蛇' },
      { label: '（午）马', value: '马' },
      { label: '（未）羊', value: '羊' },
      { label: '（申）猴', value: '猴' },
      { label: '（酉）鸡', value: '鸡' },
      { label: '（戌）狗', value: '狗' },
      { label: '（亥）猪', value: '猪' },
    ],
  ]

  const constellationColumns = [
    [
      { label: '白羊座', value: '白羊座' },
      { label: '金牛座', value: '金牛座' },
      { label: '双子座', value: '双子座' },
      { label: '巨蟹座', value: '巨蟹座' },
      { label: '狮子座', value: '狮子座' },
      { label: '处女座', value: '处女座' },
      { label: '天秤座', value: '天秤座' },
      { label: '天蝎座', value: '天蝎座' },
      { label: '射手座', value: '射手座' },
      { label: '摩羯座', value: '摩羯座' },
      { label: '水瓶座', value: '水瓶座' },
      { label: '双鱼座', value: '双鱼座' },
    ],
  ]

  






  // 关闭弹窗
  const handleClose = () => {
    props.closeModel();
  };

  // 保存信息
  const handleSave = (e: any) => {
    e.preventDefault();
    console.log(member, "member");
    // setMember({ ...member, id: props.curRow.id })
    // 有 id 新增，无 id 修改

    // 新增 | 修改 接口
    axios
      .post(`${apiUrl}/member/save`, member)
      .then((res) => res.data)
      .then((res) => {
        if (res.success) {
          Toast.show({ icon: "success", content: res.msg });
          handleClose();
          props.getList();
        } else {
          Toast.show({ icon: "fail", content: res.msg });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    console.log(member, "member22");
    // 修改进行赋值
    if (props.type === 2) {
      console.log(props.curRow, "props.curRow");
      setMember({ ...props.curRow });
    }
  }, [props]);

  return (
    
              
      <Popup
        position='right'
        visible={props.isModalVisible}
        showCloseButton
        onClose={() => {
          handleClose()
        }}
      >
        <Form
          layout='horizontal'
          style={{ height: '100vh', overflowY: 'scroll', padding: '30px 0', boxSizing: 'border-box' }}
          footer={
            <Button block type='submit' color='primary' size='large'>
              提交
            </Button>
          }
        >
          {/* <Form.Header>水平布局表单</Form.Header> */}
          <div style={{ textAlign: 'center' }}>水平布局表单</div>
          <Form.Item
            name='name'
            label='姓名'
            rules={[{ required: true, message: '姓名不能为空' }]}
          >
            <Input onChange={console.log} placeholder='请输入姓名' />
          </Form.Item>
          <Form.Item
            name='nickname'
            label='别号'
          >
            <Input onChange={console.log} placeholder='请输入别号' />
          </Form.Item>
          <Form.Item
            name='sex'
            label='性别'
          >
            <Selector
              options={[{ label: '男', value: 1 },{ label: '女', value: 0 }]}
              defaultValue={[1]}
              // onChange={(arr, extend) => console.log(arr, extend.items)}
            />
          </Form.Item>
          <Form.Item
            name='life'
            label='状态'
          >
            <Selector
              options={[{ label: '生存', value: 1 },{ label: '死亡', value: 0 }]}
              defaultValue={[1]}
              // onChange={(arr, extend) => console.log(arr, extend.items)}
            />
          </Form.Item>
          <Form.Item
            name='birthday'
            label='生日'
          >
            <Picker
              columns={birthdayColumns}
              value={pickersData.birthdayPicker}
              // onConfirm={setPickersDatar}
              // onSelect={(val, extend) => {
              //   console.log('onSelect', val, extend.items)
              // }}
            >
              {(items, { open }) => {
                return (
                  <Space align='center'>
                    <Button onClick={open}>选择</Button>
                    {items.every(item => item === null)
                      ? '未选择'
                      : items.map(item => item?.label ?? '未选择').join(' - ')}
                  </Space>
                )
              }}
            </Picker>
          </Form.Item>
          <Form.Item
            name='zodiac'
            label='生肖'
          >
            <Picker
              columns={zodiacColumns}
              // value={pickersData.zodiacPicker}
              // onConfirm={setPickersDatar}
              // onSelect={(val, extend) => {
              //   console.log('onSelect', val, extend.items)
              // }}
            >
              {(items, { open }) => {
                return (
                  <Space align='center'>
                    <Button onClick={open}>选择</Button>
                    {items.every(item => item === null)
                      ? '未选择'
                      : items.map(item => item?.label ?? '未选择').join(' - ')}
                  </Space>
                )
              }}
            </Picker>
          </Form.Item>
          
          <Form.Item
            name='constellation'
            label='星座'
          >
            <Picker
              columns={constellationColumns}
              // value={pickersData.zodiacPicker}
              // onConfirm={setPickersDatar}
              // onSelect={(val, extend) => {
              //   console.log('onSelect', val, extend.items)
              // }}
            >
              {(items, { open }) => {
                return (
                  <Space align='center'>
                    <Button onClick={open}>选择</Button>
                    {items.every(item => item === null)
                      ? '未选择'
                      : items.map(item => item?.label ?? '未选择').join(' - ')}
                  </Space>
                )
              }}
            </Picker>
          </Form.Item>
          <Form.Item
            name='occupation'
            label='职业'
          >
            <Input onChange={console.log} placeholder='请输入职业' />
          </Form.Item>
          <Form.Item
            name='interest'
            label='爱好'
          >
            <Input onChange={console.log} placeholder='请输入爱好' />
          </Form.Item>
          <Form.Item
            name='contact'
            label='电话'
          >
            <Input onChange={console.log} placeholder='请输入联系方式' />
          </Form.Item>
          <Form.Item name='intro' label='简介' help='个人简介'>
            <TextArea
              placeholder='请输入简介'
              maxLength={100}
              rows={2}
              showCount
            />
          </Form.Item>
        </Form>
      </Popup>
    
  );
}
