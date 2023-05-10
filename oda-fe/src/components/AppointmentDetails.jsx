import NavBar from './NavBar'
import React from 'react'
import { useState,useEffect,useCallback } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import OdaApiService from '../api';
import { toast } from 'react-toastify';
import { useNavigate,useParams } from 'react-router-dom'; 


function AppointmentDetails() {
  let role = sessionStorage.getItem('role')

  let navigate = useNavigate()
  let[firstName,setFirstName] = useState("")
  let[lastName,setLastName] = useState("")
  let[email,setEmail] = useState("")
  let[mobile,setMobile] = useState("")
  let[fromDate,setFromDate] = useState("")
  let[toDate,setToDate] = useState("")
  let[type,setType] = useState("")
  let[reason,setReason] = useState("")

  let params = useParams()

  let getProperDate = (date)=>{
    let newDate = new Date(date)
    let day = newDate.getDate()
    let month = newDate.getMonth()+1
    month = month<10?`0${month}`:month
    let year = newDate.getFullYear()

    return(`${year}-${month}-${day}`)
  }

  let getData = async() =>{
    try{
      let res = await OdaApiService.get(`/appointmentbyId/${params.id}`)
       if(res.status===200)
       {
        setFirstName(res.data.firstName)
        setLastName(res.data.lastName)
        setEmail(res.data.email)
        setMobile(res.data.mobile)
        setFromDate(getProperDate(res.data.fromDate))
        setToDate(getProperDate(res.data.toDate))
        setType(res.data.type)
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

  let handleStatusChange = async (status)=>{
    try{
      let res = await OdaApiService.put(`/change-status/${params.id}/${status}`)
      if (res.status===200)
      {
        toast.success(res.data.message)
        role==='admin'?navigate('/admin-dashboard'):navigate('/user-dashboard')
      }
    }catch(error){
        console.log(error)
        toast.error(error.response.data.message)
        if(error.response.status===401)
        {
          sessionStorage.clear()
        }
    }
  }
  
  let handleCancelAppointment = async(id)=>{
    try{
         let res = await OdaApiService.put(`/cancel-appointment/${params.id}`)
         if(res.status=== 200)
         {
           toast.success(res.data.message)
           getData()
         }
    }catch(error){
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
        <Form.Control type="date" value={fromDate} onChange={(e)=>setFromDate(e.target.value)} disabled/> 
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>To</Form.Label>
        <Form.Control type="date" value={toDate} onChange={(e)=>setToDate(e.target.value)} disabled/> 
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Type</Form.Label>
        <Form.Select onChange={(e)=>setType(e.target.value)} value={type} disabled>
          <option value="Select Type">Select Type</option>
          <option value={"Teeth Cleaning"}>Teeth Cleaning</option>
          <option value={"Root Canal"}>Root Canal</option>
          <option value={"Teeth Removing<"}>Teeth Removing</option>
        </Form.Select>
      </Form.Group>

      {/* <Form.Group className="mb-3" >
        <Form.Label>Reason</Form.Label>
        <Form.Control as textarea type="text" value={reason} placeholder="Reason"onClick={(e)=>setReason(e.target.value)}/>
      </Form.Group> */}
      {
        role==='admin'?<>
        <Button variant="primary" onClick={()=>handleStatusChange("Approved")}>
          Approve
        </Button>
        &nbsp;
        &nbsp;
        <Button variant="primary" onClick={()=>handleStatusChange("Rejected")}>
          Reject
        </Button>
        </>:
         <Button variant="primary" onClick={()=>handleCancelAppointment()}>
      Cancel
      </Button>
      }
    
    </Form>
</div>
  </div>
}

export default AppointmentDetails 