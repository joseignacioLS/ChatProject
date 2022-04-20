import React from "react"

import { useNavigate } from "react-router-dom"
import { getUserNick } from "../../utils/api.mjs"

import ChatList from "./ChatList.jsx"
import NewChat from "./NewChat.jsx"

const AvailableChats = (props) => {
  const navigation = useNavigate()

  const [nick, setNick] = React.useState("")

  React.useEffect(() => {
    if (props.userData.from === "") {
      navigation("/")
    }
    const updateNick = async () => {
      setNick(await getUserNick(props.userData.from))
    }
    updateNick()
  }, [props.userData, navigation])

  return (
    <>
      <header>
        <h1>{nick}</h1>
      </header>
      <NewChat
        userData={props.userData}
        setUserData={props.setUserData}
        navigation={navigation}
        setModal={props.setModal}
      />
      <ChatList
        from={props.userData.from}
        chatList={props.chatList}
        userData={props.userData}
        setUserData={props.setUserData}
      />
    </>
  )
}

export default AvailableChats
