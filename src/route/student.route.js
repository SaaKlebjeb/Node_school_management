const studentController=require('../controller/student.controller')
const student = (app) => {
  app.get("/api/student", studentController.getAll);
  app.get("/api/student/:id", studentController.getOne);
  app.post("/api/student", studentController.create);
  app.put("/api/student/:id", studentController.update);
  app.delete("/api/student/:id", studentController.remove);
};
module.exports=student;
