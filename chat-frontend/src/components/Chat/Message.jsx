import React from "react"

const Message = (props) => {
  return (
    <p
      key={props.index}
      className={"conversation__msg conversation__msg--" + props.msgClass}
    >
      {props.text}
    </p>
  )
}

export default Message
