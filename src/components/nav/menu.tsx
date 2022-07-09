import React from "react";
import MenuButton from "./menuButton";
import Image from "next/image";

interface Props {
  closeMenuFunc: () => void,
  tasks: {
    name: string,
    iconSrc: string,
    func: () => void
  }[],
  selectedIndex: number
}

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
              <div className={`h-16 w-full bg-red-500 flex flex-row items-center`} onClick={item.func}>
                <div className={`relative h-8 w-8`}>
                  <Image src={item.iconSrc} layout={`fill`}/>
                </div>
                <p
                  className={`ml-2 text-2xl ${index === this.props.selectedIndex ? `font-bold` : `font-normal`}`}>{item.name}</p>
              </div>
            )
          })
        }
      </div>
    )
  }
}