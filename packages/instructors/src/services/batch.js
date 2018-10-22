import { HTTP } from './http';

export const creatNewBatch = batchInfo => HTTP.POST('/instructor/batch/create', { ...batchInfo });
