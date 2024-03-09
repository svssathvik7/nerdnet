import './App.css';
import Landing from './Pages/Landing';
import Register from './Pages/RegisterPage';
import { Routes,Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Profile from './Pages/Profile';
import AboutLanding from './DescriptorPage/AboutLanding';
import Explore from './Pages/Explore';
import Search from './Pages/Search';
import Home from './Pages/Home';
import Communities from './Pages/Communities';
import AddPostForm from './Components/AddPost/AddPostForm';
import PostView from './Components/PostView/PostView';
import NotFound from './Pages/NotFound';
import Community from './Components/CommunitiesComponents/Community';
import CreateCommunity from './Components/CommunitiesComponents/CreateCommunity';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/newUser' element={<Register/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/profile/:profileemail' element={<Profile/>}/>
        <Route path='/about' exact element={<AboutLanding/>}/>
        <Route path='/postForm' exact element={<AddPostForm/>}/>
        <Route path='/search/:type/:searchQuery' element={<Search/>}/>
        <Route path='/explore' exact element={<Explore/>}/>
        <Route path='/posts/:postId' element={<PostView/>}/>
        <Route path='/communities' element={<Communities/>}/>
        <Route path='/create-community' element={<CreateCommunity/>}/>
        <Route path='/community/:community_id' exact element={<Community/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default App;
