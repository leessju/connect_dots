const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  NODE_ENV    : process.env.NODE_ENV,
  URL         : process.env.BASE_URL,
  PORT        : process.env.PORT,
  MONGODB_URI : process.env.MONGODB_URI,
  JWT_SECRET  : process.env.SECRET,

  SMTP_HOST   : process.env.SMTP_HOST,
  SMTP_PORT   : process.env.SMTP_PORT,
  SMTP_ID     : process.env.SMTP_ID,
  SMTP_PW     : process.env.SMTP_PW,
  SMTP_FROM   : process.env.SMTP_FROM,

  DOWNLOAD_URL: process.env.DOWNLOAD_URL,
  UPLOAD_DIR  : process.env.UPLOAD_DIR
};
