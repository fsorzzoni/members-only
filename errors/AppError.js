export default class AppError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 500;
    }
}