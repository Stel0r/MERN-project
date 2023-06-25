class HttpError extends Error{
    constructor(message?:string,){
        super(message)
        this.name = this.constructor.name
    }
}
/**
 * Error status code: 401
 */
export class UnoathorizedError extends HttpError{}
/**
 * Error status Code: 409
 */
export class ConflictError extends HttpError{}

/**you can add more clases here if u want */