import mongoose from 'mongoose';
import request from 'request-promise-native';
import app from '../src';
import { PORT, DB_URL } from '../config';
import { BatchTopic } from '../src/db';
import tokenService from '../src/services/token';
// import { Cookie } from 'request-cookies';

let savedBatchTopics;
const dummyBatchTopics = [
  {
    batchId: mongoose.Types.ObjectId('111111111111111111111111'),
    name: 'Rebase',
    category: 'git',
    day: 1,
  },
  {
    batchId: mongoose.Types.ObjectId('111111111111111111111111'),
    name: 'Merge',
    category: 'git',
    day: 1,
  },
  {
    batchId: mongoose.Types.ObjectId('111111111111111111111111'),
    name: 'Conflict',
    category: 'git',
    day: 1,
  },
  {
    batchId: mongoose.Types.ObjectId('111111111111111111111112'),
    name: 'ExtraTerrestrial',
    category: 'unreal',
    day: 1,
  },
];

let server;
const serverUrl = `http://localhost:${PORT}`;
let tempToken;

beforeAll((done) => {
  jest.setTimeout(10000);
  mongoose.connect(DB_URL, { useNewUrlParser: true }, () => {
    server = app.listen(PORT, () => {
      BatchTopic.find({})
        .then((topic) => {
          savedBatchTopics = topic;
          return Promise.resolve(true);
        })
        .then(() => BatchTopic.deleteMany({}))
        .then(() => BatchTopic.insertMany(dummyBatchTopics))
        .then(() => done());
      tokenService.generate({
        email: 'vipulrawat007@gmail.com',
        tokenType: 'LOGIN',
      })
        .then((token) => {
          tempToken = token;
        });
    });
  });
});
afterAll((done) => {
  BatchTopic.deleteMany({})
    .then(() => BatchTopic.insertMany(savedBatchTopics))
    .then(() => mongoose.connection.close())
    .then(() => server.close(done));
});

describe('GET: /batchTopics/list', () => {
  const url = `${serverUrl}/batchTopics/list`;

  it('should send batch topics as an array', async () => {
    const res = await request({
      url,
      qs: { batchId: '111111111111111111111111', day: 1, token: tempToken },
      method: 'GET',
      headers: { origin: 'http://localhost' },
      json: true,
    });
    const expected = { batchTopicsList: expect.any(Array) };
    expect(res).toEqual(expect.objectContaining(expected));
  });

  it('should give 400 when user is not authenticated', async () => {
    try {
      await request({
        url,
        qs: { batchId: '111111111111111111111111', day: 1 },
        method: 'GET',
        headers: { origin: 'http://localhost' },
        json: true,
      });
    } catch (e) {
      expect(e.statusCode).toBe(400);
    }
  });
});
