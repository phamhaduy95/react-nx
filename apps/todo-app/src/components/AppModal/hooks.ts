import { appApi } from '../../redux/appApi/appApi';
import { useRegisterResultToModal } from '../../utils/useRegisterResultToModal';

export function useRegisterAllMutationResultToAppModal() {
  const [, addCategoryResult] = appApi.useAddCategoryMutation({
    fixedCacheKey: 'shared',
  });
  useRegisterResultToModal(addCategoryResult);

  const [, updateCategoryResult] = appApi.useUpdateCategoryMutation({
    fixedCacheKey: 'shared',
  });
  useRegisterResultToModal(updateCategoryResult);

  const [, deleteCategoryResult] = appApi.useDeleteCategoryMutation({
    fixedCacheKey: 'shared',
  });
  useRegisterResultToModal(deleteCategoryResult);

  const [, updateTaskResult] = appApi.useUpdateTaskMutation({
    fixedCacheKey: 'shared',
  });
  useRegisterResultToModal(updateTaskResult);

  const [, addTaskResult] = appApi.useAddTaskMutation({
    fixedCacheKey: 'shared',
  });
  useRegisterResultToModal(addTaskResult);

  const [, deleteTaskResult] = appApi.useDeleteTaskMutation({
    fixedCacheKey: 'shared',
  });
  useRegisterResultToModal(deleteTaskResult);
}
