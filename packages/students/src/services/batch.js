import { HTTP as httpService } from '../../../shared-utils/services/http';

export function getActiveBatches() {
  return httpService.GET('/instructor/batch/list', undefined, undefined, false)
    .then((res) => {
      if (!res.ok) throw new Error();
      return res.json();
    });
}
