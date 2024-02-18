import React, {ChangeEvent, useRef, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import { isDisabled } from '@testing-library/user-event/dist/utils';
import {stringify} from "node:querystring";

export type counterStateType = {
  min: number | string,
  max: number | string,
}

function App() {
  const [error, setError] = useState<string>('')

  const [counterState, setCounterState] = useState<counterStateType>({
    min: '',
    max: '',
  })

  const onChangeMaxHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setCounterState({...counterState, max: e.target.value})
    console.log(counterState.max)
    counterState.max === '-' && setError('Set max > 0')
    if (counterState.max === '') {
      setError('Set max')
    }
    if (Number(counterState.max) <= 0 && (Number(counterState.max) <= Number(counterState.min))) {
      setError('You need to set correct max, it should be more than min')
    }
  }
  const onChangeMinHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setCounterState({ ...counterState, min: e.target.value })
    if (counterState.min === '' || counterState.min === '-') {
      setError('Set min > 0')
    }
    if (Number(counterState.min) > 0) {
      setError('')
    }
  }

  const onClickIncHandler = () => {
    if (Number(counterState.max) <= 0 && (Number(counterState.max) <= Number(counterState.min))) {
      setError('You need to set correct max, it should be more than min')
    }
    if (Number(counterState.min) < 0) {
      setError('Set min more than 0')
    } else {
      setCounterState({ ...counterState, min: Number(counterState.min) + 1 })
    }
  }

  const onClickResetHandler = () => {
    setCounterState({ ...counterState, min: '' , max: ''}) // Потом прикрутить сюда значения из LS
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
          <button disabled={(counterState.min) >= (counterState.max)}>set</button>
        </div>

        <div className={'numberField'}>
          {<div>{error ? error : counterState.min}</div>}
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
