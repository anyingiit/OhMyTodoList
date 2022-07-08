import React from "react";
import {GetServerSideProps} from "next";

interface Props {
  abc: boolean
}

export default class Index extends React.Component<Props, any> {
  render() {
    return (
      <div>
        <div>hello world!</div>
        <div>{this.props.abc ? 'true' : 'false'}</div>
      </div>
    );
  }
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      abc: true
    } as Props
  }
}