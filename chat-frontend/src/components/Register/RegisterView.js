import React from "react"
import { useNavigate } from "react-router-dom"

import { Link } from "react-router-dom"

import { registerUser } from "../../utils/api.mjs"

const checkPassword = (password) => {
  return password.length > 3
}

const manageSend = (user, nick, setUserData, navigation, setModal) => {
  return async (e) => {
    //evito el default del form
    e.preventDefault()

    //recupero la password introducida
    const password = document.querySelector("#input-password").value

    //hago un check para comprobar la password, si falla lanzo
    //un error en el modal
    if (!checkPassword(password))
      return setModal({ message: "Password too short", visible: true })

    console.log("hey!")
    const userId = await registerUser(user, nick, password)
    console.log(userId)

    if (userId) {
      setUserData({ from: userId, to: "" })
      navigation("/chat-list")
    } else setModal({ message: "An error ocurred", visible: true })
  }
}

const manageKeyDown = (user, nick, setUserData, navigation, setModal) => {
  //reproduzco el pulsado del boton enviar cuando se pulsa enter
  return (e) => {
    if (e.key === "Enter") {
      manageSend(user, nick, setUserData, navigation, setModal)()
    }
  }
}

const manageInput = (setFunction) => {
  //gestiono los campos de inputs con hooks
  return (e) => {
    setFunction(e.target.value)
  }
}
const Login = (props) => {
  let navigation = useNavigate()

  let [user, setUser] = React.useState("")
  let [nick, setNick] = React.useState("")

  return (
    <>
      <form className="form">
        <label htmlFor="input-from" className="form__label">
          User
        </label>
        <input
          autoComplete="off"
          id="input-from"
          onInput={manageInput(setUser)}
          className="form__input"
          type="text"
          value={user}
          onKeyDown={manageKeyDown(
            user,
            nick,
            props.setUserData,
            navigation,
            props.setModal
          )}
        ></input>
        <label htmlFor="input-nick" className="form__label">
          Nick
        </label>
        <input
          autoComplete="off"
          id="input-nick"
          onInput={manageInput(setNick)}
          className="form__input"
          type="text"
          value={nick}
          onKeyDown={manageKeyDown(
            user,
            nick,
            props.setUserData,
            navigation,
            props.setModal
          )}
        ></input>
        <label htmlFor="input-password" className="form__label">
          Password
        </label>
        <input
          autoComplete="off"
          id="input-password"
          className="form__input"
          type="password"
          onKeyDown={manageKeyDown(
            user,
            nick,
            props.setUserData,
            navigation,
            props.setModal
          )}
        ></input>
        <button
          id="login-btn"
          className="form__btn"
          onClick={manageSend(
            user,
            nick,
            props.setUserData,
            navigation,
            props.setModal
          )}
        >
          Register
        </button>
      </form>
      <Link to="/" className="link-container">
        <span className="link">Login</span>
      </Link>
    </>
  )
}

export default Login
