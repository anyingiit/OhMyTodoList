import React from "react";
import UserAvatar from "../components/userAvatar";

// Debug: 用于对组件的debug
export default class Debug extends React.Component<any, any> {
  render() {
    return (
      <div>
        <UserAvatar username={'abc'} width={8} height={8} href={'/'} textColor={'blue'} borderColor={'black'}/>
      </div>
    );
  }
}