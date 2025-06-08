import { ChatroomInfo, ChatroomMessage } from "./chat-rooms.types.js";
import { chatroomsDatabase, chatroomMessages } from "./chat-rooms.mongo.js";

/**
 * Fetch chatroom data by ID
 */
export async function getChatroomData(chatroomId: string) {
  try {
    const chatroom = await chatroomsDatabase.findOne({ chatroomId }).lean();
    return chatroom;
  } catch (error) {
    console.error("Failed to get chatroom data:", error);
    return null;
  }
}

/**
 * Save a new chatroom
 */
export async function saveChatroom(chatroomInfo: ChatroomInfo): Promise<boolean> {
  try {
    const newChatroom = new chatroomsDatabase({
      ...chatroomInfo,
      countMembers: 0,
      members: []
    });
    await newChatroom.save();
    return true;
  } catch (error) {
    console.error("Failed to save chatroom:", error);
    return false;
  }
}

/**
 * Add a user to a chatroom
 */
export async function addUserToChatroom(chatroomId: string, userId: string) {
  try {
    const result = await chatroomsDatabase.updateOne(
      { chatroomId },
      {
        $addToSet: { members: userId },
        $inc: { countMembers: 1 }
      }
    );
    return result.modifiedCount > 0;
  } catch (error) {
    console.error("Failed to add user to chatroom:", error);
    return false;
  }
}

/**
 * Remove a user from a chatroom
 */
export async function removeUserFromChatroom(chatroomId: string, userId: string) {
  try {
    const result = await chatroomsDatabase.updateOne(
      { chatroomId },
      {
        $pull: { members: userId },
        $inc: { countMembers: -1 }
      }
    );
    return result.modifiedCount > 0;
  } catch (error) {
    console.error("Failed to remove user from chatroom:", error);
    return false;
  }
}

/**
 * Send a message to a chatroom
 */
export async function sendMessageToChatroom(chatroomId: string, messageInfo: ChatroomMessage) {
  try {
    const newMessage = new chatroomMessages({
      ...messageInfo,
      chatroomId
    });
    await newMessage.save();
    return true;
  } catch (error) {
    console.error("Failed to send message:", error);
    return false;
  }
}
