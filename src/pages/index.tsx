import React from "react"
import Link from 'next/link'
import Image from 'next/image'
import SayHello from '../components/sayHello'
import StateTest from '../components/stateTest'

export default class Index extends React.Component {
  render() {
    return (
      <div>
        <p>Welcome to Next.js!</p>
        <Link href={`/about`}><a>About</a></Link>
        <br/>
        <Image src={`/test_photo.png`} width={327} height={450}></Image>
        <SayHello/>
        <StateTest/>
      </div>
    )
  }
}
