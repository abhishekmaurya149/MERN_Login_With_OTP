
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Otp from './pages/Otp'
import Error from './pages/Error'
import Login from './pages/Login';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
    <Header/>
    
    <Routes>
      <Route path='/' element={<Login />}/>
      <Route path='/register' element={<Register />}/>
      <Route path='/dashboard' element={<Dashboard />}/>
      <Route path='/user/otp' element={<Otp />}/>
      <Route path='*' element={<Error />}/>      
    </Routes>
    </>
  );
}

export default App;
