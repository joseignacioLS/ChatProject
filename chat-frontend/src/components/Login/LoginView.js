import React from "react"

import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"

import { checkUser } from "../../utils/api.mjs"

const manageSend = (
  user,
  setUser,
  password,
  setPassword,
  setUserData,
  navigation,
  setModal
) => {
  return async (e) => {
    //evito el default del form
    e.preventDefault()

    //compruebo el estado del usuario
    const userId = await checkUser(user, password)

    console.log(userId)


    if (userId) {
      //si esta registrado hago login
      setUserData({ from: userId, to: "" })
      navigation("/chat-list")
    } else {
      //si no esta registrado o si la password es incorrecta
      //elimino la password y lanzo un modal de error
      setPassword("")
      setModal({
        message: "Login error",
        visible: true,
      })
    }
  }
}

const manageKeyDown = (
  user,
  setUser,
  password,
  setPassword,
  setUserData,
  navigation,
  setModal
) => {
  return (e) => {
    //reproduzco el boton de enviar cuando se pulsa enter
    if (e.key === "Enter") {
      manageSend(
        user,
        setUser,
        password,
        setPassword,
        setUserData,
        navigation,
        setModal
      )()
    }
  }
}

const manageInput = (setUser) => {
  //gestiono los inputs con hooks
  return (e) => {
    setUser(e.target.value)
  }
}

const Login = (props) => {
  let navigation = useNavigate()

  let [user, setUser] = React.useState("")
  let [password, setPassword] = React.useState("")

  return (
    <>
      <form className="form">
        <label
          htmlFor="input-from"
          id="input-from__label"
          className="form__label"
        >
          User
        </label>
        <input
         autoComplete="off"
          id="input-from"
          className="form__input"
          onInput={manageInput(setUser)}
          type="text"
          value={user}
          onKeyDown={manageKeyDown(
            user,
            setUser,
            password,
            setPassword,
            props.setUserData,
            navigation,
            props.setModal
          )}
        ></input>
        <label
          htmlFor="input-password"
          id="input-from__label"
          className="form__label"
        >
          Password
        </label>
        <input
         autoComplete="off"
          id="input-password"
          className="form__input"
          type="password"
          value={password}
          onInput={manageInput(setPassword)}
          onKeyDown={manageKeyDown(
            user,
            setUser,
            password,
            setPassword,
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
            setUser,
            password,
            setPassword,
            props.setUserData,
            navigation,
            props.setModal
          )}
        >
          Log In
        </button>
      </form>
      <Link to="/register" className="link-container"><span className="link">Register</span></Link>
    </>
  )
}

export default Login
