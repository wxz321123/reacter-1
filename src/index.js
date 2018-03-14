import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Greeting extends Component {

  // 这里定义state的初始值
  // 注意，在类中使用state，必须用this.state
  state={
    who:'world'
  }

  // 这里切换who
  switchName=()=>{
    // 如果state的who字段为'world'，则将状态改为'react'
    // 请注意，setState的参数是一个函数
    // 该函数有两个参数，第一个是目前的状态，第二个是目前的属性
    // 该函数可以使用这两个参数，来计算并返回新得状态
    // setState会提供这两个参数，并调用我们传入得函数，修改state
    // 重点：修改state后，会自动得更新屏幕
    if (this.state.who==='world')
      this.setState((prevState,props)=>({who:'react'}))
    else
      this.setState((prevState,props)=>({who:'world'}))
  }

  //解释：<button onClick={this.switchName}>
  //<button>是html标记，一个按钮，视作一个组件
  //onClick={...},onClick是一个属性，指定当我们点击该按钮得时候，要执行哪个事件函数，这里是我们定义得switchName

  // 语法要点: 问号操作符 this.state.who==='world'?'react':'world'
// 这类似于C中得分支判断

  render() {
    return (
      <div>  
          <h1>{`hello ${this.state.who}`}</h1> 
          <button onClick={this.switchName}> {this.state.who==='world'?'react':'world'}</button>
      </div>
    );
  }
}

const App=(props,context)=>{
  // 我们在这里定义两个Greeting组件
  // 每个都包括一个按钮
  // 分别点击，可以看到：两个按钮得状态是不同得
  // 换言之：组件得不同实例，拥有各自得状态，这和通常得类和实例得关系一致
  // 同时注意，现在为Greeting组件指定who属性，已经没有意义，被忽略
  return (
    <div>
      <Greeting who={'world'} />
      <Greeting who={'react'} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));

