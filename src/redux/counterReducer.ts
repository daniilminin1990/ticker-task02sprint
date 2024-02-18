import {counterStateType} from "../App";

export const counterReducer = (state: counterStateType, action : any) => {
  switch (action.type){
    case 'ADD' : {
      // Number(counterState.min) + 1
      return {...state, }
    }
    default : return state
  }
}

export const incAC = (min: number | string ) => {
  return {
    type: 'INC',
    min,
  }
}