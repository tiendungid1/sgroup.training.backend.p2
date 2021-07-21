import { UsersService } from 'api-rest/users/users.service';
import { logger } from 'common/utils';
import { jwtPayload } from '../dto/jwt-payload';
import { profileResponse } from '../dto/profile-response';
import { BcryptService } from './bcrypt.service';
import { JwtService } from './jwt.service';
import { UnAuthorizedException } from '../../../libs/http-exception/exceptions';

export class AuthService {
    /**
     * @type {AuthService}
     */
    static #instance;

    static getSingleton() {
        if (!AuthService.#instance) {
            AuthService.#instance = new AuthService(
                UsersService.getSingleton(),
                BcryptService.getSingleton(),
                JwtService.getSingleton(),
            );
            logger.info(`[${AuthService.name}] is bundling`);
        }
        return AuthService.#instance;
    }

    /**
     * @type {UsersService}
     */
    #userService;

    /**
     * @type {BcryptService}
     */
    #bcryptService;

    /**
     * @type {JwtService}
     */
    #jwtService;

    constructor(userService, bcryptService, jwtService) {
        this.#userService = userService;
        this.#bcryptService = bcryptService;
        this.#jwtService = jwtService;
    }

    async login(body) {
        const user = await this.#userService.findOneAndReturn(body.email);

        if (!this.#bcryptService.compare(body.password, user.password)) {
            throw new UnAuthorizedException('Invalid password');
        }

        return profileResponse(
            user,
            this.#jwtService.sign(jwtPayload(user.id, user.role_name))
        );
    }

    async register(body) {
        body.password = this.#bcryptService.hash(body.password);

        await this.#userService.createOneAndReturn(body);

        return;
    }
}
