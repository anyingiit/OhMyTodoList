import React from "react";
import MenuButton from "./menuButton";
import Image from "next/image";

interface Props {
  closeMenuFunc: () => void, // 该函数会被点击到关闭按钮触发
  tasks: { // 菜单中的任务列表, 每个列表项由名字, 图标, 点击后执行的函数, 当前列表项是否被选中组成
    name: string,
    iconSrc: string, // 注意: 该参数必须是引入后的资源地址. 反例: `../../public/love.png`, 正例: `require("../../public/love.png")`
    func: () => void,
    selected: boolean
  }[],
}

// Menu: 由外部控制的菜单页
export default class Menu extends React.Component<Props, any> {
  render() {
    return (
      <div className={`absolute w-10/12 h-full bg-white px-3`}>
        <div className={`h-16 w-full flex items-center`}>
          <MenuButton onClickFunc={this.props.closeMenuFunc}/>
        </div>
        {
          this.props.tasks.map((item, index) => {
            return (
              <div className={`h-16 w-full bg-red-500 flex flex-row items-center`} onClick={() => {
                item.func()
                this.props.closeMenuFunc()
              }} key={index}>
                <div className={`relative h-8 w-8`}>
                  <Image src={item.iconSrc} layout={`fill`}/>
                </div>
                <p
                  className={`ml-2 text-2xl ${item.selected ? `font-bold` : `font-normal`}`}>{item.name}</p>
              </div>
            )
          })
        }
      </div>
    )
  }
}