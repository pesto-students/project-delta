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

  it('should send a 400 response when request contains a falsy origin header', (done) => {
    request({
      url,
      method: 'POST',
      headers: { origin: '' },
      body: { email: 'anirudh.nimmagadda@gmail.com' },
      json: true,
    }).catch((e) => {
      expect(e.statusCode).toBe(400);
      done();
    });
  });

  it('should send a 400 response when request contains no email', (done) => {
    request({
      url,
      headers: { origin: 'http://localhost' },
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
      headers: { origin: 'http://localhost' },
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
      headers: { origin: 'http://localhost' },
      body: { email: 'anirudh12nimmagadda34@mailinator.com' },
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

describe('/api/profile/createUser', () => {
  const verifyTokenUrl = `${serverUrl}/verifyToken`;
  const url = `${serverUrl}/api/profile/createUser`;
  const testUser = {
    firstName: 'Vipul',
    lastName: 'Rawat',
    email: 'vipultests@gmail.com',
    role: 'instructor',
  };
  it('should send a 400 response when request contains no body', (done) => {
    request({
      url,
      method: 'POST',
      body: {},
      json: true,
    }).catch((e) => {
      expect(e.statusCode).toBe(400);
      done();
    });
  });

  it('should send a 400 response when request contains invalid email', (done) => {
    const mockTestUser = Object.assign({}, testUser);
    mockTestUser.email = 'abc';
    request({
      url,
      method: 'POST',
      body: mockTestUser,
      json: true,
    }).catch((e) => {
      expect(e.statusCode).toBe(400);
      done();
    });
  });

  it('should send a 400 response when first name is missing', (done) => {
    const mockTestUser = Object.assign({}, testUser);
    delete mockTestUser.firstName;
    request({
      url,
      method: 'POST',
      body: mockTestUser,
      json: true,
    }).catch((e) => {
      expect(e.statusCode).toBe(400);
      done();
    });
  });

  it('should send a 400 response when last name is missing', (done) => {
    const mockTestUser = Object.assign({}, testUser);
    delete mockTestUser.lastName;
    request({
      url,
      method: 'POST',
      body: mockTestUser,
      json: true,
    }).catch((e) => {
      expect(e.statusCode).toBe(400);
      done();
    });
  });

  it('should send a 400 response when email is missing', (done) => {
    const mockTestUser = Object.assign({}, testUser);
    delete mockTestUser.email;
    request({
      url,
      method: 'POST',
      body: mockTestUser,
      json: true,
    }).catch((e) => {
      expect(e.statusCode).toBe(400);
      done();
    });
  });
  it('should return 201 on creation of new user', (done) => {
    tokenService.generate({
      email: 'vipulrawat007@gmail.com',
      tokenType: 'EMAIL_VERIFICATION',
    }).then((token) => {
      request({
        url: verifyTokenUrl,
        method: 'POST',
        body: { token },
        json: true,
        resolveWithFullResponse: true,
      }).then((res) => {
        const cooky = res.headers['set-cookie'][0].substr(6, 200);
        request({
          url,
          method: 'POST',
          body: { ...testUser, token: cooky },
          json: true,
          resolveWithFullResponse: true,
        }).then((result) => {
          expect(result.statusCode).toBe(201);
          done();
        });
      });
    });
  });
  it('should send a 500 response when a duplicate copy is present', (done) => {
    tokenService.generate({
      email: 'vipulrawat007@gmail.com',
      tokenType: 'EMAIL_VERIFICATION',
    }).then((token) => {
      request({
        url: verifyTokenUrl,
        method: 'POST',
        body: { token },
        json: true,
        resolveWithFullResponse: true,
      }).then((res) => {
        const cooky = res.headers['set-cookie'][0].substr(6, 200);
        request({
          url,
          method: 'POST',
          body: { ...testUser, token: cooky },
          json: true,
          resolveWithFullResponse: true,
        }).catch((e) => {
          expect(e.statusCode).toBe(500);
          done();
        });
      });
    });
  });
});

describe('Router: /instructor/batch', () => {
  describe('POST: /list', () => {
    const url = `${serverUrl}/instructor/batch/list`;

    it('should send batchList as an array', async () => {
      const res = await request({
        url,
        method: 'POST',
        headers: { origin: 'http://localhost' },
        json: true,
      });

      const expected = { batchList: expect.any(Array) };

      expect(res).toEqual(expect.objectContaining(expected));
    });
  });
});
