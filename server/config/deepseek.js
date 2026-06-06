const OpenAI = require("openai");

const deepseek = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,

  baseURL: "https://api.deepseek.com",
});

module.exports = deepseek;
