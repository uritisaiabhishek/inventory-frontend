import './App.scss'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './authentication/Login'
import Items from './pages/Items'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='items' element={<Items />} />
        <Route path='login' element={<Login />} />
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
