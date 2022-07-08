import React from "react";
import {GetServerSideProps} from "next";
import axios from "axios";

interface Todo {
  userId: number,
  id: number,
  title: string,
  completed: boolean
}

interface Props {
  todos: Todo[]
}

export default class Index extends React.Component<Props, any> {
  render() {
    return (
      <div>
        <div>hello world!</div>
        {
          this.props.todos.map((item, index) => {
            return (
              <div className={`mb-5 border-2 border-amber-500`} key={index}>
                <div>{item.id}</div>
                <div>{item.title}</div>
              </div>
            )
          })
        }
      </div>
    );
  }
}

export const getServerSideProps: GetServerSideProps = async (context): Promise<{ props: Props }> => {
  let todos: Todo[] = []
  await axios.get('https://jsonplaceholder.typicode.com/todos/')
    .then((response) => {
      todos = response.data
    })
    .catch((error) => {
      console.log(error)
    })

  return {
    props: {
      todos
    }
  }
}