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
const s = new Set();
//const condition=true
class Greeting extends Component{
    state={
        food:this.props.defaultFood,
        defaultFood:this.props.defaultFood,
        best:'我喜欢',
        luobu:false,
        baicai:false,
        fanqie:false,
        like1:'喜欢',
        like2:'喜欢',
        like3:'喜欢',
    }
    switchBestFood=(event)=>{
        var set = new Set()
        set.clear()
        let bestlikename=event.target.name
        console.log(event.target.name)
        set.add(event.target.id)
        
            if(set.has('萝卜')){this.setState((prevState,props)=>({like1:'不是最喜欢',best:'我最喜欢',food:bestlikename})) }
            if(set.has('白菜')){this.setState((prevState,props)=>({like2:'不是最喜欢',best:'我最喜欢',food:bestlikename})) }
            if(set.has('番茄')){ this.setState((prevState,props)=>({like3:'不是最喜欢',best:'我最喜欢',food:bestlikename}))}
        
    }
    switchFood1=(event)=>{
        this.setState((prevState,props)=>({best:'我喜欢'}))
        let likename=event.target.name
        let likeid=event.target.id
        console.log(likeid)
        let likestatus=event.target.value
    
        if (likestatus==='喜欢'||likestatus==='不是最喜欢') {
            s.add(event.target.name)
            if (this.state.food===this.state.defaultFood) {
                this.setState((prevState,props)=>({food:likename}))
            } else {
                likename=''                     
                for (let item of s.keys()) {
    
                    likename+=item
                  }
                this.setState((prevState,props)=>({food:likename})) 
            }
            
            if (likeid==='luobu') {
                this.setState((prevState,props)=>({like1:'不喜欢',luobu:true}))
       

            } 
            if (likeid==='baicai') {
                this.setState((prevState,props)=>({like2:'不喜欢',baicai:true}))

            } 
            if (likeid==='fanqie') {
                this.setState((prevState,props)=>({like3:'不喜欢',fanqie:true}))
           
            } 
           

        } else {
            
            s.delete(likename)
            likename=''   
            if(s!==null && s.size!==0){
                for (let item of s.keys()) {
                    likename+=item
                  }
                this.setState((prevState,props)=>({food:likename})) 
            }else{
                this.setState((prevState,props)=>({food:this.props.defaultFood})) 
            }  
            if (likeid==='luobu') {
                this.setState((prevState,props)=>({like1:'喜欢',luobu:false}))
          
            } 
            if (likeid==='baicai') {
                this.setState((prevState,props)=>({like2:'喜欢',baicai:false}))
            } 
            if (likeid==='fanqie') {
                this.setState((prevState,props)=>({like3:'喜欢',fanqie:false}))
            }     
                        
            
        }
       
       
    } 
  

   render(){
    return(
        <div>

            <h1>{this.state.food===this.state.defaultFood?this.state.defaultFood:`${this.state.best}${this.state.food }`}</h1>
           <span>萝卜</span> <input type="button" id="luobu" name='萝卜' onClick={this.switchFood1} value={this.state.like1}/>
                    < button id="萝卜"name='萝卜' disabled={this.state.luobu} onClick={this.switchBestFood}>最喜欢</button>
            <span>白菜</span> <input type="button" id="baicai" name='白菜' onClick={this.switchFood1} value={this.state.like2}/>
                    <button id="白菜"name='白菜' disabled={this.state.baicai}onClick={this.switchBestFood}>最喜欢</button>
            <span>番茄</span> <input type="button" id="fanqie" name='番茄' onClick={this.switchFood1} value={this.state.like3}/>
                    <button id="番茄"name='番茄'disabled={this.state.fanqie}onClick={this.switchBestFood}>最喜欢</button>
        </div>
    );
   } 
}

const App=(props,context)=>{
    return(
        <div>
            <Greeting defaultFood={'三种蔬菜菜我都不喜欢'}/>
        </div>
    )
}
ReactDOM.render(<App/>,document.getElementById('root'));