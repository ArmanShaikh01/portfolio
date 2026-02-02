import mongoose, { Schema, Model } from 'mongoose';

export interface ISkill {
    _id: mongoose.Types.ObjectId;
    name: string;
    category: string;
    proficiency: number;
    icon?: string;
    isPublic: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const SkillSchema = new Schema<ISkill>(
    {
        name: {
            type: String,
            required: [true, 'Skill name is required'],
            trim: true,
        },
        category: {
            type: String,
            required: [true, 'Category is required'],
            trim: true,
        },
        proficiency: {
            type: Number,
            required: [true, 'Proficiency level is required'],
            min: 0,
            max: 100,
        },
        icon: {
            type: String,
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
SkillSchema.index({ isPublic: 1, category: 1, name: 1 });
SkillSchema.index({ isPublic: 1, proficiency: -1 });

const Skill: Model<ISkill> = mongoose.models.Skill || mongoose.model<ISkill>('Skill', SkillSchema);

export default Skill;
