import { STATUS_CODES } from 'http';
import { TrackingExceptionServer } from './tracking-exception.server';

export class ValidationExceptionServer extends TrackingExceptionServer {
    errors: Record<string, string> = {};

    constructor(message: string, errors: Record<string, string>) {
        super(message);
        const status = 422;
        this.code = STATUS_CODES[status] ?? '';
        this.name = 'ValidationException';
        this.status = status;
        this.errors = errors;
    }

    // @todo I might not need this since I may bring in the errors in the appropriate type. think about it.
    setErrors(errors: Record<string, string>) {
        return errors;
    }
}
