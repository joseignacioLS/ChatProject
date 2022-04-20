import mongoose from "mongoose"

const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    user: { type: String },
    nick: { type: String },
    password: {type: String}
  },
  {
    timestamps: true,
  }
)

const User = mongoose.model("User", userSchema, "users")

export { User }
