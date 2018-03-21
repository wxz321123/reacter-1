//王小洲
//程序设计构思如下
//10.16
//1.默认值"三种蔬菜菜我都不喜欢" ；变量food
//2.模板字符串`我喜欢{this.state.food }`
//3.if else  条件判断 默认值与模板字符串切换
//3.greeting 组建包裹 默认值
//app->greeting
//4 为了实现 萝卜白菜番茄 可以利用SET 的特性
import React, {Component }from 'react';
import ReactDOM from 'react-dom';
const s = new Set();//我喜欢的元素
var best='';//我最喜欢的元素
var title=''
//const condition=true
class Greeting extends Component{
    state={
        order:this.props.order,
        name:this.props.food,//蔬菜名称
        like:true,//默认喜欢
        likestatus:false,//喜欢按钮可见
        bestlike:this.props.bid,//最喜欢
        bestlikestatus:true//最喜欢按钮不可见
    }
    switchTitle=(event)=>{
        this.setState((prevState,props)=>({bestlikestatus:false})) 
        let food=event.target.name
        title='我喜欢'
        console.log(event.target.value)
        if (this.state.like) {
            s.add(food)
            for (let iterator of s.keys()) {
                title+=iterator
            }
            title+=best
            this.setState((prevState,props)=>({like:false})) 
            
        } else {
            s.delete(food)
            for (let iterator of s.keys()) {
                title+=iterator
            }
            console.log(title)
            this.setState((prevState,props)=>({like:true,bestlikestatus:true})) 
        }
        this.props.switchFood1(title)//像父组建传递title

    }

    switchBestFood=(event)=>{
        title='我喜欢'
        for (let iterator of s.keys()) {
            title+=iterator
        }

        let id=event.target.id
        if (this.props.bid!==this.props.order) {
            //todo 点击白菜最喜欢时候 对应的白菜的最喜欢按钮变为不是最喜欢
            let food=event.target.name
            
            best= ` 我最喜欢${food}`
            title+=best
           // this.setState((prevState,props)=>({bestlike:false,likestatus:true})) 
            // 判断其它两个蔬菜的状态 是否为不是最喜欢 bestlike=false  若是 触发 不是最喜欢 按钮的事件
            this.setState((prevState,props)=>({likestatus:true})) 
            this.props.switchBest(id)
        } else {
            //不是最喜欢的时候
            this.setState((prevState,props)=>({like:true,likestatus:false,bestlikestatus:true})) 
            id='0'
            this.props.switchBest(id)
        } 
        this.props.switchFood1(title)//像父组建传递title
    }
   render(){
    return(
        <div>
            <span>{this.state.name}</span> <input type="button" id="fanqie" disabled={this.state.likestatus} name={this.state.name} onClick={this.switchTitle} value={this.state.like===true?'喜欢':'不喜欢'}/>
            <input type="button" id={this.props.order} name={this.state.name} disabled={this.state.bestlikestatus}onClick={this.switchBestFood} value={this.props.bid!==this.props.order?'最喜欢':'不是最喜欢'}/>

        </div>
    );
   } 
}
//发生事件改变title
class GreetingH1 extends Component{
    state={
        name:this.props.title,
        bestlike:'0'//0默认  1代表最喜欢萝卜 2代表最喜欢 白菜 3代表最喜欢番茄
    }
    switchFood1=(title)=>{
        if (s!==null && s.size!==0) {
            this.setState((prevState,props)=>({name:title})) 
        } else {
            this.setState((prevState,props)=>({name:this.props.title})) 
        }
    } 
    switchBest=(title)=>{
        this.setState((prevState,props)=>({bestlike:title})) 
 
    }
   render(){
    return(
        <div>
            <h1>{this.state.name}</h1>
            <Greeting bid={this.state.bestlike}food={'萝卜'} order={'1'} switchBest={this.switchBest.bind(this)}switchFood1={this.switchFood1.bind(this)}/>
            <Greeting bid={this.state.bestlike}food={'白菜'} order={'2'}switchBest={this.switchBest.bind(this)}switchFood1={this.switchFood1.bind(this)}/>
            <Greeting bid={this.state.bestlike}food={'番茄'} order={'3'}switchBest={this.switchBest.bind(this)}switchFood1={this.switchFood1.bind(this)}/>
        </div>
    );
   } 
}
const App=(props,context)=>{
    return(
        <div>
            <GreetingH1 title={'三种蔬菜都不喜欢'}/>
        </div>
    )
}
ReactDOM.render(<App/>,document.getElementById('root'));