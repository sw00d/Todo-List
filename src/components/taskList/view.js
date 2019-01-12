import React, { Component } from 'react';
import Style from './style.css';
import CheckBoxStyle from './CheckBoxStyle.css';
import Input from '../taskInput';
import { FaAngleDown, FaAngleUp, FaTextHeight } from 'react-icons/fa';
import { Droppable, Draggable, DragDropContext } from 'react-beautiful-dnd';

const getItemStyle = (draggableStyle, isDragging) => ({
  background: isDragging ? 'transparent' : 'grey',
  ...draggableStyle
});
const getListStyle = (isDraggingOver) => {
  return {
    background: isDraggingOver ? 'lightblue' : 'transparent',
  }
};



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
      dragToMove(result.source.index, result.destination.index);
    };
    //This disables buttons by checking if any inputs are checked
    handleKeyPress(e){
      const { value } = e.target;
      if (e.keyCode === 13 && value.length) {
        this.setState({edit: false});
        return;
      }
      // if (this.input.current) console.log(this.input.current);
      if (e.keyCode === 8) this.props.updateValue(value, value.substring(0, value.length-1));
      else if (e.keyCode >= 65 && e.keyCode <= 90) this.props.updateValue(value, value+e.key);
    }


    render() {
      const { tasks, down, up, checkItem } = this.props;
      const { moveDisable } = this.state;
      return (
        <DragDropContext onDragEnd={this.onDragEnd}>

          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                class="MainContainer"
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
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
                          <span className="checkmark" onClick={(e)=>checkItem(item.value)}></span>
                        </div>
                          <input onKeyDown={(e)=>this.handleKeyPress(e)} value={item.value} type="text" />                        
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
                    )}
                  </Draggable>

                ))}
              <div className="Row"><Input /></div>
              </div>
            )}
          </Droppable>
        </DragDropContext>


      );
    }
  }
  // <div className="checkContainer">
  //   <input className="CheckBox" type="checkbox" />
  //   <span className="checkmark" onClick={(e)=>this.checkItem(e)}></span>
  // </div>
  // <input placeholder={text} type="text" />
  // <div className="ArrowContainer">
  //   <button disabled={ moveDisable } onClick={(e)=>
  //   {
  //     up(i); 
  //     e.stopPropagation()
  //     }
  //   }><FaAngleUp /></button>

  //   <button disabled={ moveDisable } onClick={(e)=>
  //   {
  //     down(i) 
  //     e.stopPropagation()
  //     }
  //   }><FaAngleDown /></button>
  // </div>
