import React, { Component } from 'react';
import Style from './style.css';
import CheckBoxStyle from './CheckBoxStyle.css';
import Input from '../taskInput';
import { FaAngleDown, FaAngleUp, FaTextHeight } from 'react-icons/fa';
import { Droppable, Draggable, DragDropContext } from 'react-beautiful-dnd';

const reorder =  (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

// using some little inline style helpers to make the app look okay
const grid = 8;
const getItemStyle = (draggableStyle, isDragging) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 2,
  marginBottom: grid,

  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'grey',

  // styles we need to apply on draggables
  ...draggableStyle
});
const getListStyle = (isDraggingOver) => {
  return {
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: grid,
    width: 250
  }
};



export default class List extends Component {
  constructor(){
    super();
    this.state = {
      moveDisable: false,
      edit: false,
      dblclk: false
    }    
  }
    onDragEnd = (result) => {
      // the only one that is required
      const { dragToMove } = this.props;
      dragToMove(result.source.index, result.destination.index);
    };
    //This disables buttons by checking if any inputs are checked
    doubleClick() {
      const self = this;
      const { dblclk, edit } = this.state;
      console.log("FIRE");
      if (!dblclk) {
        this.setState({dblclk: true});
      } else {
        this.setState({edit: true});
      } 
      
      setTimeout(()=>self.setState({dblclk: false}), 500);
    }
    handleKeyPress(e){
      if (e.key === "Enter") {
        this.setState({edit: false});
      }
      if (e.target.value.length){
        this.props.updateValue(e.target.placeholder, e.target.value);
      }
    }

    render() {
      const { tasks, down, up, checkItem } = this.props;
      const { moveDisable, edit } = this.state;
      return (
        <DragDropContext onDragEnd={this.onDragEnd}>

          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
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
                            className="CheckBox" 
                            type="checkbox" 
                            checked={item.checked} 
                            onChange={()=>console.log("change")}
                          />
                          <span className="checkmark" onClick={(e)=>checkItem(item.value)}></span>
                        </div>
                        { edit ? 
                          <input onKeyPress={(e)=>this.handleKeyPress(e)} placeholder={item.value} type="text" />
                          : <div onClick={()=>this.doubleClick()}>{item.value}</div> 
                        }
                        
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
