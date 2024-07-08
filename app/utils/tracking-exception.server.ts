import { STATUS_CODES } from 'http';

export class TrackingExceptionServer extends Error {
    code = STATUS_CODES[503];
    status = 503;

    constructor(message: string) {
        super(message);
    }
}
