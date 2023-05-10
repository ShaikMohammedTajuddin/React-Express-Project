import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import OdaApiService from '../api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


function Login() {
  let [email,setEmail] = useState("")
  let [password,setPassword] = useState("")
  let navigate = useNavigate()
  let handleLogin = async()=>{
    try{
    let res = await OdaApiService.post('users/login',{email,password})
    console.log("Hai Mohammed Tajuddin...!", res)
    if(res.status===200)
    {
      sessionStorage.setItem('token',res.data.token)
      sessionStorage.setItem('userid',res.data.userid)
      sessionStorage.setItem('role',res.data.role)
      toast.success(res.data.message)

      if(res.data.role==='admin')
      navigate('/admin-dashboard')
      else
      navigate('/user-dashboard')
    }
    }catch(error){
      console.log(error)
      toast.error(error.response.data.message)
    }
  }

  return <div className='container'>
    <h1 className='text-center'>Welcome to Online Doctor Appointment webpage...!</h1>
    <h2 className='text-center'> Patient Login Here</h2>

  <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Email address</Form.Label>
      <Form.Control type="email" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)}/> 
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control type="text" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
      </Form.Group>
      
      <Button variant="primary" onClick={handleLogin}>Submit</Button>

    </Form>
  </div>
}

export default Login