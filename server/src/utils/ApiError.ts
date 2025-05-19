class ApiError extends Error {
    statusCode: number;
    success: boolean;
    errors: string[];

    constructor(
        statusCode: number,
        message: string = "Something went wrong!",
        errors: string[] = [],
        stack?: string
    ) {
        super(message);
        this.name = "ApiError";
        this.statusCode = statusCode;
        this.success = false;
        this.errors = errors;

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export { ApiError };


