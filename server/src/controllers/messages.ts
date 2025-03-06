import { Request, Response } from "express";
import { Message, Chat } from "../models/messages";

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { senderId, receiverId, content } = req.body;

    // Create message
    const message = await Message.create({
      sender: senderId,
      receiver: receiverId,
      content,
    });
    if (!message) {
      res.status(400).json({ message: "Message not created" });
      return;
    }

    // Find or create chat
    let chat = await Chat.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!chat) {
      chat = await Chat.create({
        participants: [senderId, receiverId],
        messages: [message._id],
        lastMessage: message._id,
        unreadCount: {
          [receiverId]: 1,
        },
      });
    } else {
      // Update chat
      chat = await Chat.findByIdAndUpdate(
        chat._id,
        {
          $push: { messages: message._id },
          lastMessage: message._id,
          $inc: { [`unreadCount.${receiverId}`]: 1 },
        },
        { new: true }
      );
    }

    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: "Error sending message" });
  }
};
