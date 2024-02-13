import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ParallaxProvider } from 'react-scroll-parallax';
import UserContext from './Context/userContext';
import FriendContext from "./Context/friendContext";
import StatContext from './Context/statContext';
import HomeFeedContext from './Context/homeFeedContext';
import ProfileNavigatorContext from './Context/profileNavigatorContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
      <UserContext>
        <StatContext>
        <FriendContext>
          <HomeFeedContext>
          <ProfileNavigatorContext>
          <ParallaxProvider>
              <App />
          </ParallaxProvider>
          </ProfileNavigatorContext>
          </HomeFeedContext>
        </FriendContext>
        </StatContext>
      </UserContext>
    </BrowserRouter>
);
