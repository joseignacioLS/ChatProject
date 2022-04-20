import React from "react"

import { useNavigate } from "react-router-dom"

import Chat from "./Chat"
import ConversationInput from "./ChatInput"

import { resetChatPosition } from "../../utils/utils.mjs"
import {
  sendMessage,
  setMessagesAsRead,
  getUserNick,
} from "../../utils/api.mjs"

const navigateBack = (navigation, userData, setUserData) => {
  //marca todos los mensajes como leidos, eliminar la seleccion de to
  //y vuelve a la vista de lista
  return () => {
    setMessagesAsRead(userData.from, userData.to)
    setUserData({ ...userData, to: "" })
    navigation("/chat-list")
  }
}

const generateHeader = (nick, userData, setUserData, navigation) => {
  //header de la pagina
  return (
    <header>
      <button
        className="btn-back"
        onClick={navigateBack(navigation, userData, setUserData)}
      >
        <img src="./icons/arrow-back.png"></img>
      </button>
      <h1>{nick}</h1>
    </header>
  )
}

const updateNick = async (setNick, user) => {
  setNick(await getUserNick(user))
}

function ChatView(props) {
  let [nick, setNick] = React.useState("")
  const navigation = useNavigate()

  React.useEffect(() => {
    updateNick(setNick, props.userData.to)

    //si no hay ningun usuario seleccionado vuelvo al login
    //si lo hay comienzo las llamadas a la api
    if (props.userData.from === "") {
      navigation("/")
    }
    window.addEventListener("resize", () => {
      resetChatPosition()
    })
  }, [props.userData, navigation])
  return (
    <>
      {generateHeader(nick, props.userData, props.setUserData, navigation)}
      <Chat user={props.userData.from} chat={props.chat} />
      <ConversationInput
        addMsgToConver={sendMessage(props.userData.from, props.userData.to)}
      />
    </>
  )
}

export default ChatView
