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
  }[],
  curUser: User
}

/**
 * 用于显示某个用户的任务
 */
export default class UserTodos extends React.Component<Props, any> {
  render() {
    return (
      <TodoBase
        data={this.props.data}
        tasks={[]}
        showTodoAvatar={false}
        headerData={{
          data: {
            title: `My Todo List`,
            href: '/todos'
          },
          userAvatarData: {
            username: this.props.curUser.username,
            id: this.props.curUser.id,
            href: `/user/${this.props.curUser.id}`
          }
        }}
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