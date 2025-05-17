class ApiResponse {
    statusCode: number;
    message: string ;
    data: {};
    success: boolean;
    
    constructor(statusCode : number , message : string = "success" , data : {}){
        this.statusCode = statusCode
        this.message = message
        this.data = data
        this.success = statusCode >=200 && statusCode < 400 ? true : false
    }
}

export {ApiResponse}

