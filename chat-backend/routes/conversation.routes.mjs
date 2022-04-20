import express from "express"
import cors from "cors"

import { Conversation } from "../models/Conversation.mjs"
import { User } from "../models/User.mjs"

const router = express.Router()

router.use(cors())

router.get("/getConversation", async (req, res) => {
  //coge los nombres de dos users
  //y busca la conver en comun
  try {
    const { from, to } = req.query

    if (!from || !to) return res.status(404).send("Missing parameters")

    const filter = {
      $and: [{ users: from }, { users: to }],
    }

    const result = await Conversation.findOne(filter)
      .populate("users", "user nick")
      .populate({
        path: "messages",
        populate: { path: "user", model: "User", select: "user nick" },
      })

    return res.send(JSON.stringify(result))
  } catch (err) {
    res.status(500).send(err)
  }
})

router.get("/all", async (req, res) => {
  //devuelve toda la DB
  try {
    const result = await Conversation.find()

    return res.send(JSON.stringify(result))
  } catch (err) {
    res.status(500).send(err)
  }
})

router.delete("/cleanDB", async (req, res) => {
  //limpia la DB
  try {
    let res = await Conversation.deleteMany()
    res.send("Correctly cleaned")
  } catch (err) {
    res.status(500).send(err)
  }
})

router.get("/:user", async (req, res, next) => {
  //devuelve todas las convs abiertas
  //del user (param) y ademas indica
  //si hay mensajes sin leer en cada una
  try {
    const { user } = req.params

    if (!user) return res.status(404).send("Missing parameter")

    const UserConversations = await Conversation.find({
      users: user,
    })
      .populate("users", "nick")
      .populate({
        path: "messages",
        populate: { path: "user", model: "User", select: "nick" },
      })

    let result = []
    for (let i = 0; i < UserConversations.length; i++) {
      const ele = UserConversations[i]
      const other = await User.findById(
        ele.users.filter((ele) => ele._id.toString() !== user)[0]
      )
      let read = ele.messages.some((ele) => {
        return !ele.read && user !== ele.user._id.toString()
      })
        ? true
        : false
      result.push([[other.nick, other._id.toString()], read])
    }

    return res.send(JSON.stringify(result))
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
})

router.post("/saveMsg", async (req, res, next) => {
  //incluye un nuevo mensaje en la
  //conver indicada
  try {
    const { from, to, msg } = req.body

    if (!from || !to || !msg) return res.status(404).send("Missing parameter")

    const isConversation = await Conversation.findOne({
      $and: [{ users: from }, { users: to }],
    })
    if (isConversation) {
      console.log("updating")

      const filter = { $and: [{ users: from }, { users: to }] }
      const update = {
        $push: { messages: { user: from, message: msg, read: false } },
      }

      await Conversation.updateOne(filter, update)
    } else {
      console.log("inserting")

      const insertion = {
        users: [from, to],
        messages: [{ user: from, message: msg, read: false }],
      }
      await Conversation.create(insertion)
    }

    res.send("ok")
  } catch (err) {
    res.status(500).send(err)
  }
})

router.put("/setRead", async (req, res, next) => {
  //marca los mensajes de una conver
  //como leidos
  try {
    const { from, to } = req.body

    if (!from || !to) return res.status(404).send("Missing parameter")

    const filter = {
      $and: [{ users: from }, { users: to }],
    }

    let result = await Conversation.findOne(filter)

    if (result) {
      result.messages = result.messages.map((ele) => {
        if (ele.user.toString() !== from) {
          ele.read = true
        }
        return ele
      })

      await Conversation.updateOne(filter, { $set: result })

      res.send("Conversation updated")
    } else {
      res.status(404).send("Conversation not found")
    }
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
})

router.delete("/remove", async (req, res) => {
  //elimina una conver
  try {
    const { from, to } = req.body

    if (!from || !to) return res.status(404).send("Missing parameter")

    await Conversation.deleteOne({
      $and: [{ users: from }, { users: to }],
    })
    res.send("consersation removed")
  } catch (err) {
    res.status(500).send(err)
  }
})

export { router as conversationRoutes }
