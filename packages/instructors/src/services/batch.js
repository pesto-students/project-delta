import { HTTP } from '../../../shared-utils/services/http';

export const creatNewBatch = batchInfo => HTTP.POST('/instructor/batch/create', { ...batchInfo });

export const getBatchList = () => HTTP.GET('/instructor/batch/list');
