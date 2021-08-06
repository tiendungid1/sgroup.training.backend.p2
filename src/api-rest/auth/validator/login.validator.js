import { ERROR_CODE } from 'common/enum';
import { BAD_REQUEST } from 'http-status';
import joi from 'joi';

export function loginValidator(req, res, next) {
    const schema = joi.object({
        email: joi.string()
            .email({
                minDomainSegments: 2,
                tlds: { allow: ['com'] }
            })
            .required(),
        password: joi.string().min(6).required()
    });

    const options = {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: true
    };

    const result = schema.validate(req.body, options);

    if (result.error) {
        return res.status(BAD_REQUEST).json({
            code: ERROR_CODE.BAD_REQUEST,
            message: result.error,
        });
    }

    return next();
}
