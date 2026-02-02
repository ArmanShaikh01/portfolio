import mongoose, { Schema, Model } from 'mongoose';

export interface IMessage {
    _id: mongoose.Types.ObjectId;
    name: string;
    email: string;
    subject: string;
    message: string;
    isRead: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const MessageSchema = new Schema<IMessage>(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            lowercase: true,
            trim: true,
        },
        subject: {
            type: String,
            required: [true, 'Subject is required'],
            trim: true,
        },
        message: {
            type: String,
            required: [true, 'Message is required'],
        },
        isRead: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const Message: Model<IMessage> = mongoose.models.Message || mongoose.model<IMessage>('Message', MessageSchema);

export default Message;
