import React from "react";
import Link from "next/link";

export default class About extends React.Component {
  render() {
    return (
      <div>
        <p>About</p>
        <Link href={`/study`}><a>Home</a></Link>
      </div>
    )
  }
}

