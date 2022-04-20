import React from "react"

import Message from "./Message.jsx"

import { resetChatPosition } from "../../utils/utils.mjs"

const generateConvDisplay = (conversation, user) => {
  return conversation.map((msg, index) => {
    const isUser = msg.user._id === user
    const msgClass = isUser ? "self" : "other"
    return (
      <Message
        key={index}
        index={index}
        text={msg.message}
        msgClass={msgClass}
      />
    )
  })
}

function Chat(props) {
  React.useEffect(() => {
    resetChatPosition()
  }, [props.chat.length])
  return (
    <div className="conversation">
      {generateConvDisplay(props.chat, props.user)}
    </div>
  )
}

export default Chat
