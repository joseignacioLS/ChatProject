import express from "express"
import cors from "cors"
import passport from "passport"

import { User } from "../models/User.mjs"
import { Conversation } from "../models/Conversation.mjs"

const router = express.Router()

router.use(cors())

router.get("/allUsers", async (req, res) => {
  //devuelve toda la DB
  try {
    res.send(JSON.stringify(await User.find({})))
  } catch (err) {
    res.status(500).send(err)
  }
})

router.get("/getId/:user", async (req, res) => {
  try {
    const { user } = req.params

    const result = await User.findOne({ user })

    if (result) return res.send(result._id.toString())
    return res.status(404).send("User not found")
  } catch (err) {
    res.status(500).send(err)
  }
})

router.get("/nick/:user", async (req, res) => {
  //devuelve el nick del usuario seleccionado
  try {
    const { user } = req.params
    return res.send(await User.findOne({ _id: user }, { nick: 1, _id: 0 }))
  } catch (err) {
    res.status(500).send(err)
  }
})

router.post("/loginS", (req, res, next) => {
  passport.authenticate("loginS", (error, user) => {
    if (error) return next(error)
    req.logIn(user, (error) => {
      if (error) return next(error)

      return res.json(user)
    })
  })(req)
})

router.post("/registerS", (req, res) => {
  const done = (error, user) => {
    if (error) {
      res.status(505).send(error)
    }

    // req.logIn(user, (error) => {
    //   if (error) {
    //     return next(error)
    //   }
    //   return res.json(user)
    // })
    res.json(user)
  }

  passport.authenticate("registerS", done)(req)
})

router.post("/register", async (req, res) => {
  //registra a un usuario
  try {
    const { user, nick, password } = req.body
    const insertion = {
      user,
      nick,
      password,
    }

    const result = await User.findOne({ user })
    let response = ["user already exists", ""]
    if (!result) {
      const temp = await User.create(insertion)
      response = ["ok", temp._id.toString()]
    }
    res.send(JSON.stringify(response))
  } catch (err) {
    res.status(500).send(err)
  }
})

// router.post("/login", async (req, res) => {
//   //login del usuario, devuelve registered, not registerd o wrong password
//   try {
//     const { user, password } = req.body

//     const result = await User.findOne({ user })

//     let response = ["not registered", ""]

//     if (result) {
//       if (result.password === password) {
//         response = ["registered", result._id.toString()]
//       } else {
//         response[0] = "wrong password"
//       }
//     }
//     res.send(JSON.stringify(response))
//   } catch (err) {
//     res.status(500).send(err)
//   }
// })

router.delete("/delete/:user", async (req, res) => {
  //elimina un usuario y todas sus convers
  try {
    const { user } = req.params
    await User.findByIdAndDelete(user)
    //aqui haria falta borrar todas sus convers
    await Conversation.deleteMany({ users: user })
    res.send("acomplished")
  } catch (err) {
    res.status(500).send(err)
  }
})

router.delete("/deleteAll", async (req, res) => {
  //elimina todos los usuarios y todas las convers
  try {
    await User.deleteMany({})
    await Conversation.deleteMany({})
    res.send("acomplished")
  } catch (err) {
    res.status(500).send(err)
  }
})

router.put("/changeNick", async (req, res) => {
  try {
    console.log("!")
    const { id, newNick, password } = req.body
    let user = await User.findById(id)
    if (user) {
      if (password === user.password) {
        user.nick = newNick
        await User.updateOne({ _id: id }, { $set: user })
        return res.send("updated")
      }
      return res.status(404).send("wrong password")
    } else {
      res.status(404).send("User not found")
    }
  } catch (err) {
    res.status(500).send(err)
  }
})

export { router as userRoutes }
