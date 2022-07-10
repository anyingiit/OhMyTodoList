import React from "react";
import Link from "next/link";

interface Props {
  username: string,
  width: number,
  height: number,
  href: string,
  textColor: string,
  borderColor: string
}

// UserAvatar: 用户名组成的用户头像的封装, 无状态组件. 由外部控制: 用户名, 宽度, 高度, 点击后跳转的导航页面, 字体颜色, 边框颜色
export default class UserAvatar extends React.Component<Props, any> {
  render() {
    return (
      <div
        className={`w-${this.props.width} h-${this.props.height} border rounded-full inline-flex justify-center items-center`}
        style={{color: this.props.textColor, borderColor: this.props.borderColor}}>
        <Link href={this.props.href}><a>{this.props.username.slice(0, 2)}</a></Link>
      </div>
    );
  }
}