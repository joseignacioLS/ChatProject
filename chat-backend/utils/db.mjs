import { mongoose } from "mongoose"

const databaseURL =
  ""

const connection = mongoose.connect(databaseURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

export { connection }
