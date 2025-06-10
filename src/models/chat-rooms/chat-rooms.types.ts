
export type UserId = string
export type Email = string

export type ChatRoom = {
  chatroomId: string,
  chatroomName: string,
  countMembers: number,
  members: string[]
}

export type ChatroomMessage = {
  userId: string,
  userName: string,
  message: string,
  time: string | Date
}

export type ChatroomInfo = {
  chatroomId: string,
  chatroomName: string
}