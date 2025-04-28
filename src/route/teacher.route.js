const teacherController=require('../controller/teacher.controller')
const teacher = (app) => {
  app.get("/api/teacher", teacherController.getAll);
  app.get("/api/teacher/:id", teacherController.getOne);
  app.post("/api/teacher", teacherController.create);
  app.put("/api/teacher/:id", teacherController.update);
  app.delete("/api/teacher/:id", teacherController.remove);
};
module.exports=teacher;
