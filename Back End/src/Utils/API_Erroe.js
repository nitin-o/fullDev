export class ApiError extends Error {
    constructor(
        statusCode,
        message = "An unexpected error occurred",
        error = null,
        stack = ""
    ) {
        super(message);
        this.name = "ApiError";
        this.statusCode = statusCode;
        this.message = message;
        this.error = error;
        this.success = false;
        this.data = null;

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
