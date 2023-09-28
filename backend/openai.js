const { Configuration, OpenAIApi } = require("openai");
const axios = require('axios');


async function getChatGPTResponse(prompt) {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  try {
    const chat_completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "system", content:`
      You are an expert disc golf recommender. Give me 5 suggested discs that would make a good
      addition to my bag.  Take into account different speeds/stabilities and popular models, please include the flight ratings in parentheses
      as well as whether it is a putter midrange fairway driver or distance driver`},
                 { role: "user", content: prompt }],
    });
    return chat_completion.data.choices[0].message.content;
  } catch (error) {
    console.error('Error:', error.message);
    return null;
  }
}

module.exports = { getChatGPTResponse };
