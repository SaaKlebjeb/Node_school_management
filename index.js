const express=require('express')
const app=express()
const cors=require('cors')
app.use(cors())// Cross-Origin Resource Sharing(cors).
app.use(express.json());
const mylogged=(req,res,next)=>{
    console.log('mylogged')
    next()
}
const requestTime=(req,res,next)=>{
    req.requestTime=(new Date()).toLocaleString()
    next()
}
app.use(requestTime)
app.use(mylogged)
//import 
const employee=require('./src/route/employee.route')
const student=require('./src/route/student.route')
const teacher=require('./src/route/teacher.route')
//use it
//employee
employee(app)
//student
student(app)
//teacher
teacher(app)
const port = 8081
app.listen(port,()=>{
    console.log('running on port'+port)
})