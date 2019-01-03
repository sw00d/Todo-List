import React, { Component } from 'react';
import { GoPlus } from 'react-icons/go';

class Input extends Component {
  constructor(){
    super();
    this.state = {
      task: ''
    }
    this.addTask = this.addTask.bind(this);
  }

  handleKeyPress = (e) => {
    if(e.key === 'Enter'){
      this.addTask(e.target.value);
    }
  }

  addTask = (e) =>{
    const {addTask} = this.props;
    const { task } = this.state;
    if (task.length) addTask(task);
    this.setState({task: ''});
  }

  render() {
    return (
      <div className="InputContainer">
        <div className="checkContainer TaskInputContainer">
          <input 
            className="TaskInput"
            onKeyPress={this.handleKeyPress} 
            onChange={(e)=>this.setState({task: e.target.value})} 
            placeholder="Enter task to add"
            value = {this.state.task}
            />
        </div>
        <div className="AddTaskContainer">
          <GoPlus className="AddBtn" onClick={this.addTask} />
        </div>

      </div>
    );
  }
}

export default Input;


  