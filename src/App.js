import './App.css';
import Landing from './Pages/Landing';
import Register from './Pages/RegisterPage';
import { Routes,Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Home from './Pages/Home';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/newUser' element={<Register/>}/>
        <Route path='/home' element={<Home/>}/>
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
