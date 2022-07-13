import React from "react";
import Link from "next/link";
import UserAvatar from "./userAvatar";

interface Props {
  /**
   * 左侧标题数据信息
   */
  data: {
    /**
     * Header的标题, 默认值为`To Do`
     */
    title?: string,
    href: string
  },
  /**
   * 右侧用户头像数据, 如果值为undefined代表页面不显示头像
   */
  userAvatarData: {
    username: string,
    id: number,
    href: string
  } | undefined
}

// Header: 所有页面的Header, 可以控制是否显示用户头像
export default class Header extends React.Component<Props, any> {
  render() {
    return (
      <div className={`h-12 w-full bg-blue-500 text-white px-2`}>
        <div className={`float-left h-full flex content-center items-center font-semibold`}>
          <h1><Link href={this.props.data.href}><a>{this.props.data.title ?? `To Do`}</a></Link></h1>
        </div>
        {
          this.props.userAvatarData &&
          <div className={`float-right h-full flex items-center content-center`}>
            <UserAvatar username={this.props.userAvatarData.username} width={8} height={8}
                        href={`${this.props.userAvatarData.href}`} textColor={`white`}
                        borderColor={`white`}/>
          </div>
        }

      </div>
    )
  }
}