// config/oauth2Config.js
require("dotenv").config();

const config = {
  CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  REDIRECT_URI: process.env.REDIRECT_URI,
  REFRESH_TOKEN: process.env.REFRESH_TOKEN,
  SENDER_EMAIL: process.env.SENDER_EMAIL,
};

module.exports = config;
