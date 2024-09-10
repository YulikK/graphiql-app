import { SavedGraphqlRequest, SavedRestRequest } from '../models/types';

export function updateStatuses(
  arr: (SavedRestRequest | SavedGraphqlRequest)[]
) {
  const updatedArr = [...arr];

  for (let i = updatedArr.length - 1; i >= 0; i -= 1) {
    if (updatedArr[i].status === 100) {
      let newStatus = null;

      for (let j = i - 1; j >= 0; j -= 1) {
        if (
          Math.floor(updatedArr[j].status) === 2 ||
          Math.floor(updatedArr[j].status) >= 4
        ) {
          newStatus = updatedArr[j].status;
          break;
        }
      }

      if (newStatus !== null) {
        updatedArr[i].status = newStatus;
      }
    }
  }

  return updatedArr;
}
