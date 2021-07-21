import { UNPROCESSABLE_ENTITY } from 'http-status';
import { ERROR_CODE } from '../../../common/enum';
import { HttpException } from './base';

export class UnprocessEntityException extends HttpException {
    constructor(msg = 'Entity have some fields can not process') {
        super(UNPROCESSABLE_ENTITY, ERROR_CODE.UNPROCESSABLE_ENTITY, msg);
    }
}
