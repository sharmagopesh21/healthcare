import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import Doctor from "../models/doctor.model.js";

export const sendMessage = async (req, res) => {
  try {
    const { userId, message, userType } = req.body;
    const { id: receiverId } = req.params;
    const senderId = userId;

    let sender, receiver;

    if (userType === 'User') {
      sender = await User.findById(senderId);
      receiver = await Doctor.findById(receiverId);
    } else if (userType === 'Doctor') {
      sender = await Doctor.findById(senderId);
      receiver = await User.findById(receiverId);
    } else {
      return res.status(400).json({ error: "Invalid user type" });
    }

    if (!sender || !receiver) {
      return res.status(404).json({ error: "Sender or Receiver not found" });
    }

    let conversation = await Conversation.findOne({
      participants: { $all: [sender._id, receiver._id] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [sender._id, receiver._id],
      });
    }

    const newMessage = new Message({
      senderId: sender._id,
      receiverId: receiver._id,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    await Promise.all([conversation.save(), newMessage.save()]);

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in message controller: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages");

    if (!conversation) return res.status(200).json([]);

    const messages = conversation.messages;
    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
