export class AppError extends Error {
    constructor(
        public message: string,
        public statusCode: number = 500,
        public code?: string
    ) {
        super(message);
        this.name = 'AppError';
    }
}

export class ValidationError extends AppError {
    constructor(message: string) {
        super(message, 400, 'VALIDATION_ERROR');
    }
}

export class AuthenticationError extends AppError {
    constructor(message: string = 'No autorizado') {
        super(message, 401, 'AUTHENTICATION_ERROR');
    }
}

export class AuthorizationError extends AppError {
    constructor(message: string = 'No tiene permisos para realizar esta acción') {
        super(message, 403, 'AUTHORIZATION_ERROR');
    }
}

export class NotFoundError extends AppError {
    constructor(message: string = 'Recurso no encontrado') {
        super(message, 404, 'NOT_FOUND_ERROR');
    }
}

export class ConflictError extends AppError {
    constructor(message: string) {
        super(message, 409, 'CONFLICT_ERROR');
    }
}

export const handleError = (error: unknown) => {
    if (error instanceof AppError) {
        return {
            statusCode: error.statusCode,
            message: error.message,
            code: error.code
        };
    }

    console.error('Error no manejado:', error);
    return {
        statusCode: 500,
        message: 'Error interno del servidor',
        code: 'INTERNAL_SERVER_ERROR'
    };
}; 