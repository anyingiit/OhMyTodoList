import React from "react"

export default class Index extends React.Component {
  state = {isHot: false}

  changeWeather = () => {
    const isHot = this.state.isHot
    this.setState({isHot: !isHot})
  }

  render() {
    return (
      <div>
        <p onClick={this.changeWeather}>{this.state.isHot ? '炎热' : '凉爽'}</p>
      </div>
    )
  }
}