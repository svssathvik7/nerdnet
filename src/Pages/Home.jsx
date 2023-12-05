import React from 'react'
import Header from '../Partials/Header'
import MiniNavBar from '../Components/Navbar/MiniNavBar'
import { connect } from 'react-redux'
import HomeFeed from '../Components/Feed/HomeFeed'
function Home({data}) {
  return (
    <div id='home-page' className=''>
      <Header/>
      {data.isMobile ? <MiniNavBar/> : <></>}
      <HomeFeed/>
    </div>
  )
}
const mapStateToProps = (state)=>{
  return {
    data : {
      isMobile : state.isMobile,
    }
  }
}
export default connect(mapStateToProps)(Home);