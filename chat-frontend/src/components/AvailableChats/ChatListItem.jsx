import React from "react"
import { useNavigate } from "react-router-dom"

import { setMessagesAsRead } from "../../utils/api.mjs"

const openConversation = (userData, setUserData, navigation) => {
  return async (e) => {
    const to = e.target.attributes.getNamedItem("data-user").value
    setUserData({ ...userData, to: to })
    setMessagesAsRead(userData.from, to)
    navigation("/chat")
  }
}

const ChatListItem = (props) => {
  const navigation = useNavigate()
  return (
    <li key={props.index}>
      {" "}
      <span
        className={props.read ? "unread" : ""}
        onClick={openConversation(
          props.userData,
          props.setUserData,
          navigation
        )}
        data-user={props.user}
      >
        {props.to}
      </span>
      <span
        className="delete-btn"
        onClick={props.deleteConversation(props.from, props.user)}
      >
        <img src="./icons/x.png"></img>
      </span>
    </li>
  )
}

export default ChatListItem
