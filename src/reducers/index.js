import { combineReducers, createStore, applyMiddleware } from 'redux';
import tasks from "./taskReducer";

const appReducer = combineReducers({
  generalReducer: tasks
});

const rootReducer = (state, action) => {
  return appReducer(state, action)
}

export const store = applyMiddleware()(createStore)(rootReducer);

