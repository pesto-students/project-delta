import mongoose from 'mongoose';
import request from 'request-promise-native';

import app from '../src';
import { DB_URL } from '../config';
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
let serverUrl;

beforeAll((done) => {
  mongoose.connect(DB_URL, { useNewUrlParser: true }, () => {
    server = app.listen(() => {
      serverUrl = `http://localhost:${server.address().port}`;

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
  let url;

  beforeAll(() => {
    url = `${serverUrl}/generateToken`;
  });

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
  let url;

  beforeAll(() => {
    url = `${serverUrl}/verifyToken`;
  });

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

describe('POST: /user - update users details if not creates new user', () => {
  let url;
  let verifyTokenUrl;
  const testUser = {
    firstName: 'Vipul',
    lastName: 'Rawat',
    email: 'vipultests@gmail.com',
    role: 'instructor',
  };

  beforeAll(() => {
    url = `${serverUrl}/user`;
    verifyTokenUrl = `${serverUrl}/verifyToken`;
  });

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

  it('should return 200 on creation of new user', (done) => {
    tokenService.generate({
      email: 'vipultests@gmail.com',
      tokenType: 'EMAIL_VERIFICATION',
    }).then((token) => {
      request({
        url: verifyTokenUrl,
        method: 'POST',
        body: { token },
        json: true,
        resolveWithFullResponse: true,
      }).then((res) => {
        request({
          url,
          method: 'POST',
          body: { ...testUser, token: res.body.token },
          json: true,
          resolveWithFullResponse: true,
        }).then((result) => {
          expect(result.statusCode).toBe(200);
          done();
        });
      });
    });
  });
  it('should return 200 on updation of an existing user', (done) => {
    const updatedValues = {
      firstName: 'NEWNAME',
    };
    tokenService.generate({
      email: 'vipultests@gmail.com',
      tokenType: 'EMAIL_VERIFICATION',
    }).then((token) => {
      request({
        url: verifyTokenUrl,
        method: 'POST',
        body: { token },
        json: true,
        resolveWithFullResponse: true,
      }).then((res) => {
        request({
          url,
          method: 'POST',
          body: { ...updatedValues, token: res.body.token },
          json: true,
          resolveWithFullResponse: true,
        }).then((result) => {
          expect(result.statusCode).toBe(200);
          done();
        });
      });
    });
  });

  it('should not update any invalidated value of an existing user like invalid email', (done) => {
    const updatedValues = {
      email: '123',
    };
    tokenService.generate({
      email: 'vipultests@gmail.com',
      tokenType: 'EMAIL_VERIFICATION',
    }).then((token) => {
      request({
        url: verifyTokenUrl,
        method: 'POST',
        body: { token },
        json: true,
        resolveWithFullResponse: true,
      }).then((res) => {
        request({
          url,
          method: 'POST',
          body: { ...updatedValues, token: res.body.token },
          json: true,
          resolveWithFullResponse: true,
        }).catch((e) => {
          expect(e.statusCode).toBe(400);
          done();
        });
      });
    });
  });
});
