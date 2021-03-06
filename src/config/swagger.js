import { ConfigService } from 'libs/config/config.service';
import { SwaggerNode } from '../libs/swagger';

const options = {
    openapi: '3.0.1',
    info: {
        version: '1.0.0',
        title: 'APIs Document',
        description: 'API description',
        termsOfService: '',
        contact: {
            name: 'Dang Ngoc Phu',
            email: 'dangphu241299@gmail.com',
        },
    },
    servers: [
        {
            url: `http://localhost:${ConfigService.getSingleton().get('PORT')}/api/v1`,
            description: 'Local server',
            variables: {
                env: {
                    default: 'app-dev',
                    description: 'DEV Environment',
                },
                port: {
                    enum: [
                        '8443',
                        '5000',
                        '443',
                    ],
                    default: ConfigService.getSingleton().get('PORT'),
                },
                basePath: {
                    default: 'api/v1',
                },
            },
        },
        {
            url: 'https://app-dev.herokuapp.com/api/v1',
            description: 'DEV Env',
        },
    ],
    basePath: '/api/v1',
    auth: true,
};

export const swaggerConfig = () => SwaggerNode.config(options);
