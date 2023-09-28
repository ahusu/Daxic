const { getChatGPTResponse } = require('../../openai.js');
const { Configuration, OpenAIApi } = require("openai");

jest.mock('openai');

OpenAIApi.prototype.createChatCompletion = jest.fn().mockResolvedValue({
  data: {
      choices: [{
          message: {
              content: 'Mocked response content'
          }
      }]
  }
});


describe('OpenAI API Calls', () => {
  it('should return a string response from ChatGPT', async () => {
      const prompt = 'Your test prompt here';
      const response = await getChatGPTResponse(prompt);
      expect(typeof response).toBe('string');
      expect(response).toBe('Mocked response content');
  });
});
