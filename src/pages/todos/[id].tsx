import React from "react";
import Main from "../../components/main";
import {GetServerSideProps} from "next";
import {Todo, User} from "../../types/typs";

interface Props {
  data: {
    title: string,
    completed: boolean,
    id: number,
    userId: number,
    userName: string
  }[],
  curUser: User
}

// todos/[id]: 用于显示某个用户的任务
export default class UserTodos extends React.Component<Props, any> {
  //TODO: 全部任务, 未完成, 已完成 这种统一的任务应当再封装一层
  updateTaskSelectedState = (newSelectedTaskIndex: number) => {
    let tasks = this.state.tasks
    tasks = tasks.map((item, index) => {
      item.selected = index === newSelectedTaskIndex;
      return item
    })
    this.setState({tasks: tasks, navData: {title: tasks[newSelectedTaskIndex].name}})
  }

  changeTodoListDataToAllTodo = () => {
    const data = this.props.data
    this.updateTaskSelectedState(0)
    this.setState({data: data})
  }
  changeTodoListDataToUnCompletedTodo = () => {
    const data = this.props.data.filter((item) => {
      if (!item.completed) {
        return true
      }
    })
    this.updateTaskSelectedState(1)
    // console.log(data)
    this.setState({data: data})
  }
  changeTodoListDataToCompletedTodo = () => {
    const data = this.props.data.filter((item) => {
      if (item.completed) {
        return true
      }
    })
    this.updateTaskSelectedState(2)
    // console.log(data)
    this.setState({data: data})
  }
  state = {
    data: this.props.data,
    tasks: [
      {
        name: '全部任务',
        iconSrc: require('../../../public/cloud.png'),
        func: this.changeTodoListDataToAllTodo,
        selected: true
      },
      {
        name: '未完成',
        iconSrc: require('../../../public/cloud.png'),
        func: this.changeTodoListDataToUnCompletedTodo,
        selected: false
      },
      {
        name: '已完成',
        iconSrc: require('../../../public/cloud.png'),
        func: this.changeTodoListDataToCompletedTodo,
        selected: false
      },
    ],
    navData: {
      title: '全部任务',
      shortCuts: []
    }
  }

  render() {
    return (
      <Main todoListData={this.state.data} showTodoAvatar={false} todoListTask={this.state.tasks}
            curUserInfo={{username: this.props.curUser.username, id: this.props.curUser.id}}
            navData={this.state.navData}
      />
    );
  }
}

export const getServerSideProps: GetServerSideProps = async ({params}): Promise<{ props: Props }> => {
  const todos: Todo[] = require("../../../public/todos.json") as Todo[]
  const users: User[] = require("../../../users.json") as User[]

  const id = parseInt((params as { id: string }).id)

  const user = users.find((item) => {
    if (item.id === id) {
      return true
    }
  }) as User

  let data: Props['data'] = todos.map((item) => {
    return {
      ...item,
      userName: user.name
    }
  })
  data = data.filter((item) => {
    if (item.userId === id) {
      return true
    }
  })
  return {
    props: {
      data: data,
      curUser: user
    }
  }
}