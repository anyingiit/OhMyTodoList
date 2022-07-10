import React from "react";
import Router from "next/router"


export default class Index extends React.Component<any, any> {
  render() {
    return (
      <div></div>
    );
  }

  componentDidMount() {
    Router.push('/todos')
  }
}
