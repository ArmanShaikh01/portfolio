import mongoose, { Schema, Model } from 'mongoose';

export interface IProject {
    _id: mongoose.Types.ObjectId;
    title: string;
    description: string;
    images: string[];
    technologies: string[];
    liveUrl?: string;
    githubUrl?: string;
    featured: boolean;
    isPublic: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
    {
        title: {
            type: String,
            required: [true, 'Project title is required'],
            trim: true,
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
        },
        images: {
            type: [String],
            default: [],
        },
        technologies: {
            type: [String],
            required: [true, 'At least one technology is required'],
        },
        liveUrl: {
            type: String,
        },
        githubUrl: {
            type: String,
        },
        featured: {
            type: Boolean,
            default: false,
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
ProjectSchema.index({ isPublic: 1, featured: 1 });
ProjectSchema.index({ isPublic: 1, createdAt: -1 });
ProjectSchema.index({ createdAt: -1 });

const Project: Model<IProject> = mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);

export default Project;
