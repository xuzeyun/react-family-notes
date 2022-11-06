import React from "react";

const UserContext = React.createContext({
  id: "",
  username: "",
  nickname: "",
  token: "",
});

export default UserContext;
