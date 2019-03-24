import {store} from '../../reducers/index';
export const CHANGE_TASK_ORDER = "CHANGE_TASK_ORDER",
                        UPDATE_CHECK = "UPDATE_CHECK";

                        
//This is for moving elements around in task array
Array.prototype.move = function (from, to) {
    if (from === 0 && to < 0) return this;
    this.splice(to, 0, this.splice(from, 1)[0]);
};


//All Actions for handling tasks
export const updateValue = (i, newVal) => {
    const newTaskList = store.getState().generalReducer.tasks;
    newTaskList[i].value = newVal;
    return {
        type: CHANGE_TASK_ORDER,
        newTaskList
    }
}
export const dragToMove = (from, to) => {
    const newTaskList = store.getState().generalReducer.tasks;
    newTaskList.move(from, to);
    return {
        type: CHANGE_TASK_ORDER,
        newTaskList
    }
}
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

export const checkItem = (idx) => {
    const newTaskList = store.getState().generalReducer.tasks;
    newTaskList[idx].checked = !newTaskList[idx].checked;
    return {
        type: CHANGE_TASK_ORDER,
        newTaskList
    }
}

export const deleteTask = (idx) => {
    const newTaskList = store.getState().generalReducer.tasks;
    newTaskList.splice(idx,1);
    return {
        type: CHANGE_TASK_ORDER,
        newTaskList
    }
}