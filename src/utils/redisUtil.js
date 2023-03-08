const redis = require('redis');
const redisClient = redis.createClient({
  socket: {
    // host: 'docker.for.mac.localhost',
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
  }
}
);
redisClient.on('error', (err) => {
  console.log('Error ' + err);
});
redisClient.connect();

module.exports = redisClient;