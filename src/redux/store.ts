import {combineReducers, legacy_createStore} from "redux";
import {counterReducer} from "./counterReducer";

export const RootReducer = combineReducers({
  counterReducer: counterReducer
})

export type RootReducerType = ReturnType<typeof RootReducer>
export const store = legacy_createStore(RootReducer)

