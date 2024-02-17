import React, { ChangeEvent, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { isDisabled } from '@testing-library/user-event/dist/utils';

type counterStateType = {
  min: number | string,
  max: number | string,
  curNum: number
}

function App() {
  const initialText = 'Set different min and max'
  const txtMaxMoreMin = 'Max cannot be less than minimum. Increase minimum or decrease maximum'
  const txtMinMoreMax = 'Min cannot be more than maximum. Increase maximum or decrease minimum'

  const [error, setError] = useState<string>('')

  const [counterState, setCounterState] = useState<counterStateType>({
    min: '',
    max: '',
    curNum: 0,
  })

  const min = counterState.min
  const max = counterState.max

  const onChangeMaxHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const maxVal = Number(e.currentTarget.value)
    setCounterState({ ...counterState, max: maxVal })
  }
  const onChangeMinHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const minVal = Number(e.currentTarget.value)
    setCounterState({ ...counterState, min: minVal })
  }

  const onClickIncHandler = () => {
    const numMin = Number(counterState.min)
    const numMax = Number(counterState.max)
    let minInc = numMin + 1
    if (minInc >= numMax) {
      setError(txtMinMoreMax)
    } else if (counterState.max <= counterState.min) {
      setError(txtMaxMoreMin)
    } else {
      setCounterState({ ...counterState, min: minInc })
    }
  }

  const onClickResetHandler = () => {
    setCounterState({ ...counterState, min: 0 }) // Потом прикрутить сюда значения из LS
  }
  return (
    <div className="App">
      <div className={'window'}>
        <div className={'setField'}>
          <div className={'inputField'}>
            <span className={'setMax'}>maximum</span>
            <input type='number' value={max} onChange={onChangeMaxHandler} />
            <span className={'setMin'}>minimum</span>
            <input type='number' value={min} onChange={onChangeMinHandler} min={'0'} disabled={min >= max} />
          </div>
          <button disabled={!!error}>set</button>
        </div>

        <div className={'numberField'}>
          {counterState.min === '' || error
            ? <p>{initialText}</p>
            : <p>{counterState.curNum}</p>}
          <button onClick={onClickIncHandler} disabled={min >= max}>inc</button>
          <button onClick={onClickResetHandler}>reset</button>
        </div>
      </div>
    </div>
  );
}

export default App;
