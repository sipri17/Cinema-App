const Redis = require('ioredis');
const password = process.env.REDIS_PASSWORD;

const redis = new Redis({
    host: 'redis-18418.c252.ap-southeast-1-1.ec2.cloud.redislabs.com',
    port: 18418,
    password
});


module.exports = {redis}