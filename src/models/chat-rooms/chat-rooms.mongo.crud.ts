import { ChatRoom, ChatroomInfo, ChatroomMessage } from "./chat-rooms.types.js";
import { chatroomsDatabase, chatroomMessagesDatabase } from "./chat-rooms.mongo.js";


/**
 * Fetch chatrooms and chatroom messages for a given userId
 */
export async function getChatroomsData(userId: string) {
  try {
    // Get all chatrooms where the user is a member
    const chatrooms = await chatroomsDatabase.find({ members: userId }).lean();

    const chatroomIds = chatrooms.map(room => room.chatroomId);

    // Get all messages from those chatrooms
    const messages: any = await chatroomMessagesDatabase.find({ chatroomId: { $in: chatroomIds } }).lean();

    // Group messages by chatroomId
    const chatroomMessages = chatroomIds.map(chatroomId => {
      const messagesForRoom = messages
        .filter((msg: any) => msg.chatroomId === chatroomId)
        .map((msg: any) => ({
          userId: msg.userId,
          userName: msg.userName,
          message: msg.message,
          time: msg.time
        }));

      return {
        chatroomId,
        chatroomName: chatroomId,
        messages: messagesForRoom
      };
    });

    return {
      chatrooms: chatrooms,
      chatroomsMessages: chatroomMessages
    }
  } catch (error) {
    console.error("Failed to get chatrooms and messages:", error);
    return [[], []];
  }
}

/**
 * Upsert a chatroom by chatroomId
 */
export async function saveChatroom(chatroomInfo: ChatroomInfo): Promise<boolean> {
  try {
    const result = await chatroomsDatabase.updateOne(
      { chatroomId: chatroomInfo.chatroomId }, // match condition
      {
        $set: {
          chatroomName: chatroomInfo.chatroomName,
        },
        $setOnInsert: {
          countMembers: 0,
          members: []
        }
      },
      { upsert: true }
    );

    return result.acknowledged === true;
  } catch (error) {
    console.error("Failed to upsert chatroom:", error);
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
    const newMessage = new chatroomMessagesDatabase({
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
