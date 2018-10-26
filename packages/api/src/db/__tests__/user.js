import addDays from 'date-fns/add_days';

import { User } from '..';

describe('User model validation tests', () => {
  let exampleUser;

  beforeEach(() => {
    exampleUser = {
      firstName: 'Anirudh',
      lastName: 'Nimmagadda',
      email: 'anirudh.nimmagadda@gmail.com',
      batchId: '111122223333444455556666',
      role: 'student',
      sex: 'm',
      dob: new Date(1991, 4, 2),
      profilePicUrl: 'https://lh3.googleusercontent.com/-b2fwL216_m0/AAAAAAAAAAI/AAAAAAAAAAA/ZJocaz5rHUk/photo.jpg',
    };
  });

  it('should not pass validation if any of firstName, lastName, email are not provided', (done) => {
    const missingFirstName = new User({ ...exampleUser, firstName: undefined }).validate()
      .then(() => {
        throw new Error('Expected error when firstName missing');
      })
      .catch((e) => {
        expect(e.message).toEqual(expect.stringMatching(/Path `firstName` is required/));
      });

    const missingLastName = new User({ ...exampleUser, lastName: undefined }).validate()
      .then(() => {
        throw new Error('Expected error when lastName missing');
      })
      .catch((e) => {
        expect(e.message).toEqual(expect.stringMatching(/Path `lastName` is required/));
      });

    const missingEmail = new User({ ...exampleUser, email: undefined }).validate()
      .then(() => {
        throw new Error('Expected error when email missing');
      })
      .catch((e) => {
        expect(e.message).toEqual(expect.stringMatching(/Path `email` is required/));
      });

    Promise.all([missingEmail, missingFirstName, missingLastName])
      .then(() => done())
      .catch(done);
  });

  it('should only require batchId for students', (done) => {
    const missingBatchIdInstructor = new User({ ...exampleUser, role: 'instructor', batchId: undefined }).validate();

    const missingBatchIdStudent = new User({ ...exampleUser, batchId: undefined }).validate()
      .then(() => {
        throw new Error('Expected error when batchId missing for student');
      })
      .catch((e) => {
        expect(e.message).toEqual(expect.stringMatching(/Path `batchId` is required/));
      });

    Promise.all([missingBatchIdInstructor, missingBatchIdStudent])
      .then(() => done())
      .catch(done);
  });

  it('should pass validation even if dob, profilePic, and sex are missing', (done) => {
    const missingDob = new User({ ...exampleUser, dob: undefined }).validate();
    const missingPic = new User({ ...exampleUser, profilePicUrl: undefined }).validate();
    const missingSex = new User({ ...exampleUser, sex: undefined }).validate();
    Promise.all([missingDob, missingPic, missingSex])
      .then(() => done())
      .catch(done);
  });

  it('should only accept valid roles', (done) => {
    const roleStudent = new User({ ...exampleUser, role: 'student' }).validate();
    const roleInstructor = new User({ ...exampleUser, role: 'instructor' }).validate();
    const roleInvalid = new User({ ...exampleUser, role: 'god' }).validate()
      .then(() => {
        throw new Error('Expected error when trying to create user with invalid role');
      })
      .catch((e) => {
        expect(e.message).toEqual(expect.stringMatching(/^User validation failed: role/));
      });

    Promise.all([roleStudent, roleInstructor, roleInvalid])
      .then(() => done())
      .catch(done);
  });

  it('should only accept valid sexes', (done) => {
    const sexMale = new User({ ...exampleUser, sex: 'm' }).validate();
    const sexFemale = new User({ ...exampleUser, sex: 'f' }).validate();

    const sexInvalid = new User({ ...exampleUser, sex: '?' }).validate()
      .then(() => {
        throw new Error('Expected error when trying to create user with invalid sex');
      })
      .catch((e) => {
        expect(e.message).toEqual(expect.stringMatching(/^User validation failed: sex/));
      });

    Promise.all([sexMale, sexFemale, sexInvalid])
      .then(() => done())
      .catch(done);
  });

  it('should only accept dobs in the past', (done) => {
    const futureDob = new User({ ...exampleUser, dob: addDays(new Date(), 1) }).validate()
      .then(() => {
        throw new Error('Expected error when trying to create user with future dob');
      })
      .catch((e) => {
        expect(e.message).toEqual(expect.stringMatching(/^User validation failed: dob/));
      });

    const pastDob = new User({ ...exampleUser, dob: addDays(new Date(), -1) }).validate();

    Promise.all([futureDob, pastDob])
      .then(() => done())
      .catch(done);
  });

  it('should have a numeric property `age` when dob is provided', () => {
    const dobAbsent = new User({ ...exampleUser, dob: undefined });
    expect(dobAbsent.age).toBe(undefined);

    const dobPresent = new User({ ...exampleUser });
    expect(dobPresent.age).toBeDefined();
    expect(typeof dobPresent.age).toBe('number');
  });
});
