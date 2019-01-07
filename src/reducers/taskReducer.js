import { ADD_TASK } from "../components/taskInput/actions"
import { CHANGE_TASK_ORDER } from "../components/taskList/actions"


export default (state = {
  tasks:[
    {value: 'one', checked: false}, {value: 'two', checked: false}, {value: 'three', checked: false}, {value: 'four', checked: false}]
  }
  , action) => {
  switch(action.type){

    case CHANGE_TASK_ORDER:
      const {newTaskList} = action;
      return {
        ...state, 
        tasks: [...newTaskList]
      }

    case ADD_TASK:
      const {task} = action;
      return {
        ...state, 
        tasks: state.tasks.concat(task)
      }

    default:
      return state
  }
}
