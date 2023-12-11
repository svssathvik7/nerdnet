import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import {createStore} from "redux";
import { Provider } from 'react-redux';
import rootReducer from './Redux/Reducers/rootReducer';
import UserContext from './Context/userContext';
const store = createStore(rootReducer);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserContext>
        <Provider store={store}>
          <App />
        </Provider>
      </UserContext>
    </BrowserRouter>
  </React.StrictMode>
);
