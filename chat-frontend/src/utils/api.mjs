
const serverUrl = process.env.REACT_APP_serverURL

const checkUser = async (user, password) => {
  try {
    const res = await fetch(`${serverUrl}/user/loginS`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ user, password }),
    })
    const data = await res.json()
    return data._id
  } catch (err) {
    console.log(err)
    return null
  }
}

const getId = async (user) => {
  try {
    const res = await fetch(`${serverUrl}/user/getId/${user}`)
    const data = await res.text()
    return data
  } catch (err) {
    console.log(err)
  }
}

const getUserNick = async (user) => {
  try {
    const res = await fetch(`${serverUrl}/user/nick/${user}`)
    const data = await res.json()
    return data.nick
  } catch (err) {
    console.log(err)
    return "error"
  }
}

const registerUser = async (user, nick, password) => {
  try {
    const res = await fetch(`${serverUrl}/user/registerS`, {
      method: "POST",
      body: JSON.stringify({ user, nick, password }),
      headers: {
        "Content-type": "application/json",
      },
    })
    const data = await res.json()
    if ("_id" in data) {
      return data._id
    }
    return false
  } catch (err) {
    console.log(err)
    return false
  }
}

const getAvailableUsers = async (from) => {
  try {
    //el formato de data es
    //[[<nick>,<user>], <isRead>]
    //el primer elemento representa al otro user, su nick y usuario
    //el segundo indica si hay algun mensaje sin leer
    const res = await fetch(`${serverUrl}/conversation/${from}`, {
      method: "GET",
    })
    const data = await res.json()

    return data
  } catch (err) {
    return []
  }
}

const deleteConversation = (from, to) => {
  return () => {
    try {
      fetch(`${serverUrl}/conversation/remove`, {
        method: "DELETE",
        body: JSON.stringify({ from, to }),
        headers: {
          "Content-Type": "application/json",
        },
      })
    } catch (err) {}
  }
}

const setMessagesAsRead = async (from, to) => {
  try {
    await fetch(`${serverUrl}/conversation/setRead`, {
      method: "PUT",
      body: JSON.stringify({ from, to }),
      headers: {
        "Content-type": "application/json",
      },
    })
  } catch (err) {
    console.log(err)
  }
}

const getChat = async (from, to) => {
  try {
    const res = await fetch(
      `${serverUrl}/conversation/getConversation/?from=${from}&to=${to}`
    )
    const data = await res.json()
    return data.messages
  } catch (err) {
    return []
  }
}

const sendMessage = (from, to) => {
  return (msg) => {
    const newMsg = {
      from,
      to,
      msg: msg,
    }
    try {
      fetch(`${serverUrl}/conversation/saveMsg`, {
        method: "POST",
        body: JSON.stringify(newMsg),
        headers: {
          "Content-Type": "application/json",
        },
      })
    } catch (err) {
      console.log(err)
    }
  }
}
export {
  getAvailableUsers,
  deleteConversation,
  getChat,
  sendMessage,
  setMessagesAsRead,
  checkUser,
  registerUser,
  getUserNick,
  getId,
}
