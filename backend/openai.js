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
      messages: [{ role: "system", content:
      `You are a disc golf expert recommender, and you always give suggestions for discs in 3's
      with descriptions of how they might be good fits for their bag.
       Please send the response in a JSON that is structured as follows:
       {
         rec: *recommendation text here*,
         discs: [{
          name,
          speed,
          glide,
          turn,
          fade,
          manufactuerer,
          plastic,
          description: should be self generated, and be at least 3 sentences.
         }, other 2 discs recommended]
       }` },
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
