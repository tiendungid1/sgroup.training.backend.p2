import 'dotenv/config';
import './config/config-service.config';
import express from 'express';
import { EngineConfig } from './config';

const app = express();

(async () => {
    (new EngineConfig(app)).bundle();
})();

export default app;
