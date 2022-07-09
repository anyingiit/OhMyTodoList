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