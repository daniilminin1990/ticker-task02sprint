import React from "react"

export type ButtonPropsType = {
  name: string;
  onClickHadnler: () => void
  isDisabled?: boolean
}

export const Button: React.FC<ButtonPropsType> = (props) => {

  return (
    <button onClick={props.onClickHadnler} disabled={props.isDisabled}>{props.name}</button>
  )
}