import mongoose from "mongoose"

const Schema = mongoose.Schema

const conversationSchema = new Schema(
  {
    users: { type: [{type: Schema.Types.ObjectId, ref:"User"}] },
    messages: { type: Array },
  },
  {
    timestamps: true,
  }
)

const Conversation = mongoose.model("Conversation", conversationSchema, "conversations")

export { Conversation }
