import mongoose, { Document, Schema } from "mongoose";

// Message Interface
interface IMessage extends Document {
  sender: mongoose.Types.ObjectId;
  receiver: mongoose.Types.ObjectId;
  content: string;
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Message Schema
const messageSchema = new Schema<IMessage>({
  sender: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Sender is required"],
  },
  receiver: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Receiver is required"],
  },
  content: {
    type: String,
    required: [true, "Content is required"],
    trim: true,
    maxlength: [500, "Content cannot exceed 500 characters"],
  },
  read: {
    type: Boolean,
    default: false,
  }
}, {
  timestamps: true,
});

// Chat Interface
interface IChat extends Document {
  participants: [mongoose.Types.ObjectId, mongoose.Types.ObjectId]; // Exactly 2 users
  messages: mongoose.Types.ObjectId[];
  lastMessage: mongoose.Types.ObjectId;
  unreadCount: {
    [key: string]: number; // userId: number of unread messages
  };
  createdAt: Date;
  updatedAt: Date;
}

// Chat Schema
const chatSchema = new Schema<IChat>({
  participants: [{
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Participants are required"],
  }],
  messages: [{
    type: Schema.Types.ObjectId,
    ref: "Message",
  }],
  lastMessage: {
    type: Schema.Types.ObjectId,
    ref: "Message",
  },
  unreadCount: {
    type: Map,
    of: Number,
    default: new Map(),
  }
}, {
  timestamps: true,
});

// Ensure exactly 2 participants
chatSchema.pre('save', function(next) {
  if (this.participants.length !== 2) {
    next(new Error('Chat must have exactly 2 participants'));
  }
  next();
});

// Create indexes for better query performance
chatSchema.index({ participants: 1 });
messageSchema.index({ sender: 1, receiver: 1 });
messageSchema.index({ createdAt: -1 });

const Message = mongoose.model<IMessage>("Message", messageSchema);
const Chat = mongoose.model<IChat>("Chat", chatSchema);

export { Message, Chat };
