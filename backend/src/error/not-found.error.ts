export class NotFoundError {
    constructor(public message: string) {
        throw new Error(`${message} not found. `)
    }
}
