import React, { useEffect, useMemo, useState } from "react";
import {
  Routes,
  Route,
  Link,
  useParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
// import logo from './logo.svg';
import "styles/index.scss";
import {} from "./views/member/index"
import MemberList from "./views/member/index";
import MemberDetail from "./views/member/detail";

import BottomNav from "views/bottom-nav/index";
import Login from "views/login/index";
// import { Money } from "views/money/index";
// import { Note } from "views/note/index";
import { TopBar } from "views/topbar/index";
import { PersonalCenter } from "views/personal-center/index";
import UserContext from "./context/UserContext";

function App() {
  let curUrl = useLocation();

  const topBar = curUrl.pathname !== "/login" ? <TopBar></TopBar> : null;
  const bottomNav = curUrl.pathname !== "/login" ? <BottomNav></BottomNav> : null;

  const [userInfo, setUserInfo] = useState({
    id: "",
    username: "",
    nickname: "",
    token: "",
  });
  const value: any = useMemo(
    () => ({ userInfo, setUserInfo }),
    [userInfo, setUserInfo]
  );

  return (
    <div className="App">
      <UserContext.Provider value={value}>
        {/* 顶栏 */}
        {topBar}
        {/* 内容区域 */}
        <div className="app-wrap">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/member" element={<MemberList />} />
            <Route path="/member/detail" element={<MemberDetail />} />
            {/* <Route path="/money" element={<Money />} />
            <Route path="/note" element={<Note />} /> */}
            <Route path="/personalCenter" element={<PersonalCenter />} />
          </Routes>
        </div>
        {/* 底栏 */}
        {bottomNav}
      </UserContext.Provider>
    </div>
  );
}

export default App;
