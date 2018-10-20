import { batchTopicRoutes } from './batchTopics';

const dashboardRoutes = require('express').Router();

dashboardRoutes.use('/batchtopics', batchTopicRoutes);

module.exports = dashboardRoutes;
