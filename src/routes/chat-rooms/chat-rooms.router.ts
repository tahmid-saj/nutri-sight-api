import express, { Router } from "express"
import { httpAddRemoveChatroomUser, httpCreateChatroom,
  httpGetChatrooms, httpSendChatroomMessage } from "./chat-rooms.controller.js"

const chatroomsRouter: Router = express.Router()

// get chatrooms and messages for user
chatroomsRouter.post("/chatrooms/messages", httpGetChatrooms)

// create chatroom
chatroomsRouter.post("/chatrooms", httpCreateChatroom)

// add / remove userId to chatroom
chatroomsRouter.patch("/chatrooms/:chatroomId", httpAddRemoveChatroomUser)

// user sends message to chatroom
chatroomsRouter.post("/chatrooms/:chatroomId/messages", httpSendChatroomMessage)

export { chatroomsRouter }