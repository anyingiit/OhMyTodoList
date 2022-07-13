import React from "react";
import Header from "../../components/header";
import {GetServerSideProps} from "next";
import {User} from "../../types/typs";

interface Props {
  data: User
}

export default class _ extends React.Component<Props, any> {
  //TODO: 一个可以组成层级关系的列表

  render() {
    return (
      <div>
        <Header
          userAvatarData={{
            username: this.props.data.username,
            id: this.props.data.id,
            href: `/user/${this.props.data.id}`
          }}
          data={{
            title: 'My User Infos',
            href: `/todos/${this.props.data.id}`
          }}
        />
      </div>
    )
  }
}

export const getServerSideProps: GetServerSideProps = async ({params}): Promise<{ props: Props }> => {
  const users: User[] = require("../../../users.json") as User[]

  const id = parseInt((params as { id: string }).id)

  const user = users.find((item) => {
    if (item.id === id) {
      return true
    }
  }) as User

  return {
    props: {
      data: user
    }
  }
}
