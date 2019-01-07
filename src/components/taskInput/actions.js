
export const ADD_TASK = "ADD_TASK";


export const addTask = (newTask) => {
    const task = {value: newTask, checked: false};
    return {
        type: ADD_TASK,
        task
    }
}