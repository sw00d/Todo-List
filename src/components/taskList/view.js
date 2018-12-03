import React, { Component } from 'react';
import Style from './style.css';
import CheckBoxStyle from './CheckBoxStyle.css';
import Input from '../taskInput';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';

export default class List extends Component {

    constructor(){
      super();
      this.state = {
        moveDisable: false
      }
    }

    //This disables buttons by checking if any inputs are checked
    check(e){
      // const ul = e.target.parentElement.parentElement.children;
      // let bool;
      // //checkbox always has to be first element in <li>
      // for (let i = 0; i < ul.length; i++){
      //   console.log(ul[i].children[0].children[0])
      //   if (ul[i].children[0].children[0].checked){
      //     bool = true;
      //     break;
      //   } else bool = false;
      // }
      // this.setState({moveDisable: bool});
    }
    render() {
      const {tasks, down, up} = this.props;
      const {moveDisable} = this.state;
      return (
        <ul>
        {
          tasks.map((text,i)=>
          {
            return (
              <li key={i}>
                <div className="checkContainer" onClick={(e)=>this.check(e)}>
                  <input className="CheckBox" type="checkbox" />
                  <span className="checkmark"></span>
                </div>
                <p>{text}</p>
                <div className="ArrowContainer">
                  <button disabled={ moveDisable } onClick={(e)=>
                  {
                    up(i); 
                    e.stopPropagation()
                    }
                  }><FaAngleUp /></button>

                  <button disabled={ moveDisable } onClick={(e)=>
                  {
                    down(i) 
                    e.stopPropagation()
                    }
                  }><FaAngleDown /></button>
                </div>
              </li>
            )
          })
        }
        <li><Input /></li>
        </ul>
      );
    }
  }
  