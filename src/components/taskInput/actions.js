import {store} from '../../reducers/index';

export const ADD_TASK = "ADD_TASK",
             INPUT_UPDATE = "INPUT_UPDATE";


export const addTask = (newTask) => {
    const task = { value: newTask, checked: false };
    return {
        type: ADD_TASK,
        task
    }
}

export const incrementInput = () => {
    const newInputVal = store.getState().generalReducer.inputVal+40;
    return {
        type: INPUT_UPDATE,
        newInputVal
    }
}


export const decrementInput = () => {
    const newInputVal = store.getState().generalReducer.inputVal-40;
    return {
        type: INPUT_UPDATE,
        newInputVal
    }
}