// import { HTTP as httpService } from './http';

export function getActiveBatches() {
  // return httpService.GET('/batches?filter=active');
  return Promise.resolve([
    {
      _id: '111111111111111111111111',
      city: 'New Delhi',
      batchNumber: 1,
      batchId: 'New Delhi #1',
      numberOfDays: 30,
      startDate: new Date(),
      endDate: new Date(),
    },
    {
      _id: '111111111111111111111112',
      city: 'New Delhi',
      batchNumber: 2,
      batchId: 'New Delhi #2',
      numberOfDays: 30,
      startDate: new Date(),
      endDate: new Date(),
    },
    {
      _id: '111111111111111111111113',
      city: 'New Delhi',
      batchNumber: 3,
      batchId: 'New Delhi #3',
      numberOfDays: 30,
      startDate: new Date(),
      endDate: new Date(),
    },
  ]);
}
