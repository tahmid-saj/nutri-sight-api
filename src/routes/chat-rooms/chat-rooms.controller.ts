import { Request, Response } from "express"
import { createChatroom, getChatroom } from "../../models/chat-rooms/chat-rooms.model.js"
import { ChatroomInfo } from "../../models/chat-rooms/chat-rooms.types.js"
import { CHATROOM_USER_OPERATIONS } from "../../utils/constants/chat-rooms.constants.js"
import { addUserToChatroom, removeUserFromChatroom, sendMessageToChatroom } from "../../models/chat-rooms/chat-rooms.mongo.crud.js"

// get chatroom
export async function httpGetChatroom(req: Request, res: Response) {
  try {
    const chatroomId = req.params.chatroomId!
    const resChatroom = await getChatroom(chatroomId)

    if (resChatroom) {
      res.status(200).json(resChatroom)
    }
  } catch (err) {
    console.log(err)
  }
}

// create chatroom
export async function httpCreateChatroom(req: Request, res: Response) {
  try {
    const { chatroomId } = req.body
    const { chatroomName } = req.body
    const chatroomInfo: ChatroomInfo = {
      chatroomId: chatroomId!, 
      chatroomName: chatroomName!
    }

    const resCreateChatroom = await createChatroom(chatroomInfo)

    if (resCreateChatroom) {
      res.status(200).json(resCreateChatroom)
    }
  } catch (err) {
    console.log(err)
  }
}

// add / remove userId to chatroom
export async function httpAddRemoveChatroomUser(req: Request, res: Response) {
  try {
    const operation = req.query.op
    const chatroomId = req.params.chatroomId
    const { userId } = req.body

    if (operation === CHATROOM_USER_OPERATIONS.add) {
      const resAdd = await addUserToChatroom(chatroomId!, userId)
      res.status(200).json(resAdd)
    } else if (operation === CHATROOM_USER_OPERATIONS.remove) {
      const resRemove = await removeUserFromChatroom(chatroomId!, userId)
      res.status(200).json(resRemove)
    }
  } catch (err) {
    console.log(err)
  }
}

// user sends message to chatroom
export async function httpSendChatroomMessage(req: Request, res: Response) {
  try {
    const chatroomId = req.params.chatroomId
    const { messageInfo } = req.body

    const resSendMessage = await sendMessageToChatroom(chatroomId!, messageInfo)
    if (resSendMessage) {
      res.status(200).json(resSendMessage)
    }
  } catch (err) {
    console.log(err)
  }
}