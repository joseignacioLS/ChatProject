import { mongoose } from "mongoose"
import "dotenv/config"

const databaseURL = process.env.databaseURL

const connection = mongoose.connect(databaseURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

export { connection }
