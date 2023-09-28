const request = require('supertest');
const nock = require('nock');
const app = require('../../server.js');
const { getChatGPTResponse } = require('../../openai.js');

jest.mock('openai');
getChatGPTResponse.mockResolvedValueOnce('This is a mocked Recommendation!');


describe('Server Endpoints', () => {
  it('GET /discs', async () => {
      const mockDiscs = [{name: 'Disc1'}, {name: 'Disc2'}];
      const db = {
          query: jest.fn().mockResolvedValue(mockDiscs)
      };
      const res = await request(app).get('/discs');
      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockDiscs);
  });

  it('POST /ai', async () => {
      const mockResponse = 'Mocked AI response';
      getChatGPTResponse.mockResolvedValueOnce(mockResponse);

      const mockBag = ['Disc1', 'Disc2'];
      const res = await request(app).post('/ai').send({ bag: mockBag });

      expect(res.status).toBe(200);
      expect(res.body).toBe(mockResponse);
  });

  it('POST /discs', async () => {
      const db = {
          query: jest.fn().mockResolvedValue()
      };

      const discData = {
          name: 'NewDisc',
          speed: 5,
      };

      const res = await request(app).post('/discs').send(discData);
      expect(res.status).toBe(201);
  });
});
