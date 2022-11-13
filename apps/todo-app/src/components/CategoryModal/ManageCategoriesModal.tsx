import {
  Button,
  IconButton,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ToolTips,
} from '@phduylib/my-component';
import CloseIcon from '@mui/icons-material/Close';
import { useAppAction, useAppDispatch } from '../../redux';
import { ModalType, ReduxCategoryData } from '../../redux/types';
import { appApi } from '../../redux/appApi/appApi';
import DeleteForever from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import './CategoryModal.scss';

const EmptyCategoriesArray: ReduxCategoryData[] = [];

export function ManageCategoriesModal() {
  const action = useAppAction();
  const dispatch = useAppDispatch();
  const { categories } = appApi.useGetAllForUserQuery(undefined, {
    selectFromResult: ({ data }) => {
      if (data === undefined) return { categories: EmptyCategoriesArray };
      return { categories: data };
    },
  });

  const closeModalSignal = () => {
    dispatch(action.AppModal.closeModal());
  };

  const renderCategoryCards = () => {
    if (categories.length === 0)
      return (
        <div className="ManageCategoriesModal__Message">
          There is no category
        </div>
      );

    return categories.map((category, index) => {
      return (
        <CategoryCard categoryData={category} key={`category-card-${index}`} />
      );
    });
  };

  const handleClickToReturn = () => {
    dispatch(action.AppModal.openModal(ModalType.filterCategory));
  };

  return (
    <>
      <ModalHeader className="AppModal__Header ">
        <span className="AppModal__Title">Manage Categories</span>
        <div className="AppModal__HeaderControl">
          <IconButton
            className="AppModal__CloseButton"
            onClick={closeModalSignal}
            variant="secondary"
          >
            <CloseIcon />
          </IconButton>
        </div>
      </ModalHeader>
      <ModalBody className="AppModal__Body ManageCategoryModal__Body">
        {renderCategoryCards()}
      </ModalBody>
      <ModalFooter>
        <Button
          className="ManageCategoryModal__ReturnButton"
          type="outlined"
          onClick={handleClickToReturn}
        >
          Return
        </Button>
      </ModalFooter>
    </>
  );
}

type CategoryCardProps = {
  categoryData: ReduxCategoryData;
};

function CategoryCard(props: CategoryCardProps) {
  const { categoryData } = props;
  const action = useAppAction();
  const dispatch = useAppDispatch();
  const handleEditClick = () => {
    dispatch(action.AppModal.openModal(ModalType.addAndUpdateCategory));
    dispatch(action.AddAndUpdateCategoryModal.updateCategory(categoryData));
  };

  const handleDeleteClick = () => {
    dispatch(action.AppModal.openModal(ModalType.deleteCategory));
    dispatch(
      action.DeleteCategoryModal.deleteCategory(categoryData.categoryId)
    );
  };

  return (
    <div className="CategoryModal__CategoryCard">
      <div className="CategoryCard__CategoryData">
        <span className="CategoryCard__CategoryName">{categoryData.name}</span>
        <span className="CategoryCard__CategoryDescription">
          {categoryData.description}
        </span>
      </div>
      <div className="CategoryCard__ButtonBox">
        <div className="CategoryCard__ButtonContainer CategoryCard__EditButton">
          <ToolTips text="Edit" placement="bottom-center">
            <IconButton onClick={handleEditClick}>
              <EditIcon />
            </IconButton>
          </ToolTips>
        </div>
        <div className="CategoryCard__ButtonContainer CategoryCard__DeleteButton">
          <ToolTips text="Delete" placement="bottom-center">
            <IconButton variant="danger" onClick={handleDeleteClick}>
              <DeleteForever />
            </IconButton>
          </ToolTips>
        </div>
      </div>
    </div>
  );
}
