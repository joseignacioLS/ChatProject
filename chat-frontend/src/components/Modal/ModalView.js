import React from "react"

const closeSelf = (setModal) => {
  return () => {
    setModal({
      message: "",
      visible: false,
    })
  }
}
const Modal = (props) => {
  return (
    <div className="modal">
      <div className="modal__message">
      <img src="./icons/error.png"></img>
        <span>{props.message}</span>

        <button className="modal__btn" onClick={closeSelf(props.setModal)}>
          Ok
        </button>
      </div>
    </div>
  )
}

export default Modal
