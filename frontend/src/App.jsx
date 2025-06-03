import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import {ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/authcontext'
import {Toaster} from 'react-hot-toast'
function App() {

  return (
    <>
    <AuthProvider>

      {/* <ToastContainer     position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover/> */}
        {/* <Toaster/> */}
        <Toaster position="bottom-center" reverseOrder={false} />
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
    </Routes>
    </BrowserRouter>
    
        </AuthProvider>
    </>
  )
}

export default App
