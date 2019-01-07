import {store} from '../../reducers/index';
export const CHANGE_TASK_ORDER = "CHANGE_TASK_ORDER",
                        UPDATE_CHECK = "UPDATE_CHECK";

                        
//This is for moving elements around in task array
Array.prototype.move = function (from, to) {
    if (from === 0 && to < 0) return this;
    this.splice(to, 0, this.splice(from, 1)[0]);
};

export const updateValue = (oldVal, newVal) => {
    const newTaskList = store.getState().generalReducer.tasks;

    for (let i in newTaskList){
        if (newTaskList[i].value === oldVal){
            newTaskList[i].value = newVal
            break;
        }
    }
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

export const checkItem = (val) => {
    const newTaskList = store.getState().generalReducer.tasks;
    console.log(val);
    for (let i in newTaskList){
        if (newTaskList[i].value === val){
            newTaskList[i].checked = !newTaskList[i].checked
            break;
        }
    }
    return {
        type: CHANGE_TASK_ORDER,
        newTaskList
    }
}