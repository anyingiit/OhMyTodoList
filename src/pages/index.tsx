import React from "react";
import {GetServerSideProps} from "next";
import Header from "../components/header";
import Nav from "../components/nav/nav";
import {Todo, User} from "../types/typs"
import List from "../components/list";
import Menu from "../components/nav/menu";

interface Props {
  todos: Todo[]
}

export default class Index extends React.Component<Props, any> {
  state = {isOpenMenu: true}

  changeOpenMenuState = () => {
    const isOpenMenu = this.state.isOpenMenu
    this.setState({isOpenMenu: !isOpenMenu})
    console.log('onclick')
  }

  render() {
    return (
      <div>
        <Header/>
        <div className={`${this.state.isOpenMenu ? `block` : `hidden`}`}>
          <Menu
            closeMenuFunc={this.changeOpenMenuState}
            tasks={
              [
                {
                  name: '全部任务',
                  iconSrc: require('../../public/cloud.png'),
                  func: () => {
                  }
                },
                {
                  name: '未完成',
                  iconSrc: require('../../public/cloud.png'),
                  func: () => {
                  }
                },
                {
                  name: '已完成',
                  iconSrc: require('../../public/cloud.png'),
                  func: () => {
                  }
                },
              ]
            }
            selectedIndex={0}
          />
        </div>
        <Nav
          title={`全部任务`} shortCuts={[
          {
            iconSrc: require('../../public/cloud.png'),
            href: '/'
          }, {
            iconSrc: require('../../public/love.png'),
            href: '/'
          }]}
          onClickMenuButton={this.changeOpenMenuState}
        />
        <List
          data={
            this.props.todos.map((item) => {
              return {
                ...item,
                userName: getUser(item.userId)?.name ?? 'UnKnow'
              }
            })
          }
          showAvatarIcon={true}
        />
      </div>
    );
  }
}

const getTodos = (): Todo[] => {
  return require("../../public/todos.json")
}

const getUsers = (): User[] => {
  return require("../../users.json")
}

const getUser = (id: number): User | undefined => {
  for (const user of getUsers()) {
    if (user.id === id) {
      return user
    }
  }
  return undefined
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

  todos = require("../../public/todos.json") as Todo[]
  return {
    props: {
      todos
    }
  }
}