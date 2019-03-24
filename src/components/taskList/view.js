import React, { Component } from 'react';
import Style from './style.css';
import CheckBoxStyle from './CheckBoxStyle.css';
import Input from '../taskInput';
import { FaAngleDown, FaAngleUp, FaTrashAlt } from 'react-icons/fa';
import { Droppable, Draggable, DragDropContext } from 'react-beautiful-dnd';


export default class List extends Component {
  constructor(){
    super();
    this.state = {
      moveDisable: false,
      width: 10
    }    
    this.input = React.createRef();
    this.getWidth = this.getWidth.bind();
  }
    onDragEnd = (result) => {
      // the only one that is required
      const { dragToMove } = this.props;
      console.log(result.source)
      if (result.source && result.destination) dragToMove(result.source.index, result.destination.index);
    };
    //This disables buttons by checking if any inputs are checked
    handleKeyPress(e, i){
      const { tasks, updateValue } = this.props;
      const { value } = e.target;
      if (e.keyCode === 8) updateValue(i, value.substring(0, value.length-1));
      else if (
        (e.keyCode >= 65 && 
        e.keyCode <= 90) ||
        e.keyCode === 32) {
          updateValue(i, value+e.key);
        }
    }

    getWidth(val){
      if (val){
        if (val.length < 9)return 100;
        else if (val.length < 43) return val.length*12;
        else return 500;
      } else return 100;
    }

    deleteTask(i){
      const { deleteTask } = this.props;
      deleteTask(i);
      this.props.decrementInput();

    }

    render() {
      const { tasks, down, up, checkItem, deleteTask } = this.props;
      const { width, moveDisable } = this.state;
      return (
        <DragDropContext onDragEnd={this.onDragEnd}>

          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
              className="MainContainer"
              ref={provided.innerRef}
              >

                {tasks.map((item, i) => (
                  
                  <Draggable
                  key={i}
                  index={i}
                  draggableId={i+1}
                  >
                    {(provided, snapshot) => (
                      <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}  
                      className="Row"
                      >

                        <div className="checkContainer">
                          <input
                            ref={this.input} 
                            className="CheckBox" 
                            type="checkbox" 
                            checked={item.checked} 
                            onChange={()=>console.log("change")}
                          />
                          <span className="checkmark" onClick={()=>checkItem(i)}></span>
                          <div 
                            className="TrashCan"
                            onClick={()=>this.deleteTask(i)}
                          ><FaTrashAlt color="#DDD464"/></div>
                        </div>
                          <input
                            onChange={()=>{}}
                            onKeyDown={(e)=>this.handleKeyPress(e, i)} 
                            value={item.value} 
                            type="text" 
                            style={{
                              /*This calculates width of given input 
                              based on length of the input's value
                              */
                             width: this.getWidth(item.value)
                            }}
                          />                        
                        <div className="ArrowContainer">
                          <div>
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
                       </div>
                    )}
                  </Draggable>

                ))}
              <Input />
              </div>
            )}
          </Droppable>
        </DragDropContext>


      );
    }
  }
