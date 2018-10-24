import { HTTP } from '../../../shared-utils/services/http';

export const verifyToken = body => HTTP.POST('/verifyToken', body);
