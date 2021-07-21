import { NOT_FOUND } from 'http-status';
import { ERROR_CODE } from '../../../common/enum';
import { HttpException } from './base';

export class NotFoundException extends HttpException {
    constructor(msg = 'Not found') {
        super(NOT_FOUND, ERROR_CODE.NOT_FOUND, msg);
    }
}
