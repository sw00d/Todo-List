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
const getListStyle = (isDraggingOver) => {
  console.log(isDraggingOver)
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
      moveDisable: false
    }
    
    this.checkItem = this.checkItem.bind(this);
  }
    onDragEnd = (result) => {
        // the only one that is required
        console.log(this.props.tasks, result.source.index, result.destination.index);
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
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                      {text}
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
