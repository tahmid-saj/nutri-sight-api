import { addUserToChatroom, getChatroomData, removeUserFromChatroom, saveChatroom, sendMessageToChatroom } from "./chat-rooms.mongo.crud.js";
import { ChatroomInfo, ChatroomMessage } from "./chat-rooms.types.js";

export async function getChatroom(chatroomId: string) {
  return getChatroomData(chatroomId)
}

export async function createChatroom(chatroomInfo: ChatroomInfo) {
  return saveChatroom(chatroomInfo)
}

export async function addChatroomUser(chatroomId: string, userId: string) {
  return addUserToChatroom(chatroomId, userId)
}

export async function removeChatroomUser(chatroomId: string, userId: string) {
  return removeUserFromChatroom(chatroomId, userId)
}

export async function sendChatroomMessage(chatroomId: string, messageInfo: ChatroomMessage) {
  return sendMessageToChatroom(chatroomId, messageInfo)
}