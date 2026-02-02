import mongoose, { Schema, Model } from 'mongoose';

export interface IResume {
    _id: mongoose.Types.ObjectId;
    fileUrl: string;
    publicUrl?: string;
    version: string;
    isPublic: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const ResumeSchema = new Schema<IResume>(
    {
        fileUrl: {
            type: String,
            required: [true, 'File URL is required'],
        },
        publicUrl: {
            type: String,
        },
        version: {
            type: String,
            required: [true, 'Version is required'],
            trim: true,
        },
        isPublic: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const Resume: Model<IResume> = mongoose.models.Resume || mongoose.model<IResume>('Resume', ResumeSchema);

export default Resume;
