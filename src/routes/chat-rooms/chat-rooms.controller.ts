import { Request, Response } from "express"
import { createChatroom, getChatrooms, 
  addChatroomUser, removeChatroomUser, sendChatroomMessage } from "../../models/chat-rooms/chat-rooms.model.js"
import { ChatroomInfo } from "../../models/chat-rooms/chat-rooms.types.js"
import { CHATROOM_USER_OPERATIONS } from "../../utils/constants/chat-rooms.constants.js"

// get chatrooms
export async function httpGetChatrooms(req: Request, res: Response) {
  try {
    const { userId } = req.body
    const resUserChatrooms = await getChatrooms(userId)

    if (resUserChatrooms) {
      return res.status(200).json(resUserChatrooms)
    }
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Internal Server Error' });
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
      return res.status(200).json(resCreateChatroom)
    }
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

// add / remove userId to chatroom
export async function httpAddRemoveChatroomUser(req: Request, res: Response) {
  try {
    const operation = req.query.op
    const chatroomId = req.params.chatroomId
    const { userId } = req.body

    if (operation === CHATROOM_USER_OPERATIONS.add) {
      const resAdd = await addChatroomUser(chatroomId!, userId)
      return res.status(200).json(resAdd)
    } else if (operation === CHATROOM_USER_OPERATIONS.remove) {
      const resRemove = await removeChatroomUser(chatroomId!, userId)
      return res.status(200).json(resRemove)
    }
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

// user sends message to chatroom
export async function httpSendChatroomMessage(req: Request, res: Response) {
  try {
    const chatroomId = req.params.chatroomId
    const { messageInfo } = req.body

    const resSendMessage = await sendChatroomMessage(chatroomId!, messageInfo)
    if (resSendMessage) {
      return res.status(200).json(resSendMessage)
    }
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}