class ApiError extends Error {
    statusCode: number;
    success: boolean;
    error: string[];
    message : string = "Something went wrong!"
    constructor(statusCode : number , message : string , errors : string[] , stack : string){
        super();
        this.statusCode = statusCode
        this.message = message 
        this.success = false
        this.error = errors

        if(stack)
            this.stack = stack
        else{
            Error.captureStackTrace(this , this.constructor)
        }

    }
}

export {ApiError}