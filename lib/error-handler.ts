import { NextResponse } from 'next/server';

export class AppError extends Error {
    constructor(
        public message: string,
        public statusCode: number = 500,
        public isOperational: boolean = true
    ) {
        super(message);
        Object.setPrototypeOf(this, AppError.prototype);
    }
}

export function handleError(error: unknown) {
    // Development mode - show detailed errors
    if (process.env.NODE_ENV === 'development') {
        console.error('Error:', error);
    }

    // Production mode - hide sensitive details
    if (error instanceof AppError) {
        return NextResponse.json(
            {
                success: false,
                error: error.message
            },
            { status: error.statusCode }
        );
    }

    // Mongoose validation errors
    if (error instanceof Error && error.name === 'ValidationError') {
        return NextResponse.json(
            {
                success: false,
                error: 'Validation failed. Please check your input.'
            },
            { status: 400 }
        );
    }

    // Mongoose duplicate key error
    if (error instanceof Error && 'code' in error && error.code === 11000) {
        return NextResponse.json(
            {
                success: false,
                error: 'This record already exists.'
            },
            { status: 409 }
        );
    }

    // Generic error - don't expose details
    return NextResponse.json(
        {
            success: false,
            error: 'An unexpected error occurred. Please try again later.'
        },
        { status: 500 }
    );
}

// Validation error helper
export function validationError(message: string) {
    return new AppError(message, 400);
}

// Unauthorized error helper
export function unauthorizedError(message: string = 'Unauthorized') {
    return new AppError(message, 401);
}

// Not found error helper
export function notFoundError(message: string = 'Resource not found') {
    return new AppError(message, 404);
}
