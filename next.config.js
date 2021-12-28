module.exports = {
  pageExtensions: ["page.js"],
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    MONGODB_API_URL: process.env.MONGODB_API_URL,
    MONGODB_API_URL_CLIENT: process.env.MONGODB_API_URL_CLIENT,
  },
};
