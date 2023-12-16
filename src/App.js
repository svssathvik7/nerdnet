import './App.css';
import Landing from './Pages/Landing';
import Register from './Pages/RegisterPage';
import { Routes,Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Profile from './Pages/Profile';
import AboutLanding from './DescriptorPage/AboutLanding';
import Home from './Pages/Home';
import AddPostForm from './Components/AddPost/AddPostForm';
import { useState,useEffect } from 'react';
import Loader from "./assets/Loader.json";
import Lottie from 'lottie-react';
function App() {
  const [loading, setLoading] = useState(true);
  useEffect(
    ()=>{
      setLoading(true);

      const timeoutId = setTimeout(() => {
        setLoading(false);
      }, 2000);
      return () => clearTimeout(timeoutId);
    }
  ,[]);
  return (
    loading ?
      <div className='absolute w-screen h-screen top-0 bottom-0 left-0 right-0 m-auto flex items-center justify-center bg-white'>
        <Lottie loop={true} animationData={Loader} className='w-52'/>
      </div>
    :
    <div className="App">
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/newUser' element={<Register/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/about' exact Component={AboutLanding}/>
        <Route path='/postForm' exact Component={AddPostForm}/>
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
