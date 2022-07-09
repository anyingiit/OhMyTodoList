import React from "react";

interface Props {
  onClickFunc: () => void
}

export default class MenuButton extends React.Component<Props, any> {
  render() {
    return (
      <div className={`w-8 h-8 flex flex-col justify-between py-1`} onClick={this.props.onClickFunc}>
        <div className={`w-full h-px bg-gray-500`}></div>
        <div className={`w-full h-px bg-gray-500`}></div>
        <div className={`w-full h-px bg-gray-500`}></div>
      </div>
    );
  }
}