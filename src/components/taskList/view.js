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
    ifChecked(e){
      const ul = e.parentElement.parentElement.children;
      let bool;

      //checkbox always has to be first element in <li>
      for (let i = 0; i < ul.length; i++){
        const checked = ul[i].children[0].children[0].checked;

        if (checked){
          bool = true;
          break;
        } else bool = false;
      }
      this.setState({moveDisable: bool});
    }

    checkItem(e) {
      // console.log(e.target.parentElement)
      e.target.parentElement.children[0].checked = !e.target.parentElement.children[0].checked;
      this.ifChecked(e.target.parentElement);
    }
    render() {
      const {tasks, down, up} = this.props;
      const {moveDisable} = this.state;
      return (
        <div className="MainContainer">
        {
          tasks.map((text,i)=>
          {
            return (
              <div className="Row" key={i}>
                <div className="checkContainer">
                  <input className="CheckBox" type="checkbox" />
                  <span className="checkmark" onClick={(e)=>this.checkItem(e)}></span>
                </div>
                <input placeholder={text} type="text" />
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
              </div>
            )
          })
        }
        <div className="Row"><Input /></div>
        </div>
      );
    }
  }
  