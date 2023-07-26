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
      messages: [{ role: "system", content: "You are a disc golf expert recommender, and you always give suggestions for discs in 3's with descriptions of how they might be good fits for their bag.  Always your response with Based on the discs you currently have in your bag, we would recommend the following:" },
                 { role: "user", content: prompt }],
    });

    // Process the chat_completion response if needed
    return chat_completion.data.choices[0].message.content;
  } catch (error) {
    console.error('Error:', error.message);
    return null;
  }
}

module.exports = { getChatGPTResponse };
