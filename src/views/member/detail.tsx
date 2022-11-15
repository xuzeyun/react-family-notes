// main
import React, { useState, useEffect, RefObject } from "react";
import "styles/index.scss";
import { Card, Grid } from "antd-mobile";
import dayjs from 'dayjs'
import { useLocation } from "react-router-dom";


const apiUrl = process.env.REACT_APP_API_URL;

export default function MemberDetail() {
  const location = useLocation();
  useEffect(() => {
    console.log(location, 'params');
  });

  return (
    <div>
      <Card
        title={
          <div style={{ fontWeight: 'normal' }}>
            <i className="fas fa-user"></i>
            基本信息
          </div>
        }
      >
        <Grid columns={6} gap={8}>
          <Grid.Item span={1}><div>姓名</div></Grid.Item>
          <Grid.Item span={5}><div>{location.state.name ? location.state.name : '-'}</div></Grid.Item>
          <Grid.Item span={1}><div>别名</div></Grid.Item>
          <Grid.Item span={2}><div>{location.state.nickname ? location.state.nickname : '-'}</div></Grid.Item>
          <Grid.Item span={1}><div>性别</div></Grid.Item>
          <Grid.Item span={2}><div>{location.state.sex == 1 ? '男' : location.state.sex == 0 ? '女' : '-'}</div></Grid.Item>
          <Grid.Item span={1}><div>生日</div></Grid.Item>
          <Grid.Item span={2}><div>{location.state.birthday ? location.state.birthday : '-'}</div></Grid.Item>
          <Grid.Item span={1}><div>星座</div></Grid.Item>
          <Grid.Item span={2}><div>{location.state.constellation ? location.state.constellation : '-'}</div></Grid.Item>
        </Grid>
      </Card>
      <Card
        title={
          <div style={{ fontWeight: 'normal' }}>
            <i className="fas fa-file"></i>
            其他信息
          </div>
        }
      >
        <Grid columns={3} gap={8}>
          <Grid.Item span={1}><div>状态</div></Grid.Item>
          <Grid.Item span={2}><div>{location.state.life == 1 ? '生' : location.state.life == 0 ? '死' : '-'}</div></Grid.Item>
          <Grid.Item span={1}><div>生肖</div></Grid.Item>
          <Grid.Item span={2}><div>{location.state.zodiac ? location.state.zodiac : '-'}</div></Grid.Item>
          <Grid.Item span={1}><div>职业</div></Grid.Item>
          <Grid.Item span={2}><div>{location.state.occupation ? location.state.occupation : '-'}</div></Grid.Item>
          <Grid.Item span={1}><div>联系方式</div></Grid.Item>
          <Grid.Item span={2}><div>{location.state.contact ? location.state.contact : '-'}</div></Grid.Item>
          <Grid.Item span={1}><div>兴趣爱好</div></Grid.Item>
          <Grid.Item span={2}><div>{location.state.interest ? location.state.interest : '-'}</div></Grid.Item>
          <Grid.Item span={1}><div>个人简介</div></Grid.Item>
          <Grid.Item span={2}><div>{location.state.intro ? location.state.intro : '-'}</div></Grid.Item>
        </Grid>
      </Card>
    </div>
  );
}
