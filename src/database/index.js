import knex from 'knex';
import { ConfigService } from 'libs/config/config.service';
import config from '../../knexfile';
import { logger } from '../common/utils';

export const knexConnection = knex(config[ConfigService.getSingleton().get('NODE_ENV')]);

export const getTransaction = () => knexConnection.transaction();

export const authenDatabaseConnection = async () => {
    try {
        await knexConnection.raw('SELECT 1');
        logger.info('Database connected');
    } catch (error) {
        logger.error(error.message);
        logger.error(error.stack);
    }
};
