// main
import React, { useState, useEffect, RefObject, useContext } from "react";
import axios from "axios";
// import "styles/form.scss";
import { Toast, Grid, Popup, Form, Button, TextArea, Switch, Input, Selector, Picker, Space, DatePicker } from "antd-mobile";
import { FormInstance } from 'antd-mobile/es/components/form'
import dayjs from 'dayjs'
import type { DatePickerRef } from 'antd-mobile/es/components/date-picker'
import UserContext from "context/UserContext";


const apiUrl = process.env.REACT_APP_API_URL;

export default function FullScreenDialog(props: {
  type: number;
  closeModel: any;
  getList: any;
  curRow: any;
  isModalVisible: boolean;
}) {
  // @ts-ignore
  const { userInfo, setUserInfo } = useContext(UserContext);
  const formRef = React.createRef<FormInstance>()
  const sexOptions = [{ label: '男', value: '1' }, { label: '女', value: '0' }];
  const lifeOptions = [{ label: '健在', value: '1' }, { label: '寿终', value: '0' }];
  const zodiacOptions = [{ label: '鼠', value: '鼠' }, { label: '牛', value: '牛' }, { label: '虎', value: '虎' }, { label: '兔', value: '兔' }, { label: '龙', value: '龙' }, { label: '蛇', value: '蛇' }, { label: '马', value: '马' }, { label: '羊', value: '羊' }, { label: '猴', value: '猴' }, { label: '鸡', value: '鸡' }, { label: '狗', value: '狗' }, { label: '猪', value: '猪' },]
  const constellationOptions = [{ label: '白羊', value: '白羊' }, { label: '金牛', value: '金牛' }, { label: '双子', value: '双子' }, { label: '巨蟹', value: '巨蟹' }, { label: '狮子', value: '狮子' }, { label: '处女', value: '处女' }, { label: '天秤', value: '天秤' }, { label: '天蝎', value: '天蝎' }, { label: '射手', value: '射手' }, { label: '摩羯', value: '摩羯' }, { label: '水瓶', value: '水瓶' }, { label: '双鱼', value: '双鱼' },]
  const [isSubmit, setIsSubmit] = useState(true);

  // 关闭弹窗
  const handleClose = () => {
    props.closeModel();
  };

  // 表单提交
  const onFinish = (values: any) => {
    let data = {
      ...values,
      id: props.curRow.id,
      usrId: userInfo.id,
      birthday: dayjs(values.birthday).format('YYYY-MM-DD'),
      sex: values.sex ? values.sex[0] : '',
      life: values.life ? values.life[0] : '',
      zodiac: values.zodiac ? values.zodiac[0] : '',
      constellation: values.constellation ? values.constellation[0] : '',
    }
    if(!isSubmit) return;
    setIsSubmit(false);
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
        setIsSubmit(true);
      })
      .catch((err) => {
        console.log(err);
        setIsSubmit(true);
      });
  }

  useEffect(() => {
    // 新增
    if (props.type === 1) {
      setTimeout(() => {
        formRef.current?.resetFields()
      })
    }
    // 修改
    if (props.type === 2) {
      setTimeout(() => {
        formRef.current?.setFieldsValue({
          name: props.curRow.name ? props.curRow.name : '',
          nickname: props.curRow.nickname ? props.curRow.nickname : '',
          sex: props.curRow.sex + '' ? props.curRow.sex + '' : '',
          birthday: props.curRow.birthday ? new Date(props.curRow.birthday) : '',
          life: props.curRow.life + '' ? props.curRow.life + '' : '',
          zodiac: props.curRow.zodiac ? props.curRow.zodiac : '',
          constellation: props.curRow.constellation ? props.curRow.constellation : '',
          occupation: props.curRow.occupation ? props.curRow.occupation : '',
          interest: props.curRow.interest ? props.curRow.interest : '',
          contact: props.curRow.contact ? props.curRow.contact : '',
          intro: props.curRow.intro ? props.curRow.intro : '',
        });
      })
    }
  }, [props]);

  return (
    <Popup
      className="pop-right"
      position='right'
      visible={props.isModalVisible}
      showCloseButton
      onClose={() => {
        handleClose()
      }}
    >
      <div className="right-popup-title">
        {props.type === 1 ? '新增成员' : '修改成员信息'}
      </div>

      <div className="right-popup-body">
        <Form
          ref={formRef}
          // form={form}
          // layout='horizontal'
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
            <Selector columns={3} options={sexOptions} />
          </Form.Item>
          <Form.Item name='life' label='状态' rules={[{ required: true, message: '请选择状态' }]}>
            <Selector columns={3} options={lifeOptions} />
          </Form.Item>
          <Form.Item
            name='birthday'
            label='生日'
            trigger='onConfirm'
            onClick={(e, datePickerRef: RefObject<DatePickerRef>) => {
              datePickerRef.current?.open()
            }}
          >
            <DatePicker
              min={new Date('1900-01-01')}
              max={new Date()}>
              {value =>
                value ? dayjs(value).format('YYYY-MM-DD') : '请选择日期'
              }
            </DatePicker>
          </Form.Item>
          <Form.Item name='zodiac' label='生肖'>
            <Selector columns={4} options={zodiacOptions} />
          </Form.Item>
          <Form.Item name='constellation' label='星座'>
            <Selector columns={3} options={constellationOptions} />
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
