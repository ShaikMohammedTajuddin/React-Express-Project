import React,{useEffect,useState}from 'react'
import NavBar from './NavBar'
import Table from 'react-bootstrap/Table';
import OdaApiService from '../api';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; 
import Card from 'react-bootstrap/Card';

function AdminDashboard() {

  let [appointment,setAppointment] = useState([])
  let [status,setStatus] = useState("Pending")
  let navigate = useNavigate()
  let getData = async() =>{
    try{
      
      let res = await OdaApiService.get(`/appointmentbyStatus/${status}`)
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
        navigate('/login')
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
 },[status])

  return <div>
    <NavBar/>

    <div className='status-wrapper'>
    <Card style={{ width: '25%', "cursor":"pointer" }} onClick={()=>setStatus("Approved")}>
        <Card.Body>
        <Card.Title style={{"textAlign":"Center"}}><Button variant="success" size="lg">Approved</Button></Card.Title>
      </Card.Body>
    </Card>

    <Card style={{ width: '25%', "cursor":"pointer"  }} onClick={()=>setStatus("Pending")}>
        <Card.Body>
        <Card.Title style={{"textAlign":"Center"}}><Button variant="info" size="lg">Pending</Button></Card.Title>
      </Card.Body>
    </Card>

    <Card style={{ width: '25%', "cursor":"pointer" }} onClick={()=>setStatus("Rejected")}>
        <Card.Body>
        <Card.Title style={{"textAlign":"Center"}}> <Button variant="warning" size="lg">Rejected</Button></Card.Title>
      </Card.Body>
    </Card>

    <Card style={{ width: '25%', "cursor":"pointer" }} onClick={()=>setStatus("Cancelled")}>
        <Card.Body>
        <Card.Title style={{"textAlign":"Center"}}><Button variant="danger" size="lg">Cancelled</Button></Card.Title>
      </Card.Body>
    </Card>

    </div>

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
          <th>Applied At</th>
        </tr>
      </thead>
      <tbody>
        {
          appointment.map((e,i)=>{
            return <tr key={e._id}>
              <td onClick={()=>navigate(`/appointment/${e._id}`)} style={{"cursor":"pointer"}}>{i+1}</td>
              <td onClick={()=>navigate(`/appointment/${e._id}`)} style={{"cursor":"pointer"}}>{e.type}</td>
              <td onClick={()=>navigate(`/appointment/${e._id}`)} style={{"cursor":"pointer"}}>{e.fromDate}</td>
              <td onClick={()=>navigate(`/appointment/${e._id}`)} style={{"cursor":"pointer"}}>{e.toDate}</td>
              <td onClick={()=>navigate(`/appointment/${e._id}`)} style={{"cursor":"pointer"}}>{e.noofdays}</td>
              <td onClick={()=>navigate(`/appointment/${e._id}`)} style={{"cursor":"pointer"}}>{e.status}</td>
              <td onClick={()=>navigate(`/appointment/${e._id}`)} style={{"cursor":"pointer"}}>{e.createdAt}</td>
              </tr>
          })
        }
      </tbody>
    </Table>

      </div>
  </div>
}

export default AdminDashboard