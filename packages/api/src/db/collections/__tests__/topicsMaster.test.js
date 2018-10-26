import mongoose from 'mongoose';
import { DB_URL } from '../../../../config';

import {
  getAllMasterTopics,
  insertMasterTopic,
  updateMasterTopic,
  deleteMasterTopic,
} from '../topicsMaster';
import { TopicMaster } from '../../index';

describe('Mongo Queries: Topics Master', () => {
  const dummyTopics = [
    {
      name: 'Rebase',
      category: 'git',
      day: 1,
      archive: false,
    },
    {
      name: 'Merge',
      category: 'css',
      day: 2,
      archive: false,
    },
    {
      name: 'Conflict',
      category: 'git',
      day: 1,
      archive: false,
    },
    {
      name: 'ExtraTerrestrial',
      category: 'javascript',
      day: 4,
      archive: true,
    },
  ];

  beforeAll(async () => {
    await mongoose.connect(DB_URL, { useNewUrlParser: true, connectTimeoutMS: 10000 });
    await TopicMaster.insertMany(dummyTopics);
  });

  afterAll(async () => {
    await TopicMaster.deleteMany({});
    await mongoose.disconnect();
  });

  describe('Get topics master', () => {
    it('should return all master topic documents that are not archived', async () => {
      const topicsList = await getAllMasterTopics();

      const archivedList = dummyTopics.filter(topic => topic.archive);
      const expectedLength = dummyTopics.length - archivedList.length;
      expect(topicsList.length).toBe(expectedLength);
    });
  });

  describe('New topics master', () => {
    const newDocument = {
      name: 'Conflict_new',
      category: 'git',
      day: 1,
    };

    afterEach(async () => {
      await TopicMaster.deleteOne(newDocument);
    });

    it('should insert new document', async () => {
      await insertMasterTopic(newDocument);

      const topic = await TopicMaster.findOne(newDocument);
      expect(topic).toBeDefined();
    });

    it('should return inserted document', async () => {
      const insertedDocument = await insertMasterTopic(newDocument);

      const topic = await TopicMaster.findOne({ _id: insertedDocument._id });
      expect(topic).toBeDefined();
    });
  });

  describe('Update topic master', () => {
    const newDocument = {
      name: 'Conflict_new',
      category: 'git',
      day: 1,
    };

    beforeEach(async () => {
      const insertedDocument = await insertMasterTopic(newDocument);
      newDocument._id = insertedDocument._id;
    });

    afterEach(async () => {
      await TopicMaster.deleteOne(newDocument);
    });

    it('should update document to new value', async () => {
      const updatedValue = {
        name: 'Conflict_new',
        category: 'Git',
        day: 3,
      };
      await updateMasterTopic(newDocument._id, updatedValue);

      const topic = await TopicMaster.findOne(updatedValue);
      expect(topic).toBeDefined();
    });
  });

  describe('Delete topic master', () => {
    const newDocument = {
      name: 'Es6',
      category: 'Javascript',
      day: 1,
    };

    beforeEach(async () => {
      const insertedDocument = await insertMasterTopic(newDocument);
      newDocument._id = insertedDocument._id;
    });

    afterEach(async () => {
      await TopicMaster.deleteOne(newDocument);
    });

    it('should update document archive value', async () => {
      await deleteMasterTopic(newDocument._id);

      const topic = await TopicMaster.findOne(newDocument);
      expect(topic.archive).toBe(true);
    });
  });
});
