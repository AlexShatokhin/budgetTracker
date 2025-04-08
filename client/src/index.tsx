import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './react/pages/App/App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './react/store/store';
import './index.scss';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

