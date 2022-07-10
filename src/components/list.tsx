import React from "react";
import UserAvatar from "./userAvatar";

interface Props {
  data: {
    title: string,
    completed: boolean,
    id: number,
    userId: number,
    userName: string
  }[],
  showAvatarIcon: boolean // 每个任务后方是否显示创建者
}

// List: 可以显示Todo的列表
export default class List extends React.Component<Props, any> {
  render() {
    // console.log('List render: this.props', this.props)
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
                      checked={item.completed} // 注意: 记录一个奇怪的bug, 此处千万不能使用`defaultChecked`属性作为设想中的那样去使用, 即预想为默认属性, 这会导致页面出现非常奇怪的bug, 比如说渲染时其他的地方都渲染了, 只有input框不会渲染, 只有刷新页面后才能解决这个问题, 其他页面导航过来到当前页面会100%触发该bug
                      onChange={(event) => { //TODO: 应当把控制权移交出去
                        console.log({userId: item.userId, id: item.id, newCompleteState: event.target.checked})
                      }}/>
                  </div>
                  <p
                    className={`basis-3/4 text-ellipsis overflow-hidden whitespace-nowrap`}>{item.title}</p>
                </label>
                <div
                  className={`float-right h-full flex items-center content-center ${this.props.showAvatarIcon ? `block` : 'hidden'}`}>
                  <UserAvatar username={item.userName} width={8} height={8} href={`/todos/${item.userId}`}
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