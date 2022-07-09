import React from "react";
import Image from "next/image";
import Link from "next/link";
import MenuButton from "./menuButton";

interface Props {
  title: string,
  shortCuts?: { iconSrc: string, href: string }[],
  onClickMenuButton: () => void
}

export default class Nav extends React.Component<Props, any> {
  // 除了基础功能以外, 应当能够接受N的功能的快捷方式, 当点击时调用即可
  render() {
    return (
      <div
        className={`h-16 w-full bg-white border-solid border-b-gray-300 border-b box-border px-3 flex items-center`}>
        <div className={`h-8 w-full`}>
          <div className={`float-left flex flex-row items-center`}>
            <MenuButton onClickFunc={this.props.onClickMenuButton}/>
            <h2 className={`ml-2 font-bold text-2xl flex items-center justify-center`}>{this.props.title}</h2>
          </div>
          <div className={`float-right`}>
            {
              this.props.shortCuts?.map((item, index) => {
                return (
                  <div key={index} className={`float-left ml-2 h-8 w-8`}>
                    <Link href={item.href}>
                      <a className={`relative h-full w-full inline-block`}><Image src={item.iconSrc}
                                                                                  layout={`fill`}/></a>
                    </Link>
                  </div>
                )
              })
              ?? undefined
            }
          </div>
        </div>
      </div>
    )
  }
}