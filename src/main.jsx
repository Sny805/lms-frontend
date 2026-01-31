import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider, useSelector } from 'react-redux'
import { appStore } from './store/store'
import { Toaster } from 'sonner'
import { useLoadUserQuery } from './features/api/authApi'
import LoadingSpinner from './components/LoadingSpinner'


const Custom = ({ children }) => {
  const isAuthenticated = useSelector(
    (state) => state.auth.isAuthenticated
  );

  const { isLoading } = useLoadUserQuery(undefined, {
    skip: !isAuthenticated,
  });

  if (isAuthenticated && isLoading) {
    return <LoadingSpinner />;
  }

  return <>{children}</>;
};


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={appStore}>
      <Custom>
        <App />
        <Toaster />
      </Custom>
    </Provider>
  </StrictMode>,
)
