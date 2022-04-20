import React from "react"

import { getId } from "../../utils/api.mjs"
//import { startConversation } from "../../utils/api.mjs"

const startConversation = (
  inputValue,
  setInputValue,
  userData,
  setUserData,
  navigation,
  setModal
) => {
  return async (e) => {
    //recupero el input
    if (inputValue === "") {
      setModal({
        message: "Please, introduce an username",
        visible: true,
      })
      return
    }
    let to = await getId(inputValue)

    if (to === "User not found") {
      setModal({
        message: "User not found",
        visible: true,
      })
      setInputValue("")
    }
    else if (to === userData.from) {
      //lanzo un error si no esta registrado
      //o si trata de hablar consigo mismo
      setModal({
        message: "Not allowed",
        visible: true,
      })
      setInputValue("")
    } else {
      setUserData({ ...userData, to: to })
      navigation("/chat")
    }
  }
}

const manageInput = (setFunction) => {
  //gestiono los campos de inputs con hooks
  return (e) => {
    setFunction(e.target.value)
  }
}
const NewChat = (props) => {
  let [inputValue, setInputValue] = React.useState("")

  return (
    <div className="new-chat">
      <input
       autoComplete="off"
        id="new-chat__name"
        type="text"
        value={inputValue}
        onInput={manageInput(setInputValue)}
        placeholder="New conv!"
      ></input>
      <button
        id="new-chat__btn"
        onClick={startConversation(
          inputValue,
          setInputValue,
          props.userData,
          props.setUserData,
          props.navigation,
          props.setModal
        )}
      >
        <img src="./icons/plus.png"></img>
      </button>
    </div>
  )
}

export default NewChat
