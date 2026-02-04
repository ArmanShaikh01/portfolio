import { z } from 'zod';
import validator from 'validator';

// Message validation schema
export const messageSchema = z.object({
    name: z.string()
        .min(2, 'Name must be at least 2 characters')
        .max(100, 'Name must be less than 100 characters')
        .trim()
        .refine((val) => !validator.contains(val, '<script'), {
            message: 'Invalid characters in name'
        }),

    email: z.string()
        .email('Invalid email address')
        .max(255, 'Email must be less than 255 characters')
        .toLowerCase()
        .trim()
        .refine((val) => validator.isEmail(val), {
            message: 'Invalid email format'
        }),

    subject: z.string()
        .min(3, 'Subject must be at least 3 characters')
        .max(200, 'Subject must be less than 200 characters')
        .trim()
        .refine((val) => !validator.contains(val, '<script'), {
            message: 'Invalid characters in subject'
        }),

    message: z.string()
        .min(10, 'Message must be at least 10 characters')
        .max(1000, 'Message must be less than 1000 characters')
        .trim()
        .refine((val) => !validator.contains(val, '<script'), {
            message: 'Invalid characters in message'
        })
});

// Sanitize HTML to prevent XSS
export function sanitizeInput(input: string): string {
    return validator.escape(input);
}

// Validate and sanitize message data
export function validateMessage(data: unknown) {
    const result = messageSchema.safeParse(data);

    if (!result.success) {
        const errors = result.error.errors.map(err => err.message).join(', ');
        throw new Error(errors);
    }

    // Sanitize all string fields
    return {
        name: sanitizeInput(result.data.name),
        email: result.data.email, // Email already validated
        subject: sanitizeInput(result.data.subject),
        message: sanitizeInput(result.data.message)
    };
}

export type MessageInput = z.infer<typeof messageSchema>;
