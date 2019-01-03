import React, { Component } from 'react';
import Style from './style.css';
import CheckBoxStyle from './CheckBoxStyle.css';
import Input from '../taskInput';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
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
const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  padding: grid,
  width: 250
});



export default class List extends Component {
  constructor(){
    super();
    this.state = {
      moveDisable: false
    }
    
    this.checkItem = this.checkItem.bind(this);
  }
    onDragEnd = () => {
        // the only one that is required
        console.log("hello")
      };

    //This disables buttons by checking if any inputs are checked
    checkItem(e) {
      const el = e.target.parentElement.parentElement.parentElement;
      e.target.parentElement.children[0].checked = !e.target.parentElement.children[0].checked;
      let bool;
      
      // //checkbox always has to be first element in <li>
      for (let i = 0; i < el.children.length; i++){
        const checked = el.children[i].children[0].children[0].checked;
        if (checked){
          bool = true;
          break;
        } else bool = false;
      }
      // console.log(bool)
      this.setState({moveDisable: bool});
    }

    render() {
      const {tasks, down, up} = this.props;
      const {moveDisable} = this.state;
      return (
        <DragDropContext onDragEnd={this.onDragEnd}>

        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {tasks.map((text, i) => (
                <Draggable
                  key={i}
                  index={i}
                  draggableId={i+1}
                >
                  {(provided, snapshot) => (
                    <div>
                      <div
                        ref={provided.innerRef}
                        style={getItemStyle(
                          provided.draggableProps.style,
                          snapshot.isDragging
                        )}
                        {...provided.dragHandleProps}
                      >
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
                      {provided.placeholder}
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

  //<Task 
  //   checkItem={this.checkItem} 
  //   key={i} 
  //   text={text} 
  //   i={i} 
  //   props={this.props} 
  //   moveDisable={this.state.moveDisable}
  // />


  // class Task extends Component {

  //   render() {
  //     const {down, up} = this.props.props;
  //     const {i, checkItem, moveDisable} = this.props;

  //     return (
  //       <Draggable draggableId="draggable-1"  draggable="draggable-1" index={0}>
  //         {(provided, snapshot) => (
  //           <div className="Row" ref={provided.innerRef} {...provided.draggableProps}>
              // <div className="checkContainer">
              //   <input className="CheckBox" type="checkbox" />
              //   <span className="checkmark" onClick={(e)=>checkItem(e)}></span>
              // </div>
              // <input placeholder={this.props.text} type="text" />
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
  //           </div>
  //         )}
  //       </Draggable>
  //     )
  //   }
  // }
  