//import whole file and we can acces each function 
const employeeController=require('../controller/employee.controller')
const employee=(app)=>{
    app.get('/api/employee',employeeController.getAll)
    app.get('/api/employee/:id',employeeController.getOne)
    app.post('/api/employee',employeeController.create)
    app.put('/api/employee/:id',employeeController.update)
    app.delete('/api/employee/:id',employeeController.remove)
}
module.exports=employee;