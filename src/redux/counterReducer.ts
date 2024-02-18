import {counterStateType} from "../App";
import {ChangeEvent} from "react";
import {loadState} from "./localStorage";

let initialState: counterStateType = {
  min: '',
  max: '',
}

export const counterReducer = (state: counterStateType = initialState, action : MutualType): counterStateType => {
  switch (action.type){
    case 'INC' : {
      // Number(counterState.min) + 1
      return {...state, min: ((Number(state.min) + 1)).toString()}
    }
    case 'MIN': {
      return {...state, min: action.e.currentTarget.value}
    }
    case 'MAX': {
      return {...state, max: action.e.currentTarget.value}
    }
    case 'RESET': {
      return {...state, min: '', max: ''}
    }
    case "GET-FROM-LS": {
      return {...state, min: action.obj.min, max: action.obj.max }
    }
    default : return state
  }
}

export type MutualType = IncACType | SetMinAC | SetMaxAC | ResetAC | GetFromLSAC

export type IncACType = ReturnType<typeof incAC>

export const incAC = () => {
  return {
    type: 'INC',
  } as const
}

export type SetMinAC = ReturnType<typeof setMinAC>

export const setMinAC = (e: ChangeEvent<HTMLInputElement>) => {
  return {
    type: 'MIN',
    e
  } as const
}

export type SetMaxAC = ReturnType<typeof setMaxAC>

export const setMaxAC = (e: ChangeEvent<HTMLInputElement>) => {
  return {
    type: 'MAX',
    e
  } as const
}

export type ResetAC = ReturnType<typeof resetAC>

export const resetAC = () => {
  return {
    type: 'RESET',
  } as const
}

export type GetFromLSAC = ReturnType<typeof getFromLSAC>

export const getFromLSAC = (obj: counterStateType) => {
  return{
    type: 'GET-FROM-LS',
    obj
  } as const
}
