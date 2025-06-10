import mongoose from 'mongoose'

const chatroomsSchema = new mongoose.Schema({
  chatroomId: {
    type: String,
    required: true
  },
  chatroomName: {
    type: String,
    required: true
  },
  countMembers: {
    type: Number,
    required: true,
    default: 0
  },
  members: {
    type: [String],
    default: [],
    require: true
  }
})

const chatroomMessageSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  chatroomId: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  }
})

export const chatroomsDatabase = mongoose.model("chatrooms", chatroomsSchema)
export const chatroomMessagesDatabase = mongoose.model("chatroomMessages", chatroomMessageSchema)
