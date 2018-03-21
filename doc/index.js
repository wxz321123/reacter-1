import React, { Component,createContext } from 'react';
import ReactDOM from 'react-dom';

//创建一个context对象WhoContext
//其中WhoContext.Provider是一个组件，提供context
//WhoContext.Consumer也是一个组件，在Provider的组件树中消费该context
const WhoContext = React.createContext({who:'world'})
//React.createContext 用于传递 初始值，返回一个包含 provider 和 consumer 的对象
//provide 函数使用 higher，并可以接收任何值
//consume 函数在 provider 之后任何地方使用，并传递一个返回 JSX 的函数（这有点像 render prop 组件，但 consume 不是组件）。
class Greeting extends Component {

  // 这里定义state的初始值
  // 注意，在类中使用state，必须用this.state
  // 这里state初始化who的值，为传入该组件的defaultWho属性
  // 换言之，如果提供了defaultWho属性，则state的who字段为defaultWho属性，否则是空格
  state={
    who:this.props.defaultWho
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

class GreetingInput extends Component {

  // 注意，我们这里的handleChange使用函数，而非上面的箭头函数
  // 这里的区别是，箭头函数里的this指针，指向其拥有者，也就是class
  // 函数则不然，this指针指向函数本身，因此，在class的构造函数中，需要将handleChange绑定到本类的实例
  // 因此一个简易的方式是，在类中尽可能使用箭头函数
  constructor(props,context) {
    super(props,context); //执行基类的构造函数

    //在构造函数中设置state的初始值
    this.state = {
      who:this.props.defaultWho?this.props.defaultWho:''
    };



    // 语法要点：箭头函数和函数的this指针
    // 可以试着注释掉这一行看看结果
    // 会提示this指针是: undefined，而没有定义的指针，执行this.setState是会出错的
    //若没有注释，则提示的是：this指针是: GreetingInput，也就是本类的一个实例
    this.handleChange = this.handleChange.bind(this);
    
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {

    // 如果构造函数没有绑定此函数，则在浏览器中按F12，查看condole,这里输出的this是什么？
    console.log('this指针是:',this)
    this.setState({who: event.target.value});
  }

  handleSubmit(event) {
    alert('如果您按回车，或者点击提交按钮，则窗体会执行提交事件，现在状态中who的值是: ' + this.state.who);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
      <h1>{`hello ${this.state.who}`}</h1> 
      <label>
        Who:
        <input type="text" value={this.state.who} onChange={this.handleChange} />
      </label>
      <input type="submit" value="窗体提交按钮，可点击也可按回车，会触发form的onSubmit事件" />
    </form>
    );
  }
}


const App=(props,context)=>{


  return (
    <div>
    <Greeting defaultWho={'world'} />
      <GreetingInput />
  </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));

