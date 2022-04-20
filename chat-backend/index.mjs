import express from "express"
import cors from "cors"
import { connection } from "./utils/db.mjs"
import { conversationRoutes } from "./routes/conversation.routes.mjs"
import { userRoutes } from "./routes/user.routes.mjs"
import passport from "passport"
import "./authentication/passport.mjs"

const PORT = 3000

const server = express()
const router = express.Router()
router.use(cors())
server.use(passport.initialize())

server.use(express.json())
server.use(express.urlencoded({ extended: true }))

server.use("/conversation", conversationRoutes)
server.use("/user", userRoutes)

server.use("*", (req, res, next) => {
  const error = new Error("Route not found")
  error.status = 404
  next(error)
})

server.use((err, req, res, next) => {
  return res.status(err.status || 500).json(err.message || "Unexpected error")
})

server.use(router)

server.listen(process.env.PORT || PORT, () => {
  console.log("server running")
})
