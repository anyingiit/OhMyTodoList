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
  }[]
}

// todos/Index: 用于显示全部任务
export default class Index extends React.Component<Props, any> {
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
      <Main todoListData={this.state.data} showTodoAvatar={true} todoListTask={this.state.tasks}
            navData={this.state.navData}/>
    )
  }
}

export const getServerSideProps: GetServerSideProps = async (context): Promise<{ props: Props }> => {
  let todos: Todo[] = []
  // await axios.get('https://jsonplaceholder.typicode.com/todos/')
  //   .then((response) => {
  //     todos = response.data
  //   })
  //   .catch((error) => {
  //     console.log(error)
  //   })

  todos = require("../../../public/todos.json") as Todo[]
  const users = require("../../../users.json") as User[]

  const data: Props['data'] = todos.map((item, index) => {
    return {
      ...item,
      userName: getUser(item.userId)?.name ?? 'UnKnow'
    }
  })
  return {
    props: {
      data
    }
  }
}


const getTodos = (): Todo[] => {
  return require("../../../public/todos.json")
}

const getUsers = (): User[] => {
  return require("../../../users.json")
}

const getUser = (id: number): User | undefined => {
  for (const user of getUsers()) {
    if (user.id === id) {
      return user
    }
  }
  return undefined
}