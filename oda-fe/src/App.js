import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom'
import AdminDashboard from './components/AdminDashboard';
import ApplyAppointment from './components/ApplyAppointment';
import AppointmentDetails from './components/AppointmentDetails';
import Login from './components/Login';
import UserDashboard from './components/UserDashboard';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
  <div>
  <Routes>
    <Route path="/login" element={ <Login/> }/>
    <Route path='/admin-dashboard' element={<AdminDashboard/>}/>
    <Route path='/user-dashboard' element={<UserDashboard/>}/>
    <Route path='/apply-appointment' element={<ApplyAppointment/>}/>
    <Route path='/appointment/:id' element={<AppointmentDetails/>}/>
    <Route path='*' element={<Navigate to='login'/>}/>
   </Routes>
   <ToastContainer 
   autoClose={1000}
   />

   </div>
    
  )
}

export default App;
