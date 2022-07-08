import React from "react"
import Link from 'next/link'
import Image from 'next/image'
import SayHello from '../../components/study/sayHello'
import StateTest from '../../components/study/stateTest'

export default class Index extends React.Component {
  render() {
    return (
      <div>
        <p>Welcome to Next.js!</p>
        <Link href={`/study/about`}><a>About</a></Link>
        <br/>
        {/* 关于设置图片尺寸的两种方法 */}
        <div>
          <div className={`relative h-60 w-60`}>
            <Image src={require('../../../public/test_photo.png')} layout={"fill"}></Image>
          </div>

          <div className={`relative`} style={{width: '200px', height: '200px'}}>
            <Image src={require('../../../public/test_photo.png')} layout={"fill"}></Image>
          </div>
        </div>
        <SayHello/>
        <StateTest/>
        <h1 className={`text-3xl font-bold underline`}>Hello Tailwindcss!</h1>
      </div>
    )
  }
}
