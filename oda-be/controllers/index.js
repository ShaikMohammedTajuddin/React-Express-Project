const {hashPass,hashCompare,createToken,decodeToken,validate,roleAdmin} = require('../common/auth')
const {AppointmentModel} = require('../schema/Appointment')
const { UserModel } = require('../schema/UserSchema')

let handleHome=async(req,res,next)=>{
    res.send(`<h1>Welcome to Back-end ExpressJS Home Page..! </h1>`)
  }

let handleApplyAppointment=async(req,res,next)=>{
  try{
    console.log("body",req.body)
        let data = await AppointmentModel.create(req.body)
        res.status(200).send({message:"Appointment Request Applied Successfully"})
        } catch (error) {
        console.log(error)
        res.status(500).send({message:"Internal Server Error"})
        }
    }

let handleChangeStatus = async(req, res, next)=>{
    try{
         console.log("Appointment---->",req.params.id)
        // let data = await AppointmentModel.updateOne({_id:req.params.id},{$set:{status:`${req.params.toStatus}`}})
        res.status(200).send({message:"Status Updated Successfully"})
        }catch (error) {
        console.log(error)
        res.status(500).send({message:"Internal Server Error"})
        }
   }

let handleCancelAppointment = async(req, res, next)=>{
    try{
        let data = await AppointmentModel.updateOne({_id:req.params.id},{$set:{status:`Cancelled`}})
        res.status(200).send({message:"Status Cancelled Successfully"})
        console.log("asdf::", data)
        }catch (error) {
        console.log(error)
        res.status(500).send({message:"Internal Server Error"})
        }
   }

let handleGetAppointmentById = async(req, res, next)=>{
  console.log('req',req.params)
    try{
        let appointment = await AppointmentModel.findOne({_id:req.params.id})
        res.status(200).send(appointment)
       }catch (error) {
        console.log(error)
        res.status(500).send({message:"Internal Server Error"})
        }
  }

  let handleGetAppointmentByStatus = async(req, res, next)=>{
    console.log('req',req)
    try{
        let appointment = await AppointmentModel.find({status:req.params.status})
        console.log("appointment",appointment)
        res.json(appointment)
       }catch (error) {
        console.log(error)
        res.status(500).json({message:"Internal Server Error"})
        }
  }

  let handleGetAppointmentByUser = async(req, res, next)=>{
    try{
        let user = await UserModel.findOne({_id:req.params.id})
        console.log(user)
        let appointment = await AppointmentModel.find({email:user.email})
        console.log("appointment",appointment)
        res.status(200).json(appointment)
        
       }catch (error) {
        console.log(error)
        res.status(500).send({message:"Internal Server Error"})
        }
  }

module.exports ={
    handleHome,
    handleApplyAppointment,
    handleChangeStatus,
    handleCancelAppointment,
    handleGetAppointmentById,
    handleGetAppointmentByStatus,
    handleGetAppointmentByUser
}