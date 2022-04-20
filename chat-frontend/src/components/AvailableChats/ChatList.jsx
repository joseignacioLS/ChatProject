import React from "react"

import ChatListItem from "./ChatListItem"

import { deleteConversation } from "../../utils/api.mjs"

const sortConversationsByUnread = (chatList) => {
  //ordena las conversaciones primero las sin leer, luego el resto
  return chatList.sort((a, b) => {
    if (a[1] && b[1]) return 0
    if (a[1]) return -1
    if (b[1]) return 1
    return 0
  })
}

const ChatList = (props) => {
  return (
    <ul className="chat-list">
      {sortConversationsByUnread(props.chatList).map((ele, index) => {
        return (
        <ChatListItem
          key={index}
          index={index}
          deleteConversation={deleteConversation}
          userData={props.userData}
          setUserData={props.setUserData}
          from={props.from}
          to={ele[0][0]}
          user={ele[0][1]}
          read={ele[1]}
        />
      )
      })}
    </ul>
  )
}

export default ChatList
