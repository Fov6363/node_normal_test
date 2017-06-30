/**
 * Created by yuanyuan on 17/3/19.
 */
const debug = require('debug');
const Promise = require('bluebird');
const logger = require('./test_77_log4js');


console.log(logger.level);
logger.info(`info ni`);
logger.debug(`debug ni`);
logger.error(`error ni`);
logger.trace(`trace ni`);
logger.fatal(`fatal ni`);