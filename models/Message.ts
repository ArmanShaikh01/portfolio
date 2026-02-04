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
            minlength: [2, 'Name must be at least 2 characters'],
            maxlength: [100, 'Name must be less than 100 characters'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            lowercase: true,
            trim: true,
            maxlength: [255, 'Email must be less than 255 characters'],
            match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
        },
        subject: {
            type: String,
            required: [true, 'Subject is required'],
            trim: true,
            minlength: [3, 'Subject must be at least 3 characters'],
            maxlength: [200, 'Subject must be less than 200 characters'],
        },
        message: {
            type: String,
            required: [true, 'Message is required'],
            minlength: [10, 'Message must be at least 10 characters'],
            maxlength: [1000, 'Message must be less than 1000 characters'],
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
