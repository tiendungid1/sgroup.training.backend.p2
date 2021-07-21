// @ts-check
import * as express from 'express';
import methodOverride from 'method-override';
import cors from 'cors';
import { join } from 'path';
import { clientRouter } from 'client';
import { apiRouter } from '../api-rest';
import { authenDatabaseConnection } from '../database';

export class EngineConfig {
    static ROOT_DIR = process.cwd();

    static VIEW_PATH = join(EngineConfig.ROOT_DIR, 'views');

    static PUBLIC_PATH = join(EngineConfig.ROOT_DIR, 'public/')

    /**
     * @param {import("express-serve-static-core").Express} app
     */
    constructor(app) {
        this.app = app;
    }

    /**
     * Initialize engines
     */
    async bundle() {
        /**
         * Setup basic express
         */
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        /**
         * Setup view engine
         */
        this.app.set('view engine', 'pug');
        this.app.set('views', EngineConfig.VIEW_PATH);
        this.app.use(express.static(EngineConfig.PUBLIC_PATH, {
            etag: true,
            cacheControl: true,
            maxAge: 8000
        }));
        /**
         * Setup method override method to use PUT, PATCH,...
         */
        this.app.use(methodOverride('X-HTTP-Method-Override'));

        this.app.use(
            methodOverride(req => {
                if (req.body && typeof req.body === 'object' && '_method' in req.body) {
                    const method = req.body._method;
                    delete req.body._method;

                    return method;
                }

                return undefined;
            }),
        );

        this.app.use('/api', apiRouter);
        this.app.use('/', clientRouter);
        this.app.use((req, res) => res.render('pages/error', {
            message: `Page ${req.url} not found`
        }));
        await authenDatabaseConnection();
    }
}
