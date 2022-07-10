import React from "react";
import Link from "next/link";
import UserAvatar from "./userAvatar";

interface Props {
  userInfo?: {
    username: string,
    id: number
  }
}

// Header: 所有页面的Header, 可以控制是否显示用户头像
export default class Header extends React.Component<Props, any> {
  render() {
    return (
      <div className={`h-12 w-full bg-blue-500 text-white px-2`}>
        <div className={`float-left h-full flex content-center items-center font-semibold`}>
          <h1><Link href={`/`}><a>To Do</a></Link></h1>
        </div>
        {
          this.props.userInfo &&
          <div className={`float-right h-full flex items-center content-center`}>
            <UserAvatar username={this.props.userInfo?.username} width={8} height={8} href={'/'} textColor={`white`}
                        borderColor={`white`}/>
          </div>
        }

      </div>
    )
  }
}