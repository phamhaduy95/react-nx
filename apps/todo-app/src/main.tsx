import * as ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { appRouter } from './app/AppRouter';
import { AppStyleProvider } from './AppStyleProvider';
import { AppModalProps, AppModal } from './components/AppModal';
import { rootStore } from './redux/rootStore';
import { ModalType } from './type/model';
import { AddAndUpdateCategoryModal } from './components/CategoryModal/AddAndUpdateCategoryModal';
import { DeleteCategoryModal } from './components/CategoryModal/DeleteCategoryModal';
import { DeleteTaskModal } from './components/TaskModal';
import { ErrorModal, LoadingModal } from './components/NotificationModal';
import { SuccessModal } from './components/NotificationModal/SuccessModal';
import { ManageCategoriesModal } from './components/CategoryModal';
import CategoryFilterModal from './components/CategoryFilterModal/CategoryFilterModal';
import { AddAndUpdateTaskModal } from './components/TaskModal/AddAndUpdateTaskModal';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const registeredModals:AppModalProps["registerModalsList"]  = [
  {type:ModalType.addAndUpdateCategory,
    modal:<AddAndUpdateCategoryModal/>
  },
  {
    type:ModalType.addAndUpdateTask,
    modal:<AddAndUpdateTaskModal/>
  },
  {
    type:ModalType.deleteCategory,
    modal:<DeleteCategoryModal/>
  },
  {
    type:ModalType.deleteTask,
    modal:<DeleteTaskModal/>
  },
  {
    type:ModalType.error,
    modal:<ErrorModal/>
  },
  {
    type:ModalType.loading,
    modal:<LoadingModal/>
  },
  {
    type:ModalType.success,
    modal:<SuccessModal/>
  },
  {
    type:ModalType.manageCategories,
    modal:<ManageCategoriesModal/>
  },
  {
    type:ModalType.filterCategory,
    modal:<CategoryFilterModal/>
  }
  
]

root.render(
  <AppStyleProvider>
    <Provider store={rootStore}>
      <RouterProvider router={appRouter} />
      <AppModal registerModalsList={
        registeredModals
      }/>
    </Provider>
  </AppStyleProvider>
);
