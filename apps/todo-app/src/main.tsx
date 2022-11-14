import * as ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { appRouter } from './app/AppRouter';
import { AppStyleProvider } from './AppStyleProvider';
import { AppModal } from './components';
import { rootStore } from './redux/rootStore';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <AppStyleProvider>
    <Provider store={rootStore}>
      <RouterProvider router={appRouter} />
      <AppModal />
    </Provider>
  </AppStyleProvider>
);
