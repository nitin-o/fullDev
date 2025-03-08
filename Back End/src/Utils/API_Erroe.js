export class ApiError extends Error{
    constructor(
        statusCode,
        message = "3333333333333333333",
        error = [],
        stack =""
    ){
        super(message)
        this.data = null;
        this.statusCode = statusCode ;
        this.error = error;
        this.stack =stack;  
        this.message = message
        this.success = false

        if (stack) {
            this.stack = stack;
        }else{
            Error.captureStackTrace(this ,this.constructor)
        }

    }
}