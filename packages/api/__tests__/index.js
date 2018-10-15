import mongoose from 'mongoose';
import request from 'request-promise-native';

import app from '../src';
import { PORT, DB_URL } from '../config';
import tokenService from '../src/services/token';
import { User } from '../src/db';

let savedUsers;
const dummyUsers = [
  {
    firstName: 'Anirudh',
    lastName: 'Nimmagadd',
    email: 'anirudh.nimmagadda@gmail.com',
    role: 'student',
    batchId: mongoose.Types.ObjectId('111111111111111111111111'),
  },
  {
    firstName: 'Bharani',
    lastName: 'Dharani',
    email: 'bharani.dharan@gmail.com',
    role: 'student',
    batchId: mongoose.Types.ObjectId('111111111111111111111112'),
  },
  {
    firstName: 'Vipul',
    lastName: 'Rawat',
    email: 'vipul.rawat@gmail.com',
    role: 'student',
    batchId: mongoose.Types.ObjectId('111111111111111111111113'),
  },
];

let server;
const serverUrl = `http://localhost:${PORT}`;

beforeAll((done) => {
  jest.setTimeout(10000);
  mongoose.connect(DB_URL, { useNewUrlParser: true }, () => {
    server = app.listen(PORT, () => {
      // save current contents of users collection, and insert some dummy users
      User.find({})
        .then((users) => {
          savedUsers = users;
          return Promise.resolve(true);
        })
        .then(() => User.deleteMany({}))
        .then(() => User.insertMany(dummyUsers))
        // do not pass 'done' directly to 'then'
        //   it will get an argument, and that will cause tests to fail!
        .then(() => done());
    });
  });
});

afterAll((done) => {
  // restore previous content of users collection
  User.deleteMany({})
    .then(() => User.insertMany(savedUsers))
    .then(() => mongoose.connection.close())
    .then(() => server.close(done));
});

describe('/generateToken', () => {
  const url = `${serverUrl}/generateToken`;

  it('should send a 400 response when request contains no email', (done) => {
    request({
      url,
      method: 'POST',
    }).catch((e) => {
      expect(e.statusCode).toBe(400);
      done();
    });
  });

  it('should send a 400 response when request contains an invalid email', (done) => {
    request({
      url,
      method: 'POST',
      body: { email: 'abc' },
      json: true,
    }).catch((e) => {
      expect(e.statusCode).toBe(400);
      done();
    });
  });

  it('should send a 200 response when request contains a valid email', (done) => {
    request({
      url,
      method: 'POST',
      body: { email: 'anirudh.nimmagadda@gmail.com' },
      json: true,
      resolveWithFullResponse: true,
    }).then((res) => {
      expect(res.statusCode).toBe(200);
      done();
    });
  });
});

describe('/verifyToken', () => {
  const url = `${serverUrl}/verifyToken`;

  it('should send a 400 response when request contains no token', (done) => {
    request({
      url,
      method: 'POST',
    }).catch((e) => {
      expect(e.statusCode).toBe(400);
      done();
    });
  });

  it('should send a 400 response when request contains invalid token', (done) => {
    request({
      url,
      method: 'POST',
      body: { token: 'abc' },
      json: true,
    }).catch((e) => {
      expect(e.statusCode).toBe(400);
      done();
    });
  });

  it('should send a 200 response with set-cookie header and isNewUser false when token has valid email that is already in DB', (done) => {
    tokenService.generate({
      email: 'anirudh.nimmagadda@gmail.com',
      tokenType: 'EMAIL_VERIFICATION',
    })
      .then((token) => {
        request({
          url,
          method: 'POST',
          body: { token },
          json: true,
          resolveWithFullResponse: true,
        }).then((res) => {
          expect(res.statusCode).toBe(200);
          expect(/^token=/.test(res.headers['set-cookie'])).toBe(true);
          expect(res.body.isNewUser).toBe(false);
          done();
        });
      });
  });

  it('should send a 200 response with set-cookie header and isNewUser true when token has valid email that is not already in DB', (done) => {
    tokenService.generate({
      email: 'anirudh.nimmagadd@gmail.com',
      tokenType: 'EMAIL_VERIFICATION',
    })
      .then((token) => {
        request({
          url,
          method: 'POST',
          body: { token },
          json: true,
          resolveWithFullResponse: true,
        }).then((res) => {
          expect(res.statusCode).toBe(200);
          expect(/^token=/.test(res.headers['set-cookie'])).toBe(true);
          expect(res.body.isNewUser).toBe(true);
          done();
        });
      });
  });

  it('should not try to set another cookie when provided a LOGIN token', (done) => {
    tokenService.generate({ email: 'anirudh.nimmagadda@gmail.com', tokenType: 'LOGIN' })
      .then((token) => {
        request({
          url,
          method: 'POST',
          body: { token },
          json: true,
          resolveWithFullResponse: true,
        }).then((res) => {
          expect(res.statusCode).toBe(200);
          expect(Reflect.has(res.headers, 'set-cookie')).toBe(false);
          expect(res.body.isNewUser).toBe(false);
          done();
        });
      });
  });
});
