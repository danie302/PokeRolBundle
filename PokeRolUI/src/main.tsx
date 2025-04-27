import Router from './Router.tsx';
import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import axios from 'axios';
import './config/i18n';
import './index.css';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
