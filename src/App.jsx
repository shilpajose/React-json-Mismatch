import './App.css'
import { Route, Routes } from 'react-router-dom'
import AdminDashboard from './Pages/AdminDashboard'
import Mismatch from './Pages/Mismatch'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<AdminDashboard/>}></Route>
        <Route path='/admindashboard' element={<AdminDashboard/>}></Route>
        <Route path='/mismatch' element={<Mismatch/>}></Route>
      </Routes>
    </>
  )
}

export default App
