import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './authentication/Login'
import Items from './pages/Items'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='items' element={<Items />} />
        <Route path='login' element={<Login />} />
      </Routes>
    </>
  )
}

export default App
