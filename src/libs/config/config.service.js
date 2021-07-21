// @ts-check
import * as env from 'dotenv';
import { NotFoundEnvKey } from './error/notfoundEnvKey';

export class ConfigService {
   static #instance;

   store = {};

   cache = false;

   /**
     * @param {{ pathLookup?: string; cache?: boolean; }} config
     */
   static config(config) {
       if (ConfigService.#instance) {
           throw new Error(
               `Class ${ConfigService.name} has been configured before`,
           );
       }
       ConfigService.#instance = new ConfigService();

       env.config({
           path: config.pathLookup,
       });
       if (!config.cache) {
           ConfigService.#instance.cache = false;
       }
   }

   /**
    * 
    * @returns {ConfigService}
    */
   static getSingleton() {
       return ConfigService.#instance;
   }

   get(key) {
       if (this.cache) {
           if (!this.store[key]) {
               this.verifyKeyInProcess(key);
               this.set(key, process.env[key]);
           }
           return this.store[key];
       }
       return process.env[key];
   }

   set(key, value) {
       this.store[key] = value;
   }

   verifyKeyInProcess(key) {
       if (!process.env[key]) {
           throw new NotFoundEnvKey(key, process.env.NODE_ENV);
       }
   }
}
