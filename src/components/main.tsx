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
  },
  /**
   * 当某个Todo状态更改时会调用该动作
   * @param index 触发更改的元素下标(根据this.props.todoListData)
   * @param newState 更改后的最新状态
   */
  todoCompleteStateChange: (index: number, newState: boolean) => void,
  /**
   * header数据
   */
  headerData: {
    /**
     * 左侧数据信息
     */
    data: {
      /**
       * 可选, 当不传是默认为`To Do`
       */
      title?: string,
      /**
       * 点击后导航到哪
       */
      href: string,
    },
    /**
     * 右侧头像的数据, 当值为undefined时代表不显示头像
     */
    userAvatarData: {
      username: string,
      id: number,
      /**
       * 点击后导航到哪
       */
      href: string
    } | undefined
  }
}

// Main: 一个TodoList的模板页面
export default class Main extends React.Component<Props, any> {
  state = {isOpenMenu: false}

  changeOpenMenuState = () => {
    const isOpenMenu = this.state.isOpenMenu
    this.setState({isOpenMenu: !isOpenMenu})
    // console.log('onclick')
  }

  render() {
    // console.log('main render: this.props', this.props)
    return (
      <div className={`relative`}>
        <Header
          data={this.props.headerData.data}
          userAvatarData={this.props.headerData.userAvatarData}
        />
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
        <div className={`w-full h-full mt-16`}>
          <List
            data={this.props.todoListData}
            showAvatarIcon={this.props.showTodoAvatar}
            completeStateChange={this.props.todoCompleteStateChange}
          />
        </div>
      </div>
    );
  }
}
