import React from 'react'
import { useNavigate } from 'react-router-dom'

function NavBar() {
  let role = sessionStorage.getItem('role')
  let navigate = useNavigate()
  return <div className='nav-wrapper'>
    <div className='nav-left'>
      <h3>Online Doctor Appointment</h3>
    </div>
    <div className='nav-right'>

      <div className='nav-item'onClick={()=>{
        sessionStorage.clear()
        navigate('/login')
      }}>Logout</div>

      <div className='nav-item' onClick={()=>{
        role==='admin'?navigate('/admin-dashboard'):navigate('/user-dashboard')
      }}>Dashboard</div>

      {role==='patient'?<div className='nav-item'onClick={()=>navigate('/apply-appointment')}>Apply Appointment</div>:<></>}
  </div>
  </div>
}

export default NavBar