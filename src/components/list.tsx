import React from "react";
import UserAvatar from "../userAvatar";

interface Props {
  data: {
    title: string,
    completed: boolean,
    id: number,
    userId: number,
    userName: string
  }[],
  showAvatarIcon: boolean
}

export default class List extends React.Component<Props, any> {
  render() {
    return (
      <div>
        {
          this.props.data.map((item, index) => {
            return (
              <div className={`mb-5 border-2 border-amber-500 px-4 h-16 w-full`} key={index}>
                <label className={`float-left h-full flex flex-row items-center w-3/4 text-2xl`}>
                  <div className={`basis-1/4 flex items-center justify-center`}>
                    <input
                      className={`h-8 w-8`}
                      type={`checkbox`}
                      defaultChecked={item.completed}
                      onChange={(event) => {
                        console.log(this)
                        console.log({userId: item.userId, id: item.id, newCompleteState: event.target.checked})
                      }}/>
                  </div>
                  <p
                    className={`basis-3/4 text-ellipsis overflow-hidden whitespace-nowrap`}>{item.title}</p>
                </label>
                <div
                  className={`float-right h-full flex items-center content-center ${this.props.showAvatarIcon ? `block` : 'hidden'}`}>
                  <UserAvatar username={item.userName} width={8} height={8} href={'/'}
                              textColor={'black'}
                              borderColor={`blue`}/>
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }
}