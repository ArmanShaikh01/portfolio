import mongoose, { Schema, Model } from 'mongoose';

export interface IAchievement {
    _id: mongoose.Types.ObjectId;
    title: string;
    description: string;
    date: Date;
    image?: string;
    category: string;
    isPublic: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const AchievementSchema = new Schema<IAchievement>(
    {
        title: {
            type: String,
            required: [true, 'Achievement title is required'],
            trim: true,
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
        },
        date: {
            type: Date,
            required: [true, 'Date is required'],
        },
        image: {
            type: String,
        },
        category: {
            type: String,
            required: [true, 'Category is required'],
            trim: true,
        },
        isPublic: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

// Indexes for faster queries
AchievementSchema.index({ isPublic: 1, date: -1 });
AchievementSchema.index({ date: -1 });

const Achievement: Model<IAchievement> = mongoose.models.Achievement || mongoose.model<IAchievement>('Achievement', AchievementSchema);

export default Achievement;
