import { HTTP } from '../../../shared-utils/services/http';

export const generateToken = body => HTTP.POST('/generateToken', body);
