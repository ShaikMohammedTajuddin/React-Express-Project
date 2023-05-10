import React,{useEffect,useState}from 'react'
import NavBar from './NavBar'
import Table from 'react-bootstrap/Table';
import OdaApiService from '../api';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; 
 
function UserDashboard() {

  let [appointment,setAppointment] = useState([])
  let navigate = useNavigate()
  let getData = async() =>{
    try{
      let userid = sessionStorage.getItem('userid')
      let res = await OdaApiService.get(`/users-appointment/${userid}`)
      console.log("res",res)
      if(res.status=== 200){
        setAppointment(res.data)
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
    getData()
    getData()
   
 },[])

 let handleCancelAppointment = async(id)=>{
 try{
      let res = await OdaApiService.put(`/cancel-appointment/${id}`)
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
console.log("appointment",appointment)

  return <div>
    <NavBar/>
    <div className='container-fluid'>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Type</th>
          <th>From</th>
          <th>To</th>
          <th>No of Days</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {
          appointment?.map((e,i)=>{
            return <tr key={e?._id}>
              <td onClick={()=>navigate(`/appointment/${e?._id}`)} style={{"cursor":"pointer"}}>{i+1}</td>
              <td onClick={()=>navigate(`/appointment/${e?._id}`)} style={{"cursor":"pointer"}}>{e?.type}</td>
              <td onClick={()=>navigate(`/appointment/${e?._id}`)} style={{"cursor":"pointer"}}>{e?.fromDate}</td>
              <td onClick={()=>navigate(`/appointment/${e?._id}`)} style={{"cursor":"pointer"}}>{e?.toDate}</td>
              <td onClick={()=>navigate(`/appointment/${e?._id}`)} style={{"cursor":"pointer"}}>{e?.noofdays}</td>
              <td onClick={()=>navigate(`/appointment/${e?._id}`)} style={{"cursor":"pointer"}}>{e?.status}</td>
              <td><Button variant='danger'onClick={()=>handleCancelAppointment(e?._id)} style={{"cursor":"pointer"}}>Cancel</Button></td>
            </tr>
          })
        }
      </tbody>
    </Table>

      </div>
  </div>
}

export default UserDashboard