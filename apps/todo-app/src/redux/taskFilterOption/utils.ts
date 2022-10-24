import { ReduxTaskData } from '../types';
import { TaskFilterOptionState } from './type';

export function createPredicateFunctionFromFilterOptions(
  options: TaskFilterOptionState
) {
  const { categories } = options;
  const predicate = (task: ReduxTaskData) => {
    let result = false;
    for (let c of categories) {
      if (c.categoryId === task.categoryId) {
        result = true;
        break;
      }
    }
    return result;
  };

  return predicate;
}
