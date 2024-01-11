import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import {createStore} from "redux";
import { ParallaxProvider } from 'react-scroll-parallax';
import { Provider } from 'react-redux';
import rootReducer from './Redux/Reducers/rootReducer';
import UserContext from './Context/userContext';
import FriendContext from "./Context/friendContext";
import StatContext from './Context/statContext';
import HomeFeedContext from './Context/homeFeedContext';
import ProfileNavigatorContext from './Context/profileNavigatorContext';
const store = createStore(rootReducer);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
      <UserContext>
        <StatContext>
        <FriendContext>
          <HomeFeedContext>
          <ProfileNavigatorContext>
          <ParallaxProvider>
            <Provider store={store}>
              <App />
            </Provider>
          </ParallaxProvider>
          </ProfileNavigatorContext>
          </HomeFeedContext>
        </FriendContext>
        </StatContext>
      </UserContext>
    </BrowserRouter>
);
