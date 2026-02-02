import mongoose, { Schema, Model } from 'mongoose';

export interface IAbout {
    _id: mongoose.Types.ObjectId;
    bio: string;
    profileImage?: string;
    socialLinks: {
        github?: string;
        linkedin?: string;
        twitter?: string;
        email?: string;
    };
    isPublic: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const AboutSchema = new Schema<IAbout>(
    {
        bio: {
            type: String,
            required: [true, 'Bio is required'],
        },
        profileImage: {
            type: String,
        },
        socialLinks: {
            github: String,
            linkedin: String,
            twitter: String,
            email: String,
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

// Index for faster queries
AboutSchema.index({ isPublic: 1 });

const About: Model<IAbout> = mongoose.models.About || mongoose.model<IAbout>('About', AboutSchema);

export default About;
