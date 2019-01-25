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
    }    
    this.input = React.createRef();

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
        e.keyCode >= 65 && 
        e.keyCode <= 90 &&
        value.length < 2000) updateValue(i, value+e.key);
    }


    render() {
      const { tasks, down, up, checkItem, deleteTask } = this.props;
      const { moveDisable } = this.state;
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
                            onClick={()=>deleteTask(i)}
                          ><FaTrashAlt color="#DDD464"/></div>
                        </div>
                          <input
                            maxLength="5"
                            onChange={()=>{}}
                            onKeyDown={(e)=>this.handleKeyPress(e, i)} 
                            value={item.value} 
                            type="text" 
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
              <div className="Row TaskRow"><Input /></div>
              </div>
            )}
          </Droppable>
        </DragDropContext>


      );
    }
  }
