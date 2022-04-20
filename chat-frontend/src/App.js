import React from "react"
import { Routes, Route } from "react-router-dom"

import Login from "./components/Login/LoginView"
import Register from "./components/Register/RegisterView"
import ChatView from "./components/Chat/ChatView"
import AvailableChats from "./components/AvailableChats/AvailableChatsView"
import Modal from "./components/Modal/ModalView"
import { clearAllIntervals } from "./utils/utils.mjs"
import { getAvailableUsers, getChat } from "./utils/api.mjs"

const startChatInterval = (userData, setChat, setLoaded, refreshInterval) => {
  setInterval(async () => {
    const newChat = await getChat(userData.from, userData.to)
    setChat(newChat)
    setLoaded([false, true])
  }, refreshInterval)
}

const startChatListInterval = (
  userData,
  setChatList,
  setLoaded,
  refreshInterval
) => {
  setInterval(async () => {
    setChatList(await getAvailableUsers(userData.from))
    setLoaded([true, false])
  }, refreshInterval)
}
const App = () => {
  let [userData, setUserData] = React.useState({ from: "", to: "" })

  let [modal, setModal] = React.useState({
    message: "",
    visible: false,
  })

  let [loaded, setLoaded] = React.useState([false,false])

  let [chat, setChat] = React.useState([])
  let [chatList, setChatList] = React.useState([])

  const refreshInterval = 1000

  React.useEffect(() => {
    clearAllIntervals()
    setChatList([])
    setChat([])
    setLoaded([false,false])
    if (userData.to !== "") {
      startChatInterval(userData, setChat, setLoaded, refreshInterval)
    } else if (userData.from !== "") {
      startChatListInterval(userData, setChatList, setLoaded, refreshInterval)
    }
    else {
      setLoaded([true, true])
    }
  }, [userData])

  return (
    <>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Login
              userData={userData}
              setUserData={setUserData}
              modal={modal}
              setModal={setModal}
            />
          }
        ></Route>
        <Route
          exact
          path="/register"
          element={
            <Register
              userData={userData}
              setUserData={setUserData}
              modal={modal}
              setModal={setModal}
            />
          }
        ></Route>
        <Route
          exact
          path="/chat-list"
          element={
            <AvailableChats
              userData={userData}
              setUserData={setUserData}
              refreshInterval={refreshInterval}
              modal={modal}
              setModal={setModal}
              chatList={chatList}
              setChatList={setChatList}
            />
          }
        ></Route>
        <Route
          exact
          path="/chat"
          element={
            <ChatView
              userData={userData}
              setUserData={setUserData}
              refreshInterval={refreshInterval}
              modal={modal}
              setModal={setModal}
              chat={chat}
              setChat={setChat}
            />
          }
        ></Route>
      </Routes>
      {((!loaded[0] && userData.to === "") || (!loaded[1] && userData.to !== "")) && <div className="loader"></div>}
      {modal.visible && (
        <Modal
          message={modal.message}
          visible={modal.visible}
          setModal={setModal}
        />
      )}
    </>
  )
}

export default App
