import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {isDisabled} from '@testing-library/user-event/dist/utils';
import {stringify} from "node:querystring";
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType, store} from "./redux/store";
import {counterReducer, getFromLSAC, incAC, resetAC, setMaxAC, setMinAC} from "./redux/counterReducer";
import {loadState, saveState} from "./redux/localStorage";

export type counterStateType = {
  min: number | string,
  max: number | string,
}

function App() {
  let counterState = useSelector<RootReducerType, counterStateType>(state => state.counterReducer)

  useEffect(() => {
    try {
      dispatch(getFromLSAC(loadState()))
    } catch (err) {
      return undefined
    }
  }, [])

  useEffect(() => {
    if (Number(counterState.max) < 0) {
      setError('Max should be more than 0')
    } else {
      setError('')
    }
  }, [counterState.max]);
  useEffect(() => {
    if (Number(counterState.min) < 0) {
      setError('Set min more than 0')
    }else {
      setError('')
    }
  }, [counterState.min]);

  useEffect(() => {
    if (Number(counterState.max) < Number(counterState.min)){
      setError('Max should be more than min')
    } else {
      setError('')
    }
  }, [counterState.max, counterState.min]);

  const dispatch = useDispatch()
  const [error, setError] = useState<string>('')

  const onChangeMaxHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setMaxAC(e))
  }
  const onChangeMinHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setMinAC(e))
  }
  const onClickIncHandler = () => {
    dispatch(incAC())
  }

  const onClickResetHandler = () => {
    dispatch(resetAC())
  }

  const setToLS = () => {
    saveState(counterState)
  }

  return (
    <div className="App">
      <div className={'window'}>
        <div className={'setField'}>
          <div className={'inputField'}>

            <p className={'setMax'}>maximum</p>
            <input value={counterState.max} onChange={onChangeMaxHandler} placeholder='Fill max value'
              // min='0'
                   type='text'
            />
            <p className={'setMin'}>minimum</p>
            <input value={counterState.min} onChange={onChangeMinHandler} placeholder='Fill min value'
              // min='0' max={max}
            />

          </div>
          <button disabled={(counterState.min) >= (counterState.max)} onClick={setToLS}>set</button>
        </div>

        <div className={'numberField'}>
          <div>{error}</div>
          <div>
            <button onClick={onClickIncHandler} disabled={(counterState.min) >= (counterState.max)}>inc</button>
            <button onClick={onClickResetHandler}>reset</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
