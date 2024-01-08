import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from './components/Button';
import { isDisabled } from '@testing-library/user-event/dist/utils';
import InputBox from './components/InputBox';


function App() {

  const minValue: number = 0;
  const maxValue: number = 5

  // State для value
  const [value, setValue] = useState<number>(minValue)

  const increaseHandler = () => {
    if (value < maxValue) {
      setValue(value + 1)
    }
  }

  const resetHandler = () => {
    setValue(minValue)
  }


  return (
    <div className="App">
      <InputBox value={value} maxValue={maxValue} />
      <Button name={'+'} onClickHadnler={increaseHandler} isDisabled={value === maxValue} />
      <Button name={'reset'} onClickHadnler={resetHandler} isDisabled={value < minValue} />
    </div>
  );
}

export default App;
