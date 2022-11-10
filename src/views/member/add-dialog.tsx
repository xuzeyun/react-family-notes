// main
import React, { useState, useEffect, RefObject } from "react";
import axios from "axios";
// import "styles/form.scss";
import { Toast, Grid, Popup, Form, Button, TextArea, Switch, Input, Selector, Picker, Space, DatePicker } from "antd-mobile";
import { FormInstance } from 'antd-mobile/es/components/form'
import dayjs from 'dayjs'
import type { DatePickerRef } from 'antd-mobile/es/components/date-picker'


const apiUrl = process.env.REACT_APP_API_URL;

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
  const formRef = React.createRef<FormInstance>()
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

  const zodiacColumns = [{ label: '鼠', value: '鼠' },{ label: '牛', value: '牛' },{ label: '虎', value: '虎' },{ label: '兔', value: '兔' },{ label: '龙', value: '龙' },{ label: '蛇', value: '蛇' },{ label: '马', value: '马' },{ label: '羊', value: '羊' },{ label: '猴', value: '猴' },{ label: '鸡', value: '鸡' },{ label: '狗', value: '狗' },{ label: '猪', value: '猪' },]

  const constellationColumns = [{ label: '白羊', value: '白羊' },{ label: '金牛', value: '金牛' },{ label: '双子', value: '双子' },{ label: '巨蟹', value: '巨蟹' },{ label: '狮子', value: '狮子' },{ label: '处女', value: '处女' },{ label: '天秤', value: '天秤' },{ label: '天蝎', value: '天蝎' },{ label: '射手', value: '射手' },{ label: '摩羯', value: '摩羯' },{ label: '水瓶', value: '水瓶' },{ label: '双鱼', value: '双鱼' },]

  // 关闭弹窗
  const handleClose = () => {
    props.closeModel();
  };

  // 表单提交
  const onFinish = (values: any) => {
    
    console.log(values, 'values');
    

    let data = {
      ...values,
      birthday: dayjs(values.birthday).format('YYYY-MM-DD'),
      sex: values.sex ? values.sex[0] : '',
      life: values.life ? values.life[0] : '',
      zodiac: values.zodiac ? values.zodiac[0] : '',
      constellation: values.constellation ? values.constellation[0] : '',
    }

    axios
      .post(`${apiUrl}/member/save`, data)
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

    console.log(data, 'ssss');

    
  }

  // 保存信息
  const saveHandle = (formData: Member) => {
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
    formRef.current?.resetFields()
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
        <div className="right-popup-title">
          新增成员
        </div>
        
        <div className="right-popup-body">
          <Form
            ref={formRef}
            layout='horizontal'
            onFinish={onFinish}
            footer={
              <Button block type='submit' color='primary' size='large'>
                提交
              </Button>
            }
          >
            {/* <Form.Header>水平布局表单</Form.Header> */}
            <Form.Item
              name='name'
              label='姓名'
              rules={[{ required: true, message: '姓名不能为空' }]}
            >
              <Input onChange={console.log} placeholder='请输入姓名' />
            </Form.Item>
            <Form.Item
              name='nickname'
              label='小名'
            >
              <Input onChange={console.log} placeholder='请输入小名' />
            </Form.Item>
            <Form.Item name='sex' label='性别' rules={[{ required: true, message: '请选择性别' }]}>
              <Selector
                columns={3}
                options={[
                  { label: '男', value: 1 },
                  { label: '女', value: 0 }
                ]}
              />
            </Form.Item>
            <Form.Item name='life' label='状态' rules={[{ required: true, message: '请选择状态' }]}>
              <Selector
                columns={3}
                options={[
                  { label: '健在', value: 1 },{ label: '寿终', value: 0 }
                ]}
              />
            </Form.Item>
            <Form.Item
              name='birthday'
              label='生日'
              trigger='onConfirm'
              onClick={(e, datePickerRef: RefObject<DatePickerRef>) => {
                datePickerRef.current?.open()
              }}
            >
              <DatePicker>
                {value =>
                  value ? dayjs(value).format('YYYY-MM-DD') : '请选择日期'
                }
              </DatePicker>
            </Form.Item>
            <Form.Item name='zodiac' label='生肖'>
              <Selector
                columns={4}
                options={zodiacColumns}
              />
            </Form.Item>
            <Form.Item name='constellation' label='星座'>
              <Selector
                columns={3}
                options={constellationColumns}
              />
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
            <Form.Item name='intro' label='简介' help='个人简介' rules={[{ required: true, message: '请填写个人简介' }]}>
              <TextArea
                placeholder='请输入简介'
                maxLength={100}
                rows={2}
                showCount
              />
            </Form.Item>
          </Form>
        </div>
      </Popup>
    
  );
}
