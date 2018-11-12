const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  NODE_ENV   : process.env.NODE_ENV,
  URL        : process.env.BASE_URL,
  PORT       : process.env.PORT,
  MONGODB_URI: process.env.MONGODB_URI,
  JWT_SECRET : process.env.SECRET
};
