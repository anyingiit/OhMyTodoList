import React from "react";
import Header from "./header";
import Nav from "./nav/nav";
import List from "./list";
import Menu from "./nav/menu";

interface Props {
  todoListData: { // Todos
    title: string,
    completed: boolean,
    id: number,
    userId: number,
    userName: string
  }[],
  showTodoAvatar: boolean, // 每个任务后是否显示Todo创建者头像
  curUserInfo?: { // 当传入时, 会在Header中显示用户头像, 主要用于用户登录后显示已登录的用户的头像
    id: number,
    username: string
  },
  todoListTask: { // 该页面可以执行的任务
    name: string,
    iconSrc: string,
    func: () => void,
    selected: boolean
  }[],
  navData: { // 导航栏中的信息, 以及导航栏的快捷任务
    title: string,
    shortCuts: {
      iconSrc: string,
      href: string
    }[]
  }
}

// Main: 一个TodoList的模板页面
export default class Main extends React.Component<Props, any> {
  state = {isOpenMenu: true}

  changeOpenMenuState = () => {
    const isOpenMenu = this.state.isOpenMenu
    this.setState({isOpenMenu: !isOpenMenu})
    console.log('onclick')
  }

  render() {
    return (
      <div className={`relative`}>
        <Header userInfo={this.props.curUserInfo}/>
        <div className={`w-full absolute ${this.state.isOpenMenu ? `h-full` : ``}`}>
          <Nav
            title={this.props.navData.title} shortCuts={this.props.navData.shortCuts}
            onClickMenuButton={this.changeOpenMenuState}
          />
          <div className={`w-full h-full absolute top-0 ${this.state.isOpenMenu ? `block` : `hidden`}`}>
            <div className={`w-full h-full absolute bg-gray-500 opacity-80`} onClick={this.changeOpenMenuState}></div>
            <Menu
              closeMenuFunc={this.changeOpenMenuState}
              tasks={this.props.todoListTask}
            />
          </div>
        </div>
        <List
          data={this.props.todoListData}
          showAvatarIcon={this.props.showTodoAvatar}
        />
      </div>
    );
  }
}
