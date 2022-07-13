import React from "react";
import {GetServerSideProps} from "next";
import {Todo, User} from "../../types/typs";
import TodoBase from "../../components/todoBase";

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
  render() {
    return (
      <TodoBase
        data={this.props.data}
        tasks={[]}
        showTodoAvatar={true}
        headerData={{
          data: {
            title: `Todo List Overview`,
            href: '/todos'
          },
          userAvatarData: undefined
        }}
      />
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