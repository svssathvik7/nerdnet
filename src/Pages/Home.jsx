import React from 'react';
import { connect } from 'react-redux';
import Header from '../Partials/Header';
import MiniNavBar from '../Components/Navbar/MiniNavBar';
import HomeFeed from '../Components/Feed/HomeFeed';
import AddPostBtn from '../Components/AddPost/AddPostBtn';
import AsideBar from '../Partials/AsideBar';

function Home({ data }) {
  return (
    <div id='home-page' className=''>
      <Header />
      {data.isMobile ? <MiniNavBar /> : null}
      <div className={`flex items-center ${data.isMobile ? " justify-center " : " justify-start "}`}>
        {data.isMobile ? null : <AsideBar />}
        <HomeFeed />
      </div>
      {data.isMobile ? null : <AddPostBtn />}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    data: {
      isMobile: state.isMobile,
    }
  };
};

export default connect(mapStateToProps)(Home);