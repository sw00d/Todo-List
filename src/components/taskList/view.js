import React, { Component } from 'react';
import Style from './style.css';
import CheckBoxStyle from './CheckBoxStyle.css';
import Input from '../taskInput';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { Droppable } from 'react-beautiful-dnd';

export default class List extends Component {
    constructor(){
      super();
      this.state = {
        moveDisable: false
      }
    }

    //This disables buttons by checking if any inputs are checked
    ifChecked(e){
      
    }

    checkItem(e) {
      const el = e.target.parentElement.parentElement.parentElement;
      e.target.parentElement.children[0].checked = !e.target.parentElement.children[0].checked;
      console.log(this);
      let bool;
      
      // //checkbox always has to be first element in <li>
      // for (let i = 0; i < el.children.length; i++){
      //   const checked = el.children[i].children[0].children[0].checked;
      //   if (checked){
      //     bool = true;
      //     break;
      //   } else bool = false;
      // }
      // this.setState({moveDisable: bool});
    }

    render() {
      const {tasks, down, up} = this.props;
      return (
        <div className="MainContainer">
         <Droppable droppableId="list">
          {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
            <div
              ref={provided.innerRef}
              style={{
                backgroundColor: provided.isDragging ? 'green' : 'lightblue',
              }}
              {...provided.droppableProps}
            >
              {
                tasks.map((text,i)=>
                {
                  return (
                  <Task 
                    checkItem={this.checkItem} 
                    key={i} 
                    text={text} 
                    i={i} 
                    props={this.props} 
                    moveDisable={this.state.moveDisable}
                  />
                  );
                })
              }
              <div className="Row"><Input /></div>
            </div>
          )}
        </Droppable>
        </div>
      );
    }
  }


  class Task extends Component {

    render() {
      const {down, up} = this.props.props;
      const {i, checkItem, moveDisable} = this.props;

      return (
        <div className="Row">
          <div className="checkContainer">
            <input className="CheckBox" type="checkbox" />
            <span className="checkmark" onClick={(e)=>checkItem(e)}></span>
          </div>
          <input placeholder={this.props.text} type="text" />
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
    }
  }
  