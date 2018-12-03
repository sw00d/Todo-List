import {store} from '../../reducers/index';
export const CHANGE_TASK_ORDER = "CHANGE_TASK_ORDER";


//This is for moving elements around in task array
Array.prototype.move = function (from, to) {
    if (from === 0 && to < 0) return this;
    this.splice(to, 0, this.splice(from, 1)[0]);
  };


export const moveUp = (index) =>{
    const newTaskList = store.getState().generalReducer.tasks;
    newTaskList.move(index, index-1);
    return {
        type: CHANGE_TASK_ORDER,
        newTaskList
    };
}

export const moveDown = (index) => {
    const newTaskList = store.getState().generalReducer.tasks;
    newTaskList.move(index, index+1);
    return {
        type: CHANGE_TASK_ORDER,
        newTaskList
    };
}