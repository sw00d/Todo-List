import { ADD_TASK, INPUT_UPDATE } from "../components/taskInput/actions"
import { CHANGE_TASK_ORDER } from "../components/taskList/actions"


export default (
  state = { tasks:[], inputVal: 0 }, 
  action
  ) => {

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
    case INPUT_UPDATE:
      const {newInputVal} = action;
      return {
        ...state,
          inputVal: newInputVal
      }

    default:
      return state
  }
}
