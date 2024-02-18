import App, {counterStateType} from "../App";
import {createStore} from "redux";
import {useSelector} from "react-redux";
import {RootReducer, RootReducerType} from "./store";

export const saveState = (state: counterStateType) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch {
    // ignore write errors
  }
};

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

// const persistedState = loadState();
// const store = createStore(
//   RootReducer,
//   persistedState
// );
// store.subscribe(() => {
//   saveState({
//     // state: store.getState()
//     min: store.getState().counterReducer.min as string | number,
//     max: store.getState().counterReducer.max as string | number,
//   });
// });