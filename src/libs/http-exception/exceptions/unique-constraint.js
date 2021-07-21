import { CONFLICT } from 'http-status';
import { ERROR_CODE } from '../../../common/enum';
import { HttpException } from './base';

export class UniqueConstraintException extends HttpException {
    constructor(msg = 'Error reference constraint') {
        super(CONFLICT, ERROR_CODE.UNIQUE_CONSTAINT, msg);
    }
}
