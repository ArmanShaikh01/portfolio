import { IUser } from '@/models/User';
import { IAbout } from '@/models/About';
import { ISkill } from '@/models/Skill';
import { IProject } from '@/models/Project';
import { IAchievement } from '@/models/Achievement';
import { IMessage } from '@/models/Message';
import { IResume } from '@/models/Resume';

export type {
    IUser,
    IAbout,
    ISkill,
    IProject,
    IAchievement,
    IMessage,
    IResume,
};

export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}
