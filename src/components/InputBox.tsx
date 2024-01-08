import React from 'react'

type InputBoxPropsType = {
  value: number;
  maxValue: number;
}

const InputBox: React.FC<InputBoxPropsType> = (props) => {
  return (
    <div style={props.value >= props.maxValue ? { color: 'red' } : { color: 'inherit' }}>
      <span>{props.value}</span>
    </div>
  )
}

export default InputBox