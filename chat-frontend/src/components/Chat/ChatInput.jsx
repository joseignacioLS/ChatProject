import React from "react"

const sendMsg = (addMsgToConver, msg, setInputMsg) => {
  if (msg !== "") {
    addMsgToConver(msg)
    setInputMsg("")
  }
}

const manageKeyDown = (addMsgToConver, msg, setInputMsg) => {
  return (e) => {
    if (e.key === "Enter") sendMsg(addMsgToConver, msg, setInputMsg)
  }
}
function ConversationInput(props) {
  let [inputMsg, setInputMsg] = React.useState("")
  const manageInput = (event) => {
    setInputMsg(event.target.value)
  }

  return (
    <div className="input-area">
      <input
       autoComplete="off"
        id="input-area__msg-field"
        type="text"
        onKeyDown={manageKeyDown(props.addMsgToConver, inputMsg, setInputMsg)}
        onInput={manageInput}
        value={inputMsg}
        maxLength={64}
        placeholder="..."
      ></input>
      <button
        id="input-area__send-btn"
        onClick={() => sendMsg(props.addMsgToConver, inputMsg, setInputMsg)}
      >
        <img src="./icons/send.png"></img>
      </button>
    </div>
  )
}

export default ConversationInput
