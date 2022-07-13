import React from "react";
import Main from "./main";


interface Props {
  data: {
    title: string,
    completed: boolean,
    id: number,
    userId: number,
    userName: string
  }[],
  /**
   * 指除了能够筛选全部任务, 未完成任务, 已完成任务以外的其他额外任务
   */
  tasks: {
    name: string,
    iconSrc: string,
    /**
     * 可以通过改函数实现对todoBase中的this.state.data的数据修改. 向函数传入一个dataSetter, 在其他组件想要修改Todo List Data时, 只需调用该函数即可, 其参数就是欲更新的最新数据
     * @param dataSetter 一个可以修改todo data的数据修改器, 应当传入整体todo list
     */
    func: (dataSetter: (data: Props['data']) => void) => void,
    selected: boolean
  }[],
  showTodoAvatar: boolean,
  headerData: {
    data: {
      title?: string,
      href: string,
    },
    userAvatarData: {
      username: string,
      id: number,
      href: string
    } | undefined
  }
  //TODO: 能够扩展nav的shortCut
}

interface States {
  data: Props['data'],
  tasks: {
    name: string,
    iconSrc: string,
    func: () => void,
    selected: boolean
  }[],
  navData: {
    title: string,
    shortCuts: {
      iconSrc: string,
      href: string
    }[]
  }
}

/**
 * 对Main组件的在封装, 封装进了一些所有Todo列表通用的功能, 例如全部任务, 未完成, 已完成, 封装了对选择某个任务后可以自动的对nav的标题, menu的选中自动处理的方法
 */
export default class TodoBase extends React.Component<Props, States> {
  constructor(props: Props) {
    super(props);
    this.state = {
      data: props.data,
      tasks: [],
      navData: {
        title: '全部任务',
        shortCuts: []
      }
    }
  }

  componentDidMount() {
    /**
     * 组建页面可以执行的任务, 包括三个通用任务, 以及n个传进来的自定义任务
     */
    const tasks: Props['tasks'] = [
      {
        name: '全部任务',
        iconSrc: require('../../public/cloud.png'),
        func: this.changeTodoListDataToAllTodo,
        selected: true
      },
      {
        name: '未完成',
        iconSrc: require('../../public/cloud.png'),
        func: this.changeTodoListDataToUnCompletedTodo,
        selected: false
      },
      {
        name: '已完成',
        iconSrc: require('../../public/cloud.png'),
        func: this.changeTodoListDataToCompletedTodo,
        selected: false
      },
      ...this.props.tasks
    ]

    /**
     * 对任务的func函数包裹一层函数
     */
    const commonTasks: States['tasks'] = tasks.map((item, index) => {
      return {
        ...item,
        func: this.forFuncAddUpdateTaskSelectedState(item.func, index)
      }
    })

    this.setState({tasks: commonTasks})
  }

  /**
   * 更新当前nav的标题和menu的选中状态
   * @param newSelectedTaskIndex 最新被选中的menu item的下标(相对于this.state.tasks)
   */
  updateTaskSelectedState = (newSelectedTaskIndex: number) => {
    // console.log(this.state)
    let tasks = this.state.tasks
    tasks = tasks.map((item, index) => {
      item.selected = index === newSelectedTaskIndex;
      return item
    })
    let navData = this.state.navData
    navData.title = tasks[newSelectedTaskIndex].name
    this.setState({tasks: tasks, navData: navData})
  }

  // 一般Todo List 常用的三大功能: 全部任务, 未完成任务, 已完成任务
  // 全部使用和外部想要修改this.state.data一样的思路去修改, 可以当做参考
  changeTodoListDataToAllTodo: Props['tasks'][0]['func'] = (dataSetter) => {
    const data = this.props.data
    dataSetter(data)
  }
  changeTodoListDataToUnCompletedTodo: Props['tasks'][0]['func'] = (dataSetter) => {
    const data = this.props.data.filter((item) => {
      if (!item.completed) {
        return true
      }
    })
    dataSetter(data)
  }
  changeTodoListDataToCompletedTodo: Props['tasks'][0]['func'] = (dataSetter) => {
    const data = this.props.data.filter((item) => {
      if (item.completed) {
        return true
      }
    })
    dataSetter(data)
  }

  /**
   * 更新nav和menu选中状态的同时, 将dataSetter传递给func, 并且封装一层函数, 该层函数可以被List接收
   * @param func 最终被执行的函数
   * @param newSelectedTaskIndex 最新被选中的menu item的下标(相对于this.state.tasks)
   */
  forFuncAddUpdateTaskSelectedState = (func: Props['tasks'][0]['func'], newSelectedTaskIndex: number): () => void => {
    return () => {
      this.updateTaskSelectedState(newSelectedTaskIndex)
      const dataSetter = (data: Props['data']) => {
        this.setState({data: data})
      }
      func(dataSetter)
    }
  }

  /**
   * 修改todo状态
   * @param index 相对于this.state.data的下标
   * @param newState 新状态
   */
  todoCompleteStateChange = (index: number, newState: boolean): void => {
    const data = this.state.data
    data[index].completed = newState
    console.log('userId:', data[index].userId, 'id:', data[index].id, 'newCompleteState:', newState)
    this.setState({data: data})
  }


  render() {
    return (
      <Main todoListData={this.state.data} showTodoAvatar={this.props.showTodoAvatar} todoListTask={this.state.tasks}
            headerData={this.props.headerData}
            navData={this.state.navData} todoCompleteStateChange={this.todoCompleteStateChange}
      />
    )
  }
}