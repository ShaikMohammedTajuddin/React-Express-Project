import NavBar from './NavBar'
import React from 'react'
import { useState,useEffect,useCallback } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import OdaApiService from '../api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; 

function ApplyAppointment() {
  let userid = sessionStorage.getItem('userid')
  let navigate = useNavigate()
  let[firstName,setFirstName] = useState("")
  let[lastName,setLastName] = useState("")
  let[email,setEmail] = useState("")
  let[mobile,setMobile] = useState("")
  let[fromDate,setFromDate] = useState("")
  let[toDate,setToDate] = useState("")
  let[type,setType] = useState("")
  let[reason,setReason] = useState("")

  let dateDifference = ()=>{
    const date1 = new Date(fromDate);
    const date2 = new Date(toDate);
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    return diffDays+1
  }


  let getData = async() =>{
    try{
      let res = await OdaApiService.get('/users/details/${userid}')
       if(res.status===200)
       {
        setFirstName(res.body.user.firstName)
        setLastName(res.body.user.lastName)
        setEmail(res.body.user.email)
        setMobile(res.body.user.mobile)
       }

    } catch (error){
      console.log(error)
      toast.error(error.response.data.message)
      if(error.response.status===401)
      {
        sessionStorage.clear()
      }
    }
  }
  
  useEffect(() => {
    if(sessionStorage.getItem('token'))
    getData()
    else
    {
      sessionStorage.clear()
    }
  },[])

  let handleApplyAppointment = async () => {
    console.log('first name',firstName)
  try{
    let noofdays = dateDifference()
  let res = await OdaApiService.post('/apply-appointment',{
    firstName,
    lastName,
    email,
    mobile,
    fromDate,
    toDate,
    noofdays,
    type,
    reason
  })
  if(res.status===200)
  {
    toast.success(res.data.message)
    navigate('/user-dashboard')
  }
  }
  catch(error){
    console.log(error)
      toast.error(error.response.data.message)
      if(error.response.status===401)
      {
        sessionStorage.clear()
       }
    }
  }
  return <div>
    <NavBar/>
<div className='container'>
<Form>
<Form.Group className="mb-3" >
        <Form.Label>First Name</Form.Label>
        <Form.Control type="text"  placeholder="Enter First Name" value={firstName} onChange={(e)=>setFirstName(e.target.value)}/> 
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Last Name</Form.Label>
        <Form.Control type="text"  placeholder="Enter Last Name" value={lastName} onChange={(e)=>setLastName(e.target.value)}/> 
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email"  placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)}/> 
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Mobile</Form.Label>
        <Form.Control type="text" placeholder="Enter mobile" value={mobile} onChange={(e)=>setMobile(e.target.value)}/> 
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>From</Form.Label>
        <Form.Control type="date" onChange={(e)=>setFromDate(e.target.value)}/> 
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>To</Form.Label>
        <Form.Control type="date" onChange={(e)=>setToDate(e.target.value)}/> 
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Type</Form.Label>
        <Form.Select onChange={(e)=>setType(e.target.value)} defaultValue="Select Type">
          <option value="Select Type">Select Type</option>
          <option value={"Teeth Cleaning"}>Teeth Cleaning</option>
          <option value={"Root Canal"}>Root Canal</option>
          <option value={"Teeth Removing<"}>Teeth Removing</option>
        </Form.Select>
      </Form.Group>

      {/* <Form.Group className="mb-3" >
        <Form.Label>Reason</Form.Label>
        <Form.Control as textarea type="text" placeholder="Reason"onClick={(e)=>setReason(e.target.value)}/>
      </Form.Group> */}
      
      <Button variant="primary" onClick={()=>handleApplyAppointment()}>Apply Appointment</Button>
     </Form>
    </div>
  </div>
}

export default ApplyAppointment 