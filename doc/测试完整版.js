
/**王小洲 3月21日
 * 程序设计构思如下
 * UI结构 App--->GreetingList-->Greeting
 * 需求：id 蔬菜编号   name 蔬菜名称 like 是否喜欢 默认喜欢 mostlike 是否最喜欢默认最喜欢 onlike()喜欢按钮是否可见 默认可见 onMostLike 最喜欢按钮是否可见 默认不可见
 * 构建一个Set 存放喜欢的元素 用来实现我喜欢...
 * best 存放最喜欢的元素 用来实现最喜欢...
 * title：拼接好的字符串我喜欢...最喜欢... greeting将title字符串拼接好 传给父组件greetingList  刷新父组件state属性
 * 在父组件GreetingList中 
 * 设计function->switchBest 实现按钮的切换与可见
 * 设计function->switchFood1 将子组件拼接好的title 展示出来
 * 通过map对子组件进行遍历
 * 在子组件Greeting中
 * 设计function->switchTitle 实现喜欢 不喜欢按钮的 字符串拼接
 * 设计function->switchBestFood 实现最喜欢 不是最喜欢喜欢按钮的 字符串拼接
 * 思考：
 * switchTitle与switchBestFood 是否能可以合并为一个function
 * 扩展运算符（...）内部使用for...of循环，所以也可以用于 Set 结构
 * 用[...set].map(=>title+iterator)
 * 替换
 * for (let iterator of s.keys()) {title+=iterator}
 * 用[...set].filter()
 * 替换switchBest 中的for 循环
 */
 
import React, {Component }from 'react';
import ReactDOM from 'react-dom';

var data=[{id:'0',name:'萝卜',like:true,mostLike:true,onlike:false,onMostLike:true},
{id:'1',name:'白菜',like:true,mostLike:true,onlike:false,onMostLike:true},
{id:'2',name:'番茄',like:true,mostLike:true,onlike:false,onMostLike:true}
]
const s = new Set();//我喜欢的元素
var best='';//我最喜欢的元素 +我最喜欢
var title=''
class Greeting extends Component{
    //可以注释掉 用不上
    // state={
    //     order:this.props.value.id,
    //     name:this.props.value.name,//蔬菜名称
    //     like:this.props.value.like,//默认喜欢
    //     onlike:this.props.value.onlike,//喜欢按钮可见
    //     mostLike:this.props.value.mostLike,//最喜欢
    //     onMostLike:this.props.value.onMostLike,//最喜欢按钮不可见
    // }
    switchTitle=(event)=>{
        let food=event.target.name
        title='我喜欢'
        console.log(event.target.value)
        if (this.props.value.like) {
            s.add(food)
            for (let iterator of s.keys()) {
                title+=iterator
            }
            // for (let iterator of s.keys()) {title+=iterator}
            title+=best
        } else {
            s.delete(food)
            for (let iterator of s.keys()) {
                title+=iterator
            }
            console.log(title)
            title+=best
        }
        this.props.switchBest(event)
        console.log(best)
        this.props.switchFood1(title)//像父组建传递title
    }

    switchBestFood=(event)=>{
        title='我喜欢'
        for (let iterator of s.keys()) {
            title+=iterator
        }
        let id=event.target.id
        console.log(id)
        if (this.props.value.mostLike) {
            //todo 点击白菜最喜欢时候 对应的白菜的最喜欢按钮变为不是最喜欢
            let food=event.target.name
            best= ` 我最喜欢${food}`
            title+=best
            this.setState((prevState,props)=>({onlike:true}))       
        } else {
            //不是最喜欢的时候
            best= ''
        } 
        this.props.switchBest(event)
        this.props.switchFood1(title)//像父组建传递title
    }
   render(){
    return(
        <ul>
            <span>{this.props.value.name}</span>
            <input type="button" id={this.props.value.id} disabled={this.props.value.onlike} name={this.props.value.name} onClick={this.switchTitle} value={this.props.value.like===true?'喜欢':'不喜欢'}/>
            <input type="button" id={this.props.value.id} name={this.props.value.name} disabled={this.props.value.onMostLike}onClick={this.switchBestFood} value={this.props.value.mostLike===true?'最喜欢':'不是最喜欢'}/>
        </ul>
    );
   } 
}
class GreetingList extends Component{
    state={
        name:this.props.title,
        
    }
    //没有最喜欢则显示默认的title
    switchFood1=(title)=>{
        if (s!==null && s.size!==0) {
            this.setState((prevState,props)=>({name:title})) 
        } else {
            this.setState((prevState,props)=>({name:this.props.title})) 
        }
    }
    //修改子件按钮 
    switchBest=(event)=>{
        let id=event.target.id
        let value=event.target.value
        console.log(this.props.data[id].mostLike)
        //点击最喜欢//判断数组是否有不是最喜欢 如果有 修改不是最喜欢按钮为 最喜欢  不喜欢按钮可见
        //点击不是最喜欢 //不是最喜欢按钮改为最喜欢 可见 不喜欢按钮改 可见
        if (value==='最喜欢') {
            //判断数组是否有不是最喜欢 
            for(var ele of data){  
                console.log(ele);
                if(ele.mostLike=== false){//判断数组是否有不是最喜欢 有->不是最喜欢 改为最喜欢
                    console.log(this.props.data[ele.id]);
                    this.props.data[ele.id].mostLike=true//最喜欢 
                    this.props.data[ele.id].onlike=false //不可见
                }
            }  
            this.props.data[id].mostLike=false//不是最喜欢
            this.props.data[id].onlike=true //不可见
        } else if(value==='不是最喜欢') {
            this.props.data[id].mostLike=true//最喜欢
            this.props.data[id].onlike=false //可见
        }else if(value==='喜欢') {
            this.props.data[id].like=false
            this.props.data[id].onMostLike=false
        }else{
            //不喜欢
            this.props.data[id].like=true
            this.props.data[id].onMostLike=true
        }

    }
   render(){
        const numbers = this.props.data; 
    return(
        <div>
            <h1>{this.state.name}</h1>
            {numbers.map((number ) =><Greeting key={number.id} value={number} 
            switchBest={this.switchBest.bind(this)} switchFood1={this.switchFood1.bind(this)}/>
                  )}
        </div>
    );
   } 
}
const App=(props,context)=>{
    return(
        <div>
            <GreetingList title={'三种蔬菜都不喜欢'} data={data} />
        </div>
    )
}
ReactDOM.render(<App/>,document.getElementById('root'));