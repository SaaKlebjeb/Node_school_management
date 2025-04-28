const db=require('../util/db')
const getAll=(req,res)=>{
    db.query('SELECT * FROM employee',(err,row)=>{//db.query('select-query',handler)
        if(!err){
            res.json({
                success:true,
                time:req.requestTime,
                message:'Fetch data successfully',
                employee_lists:row
            })
        }
        else{
            res.json({
                err:true,
                message:err,
                
            })
        }
    })
}

const getOne=(req,res)=>{
    const {id}=req.params;
    const sql='select * from employee where employee_id=?'
    const params=[id];
    db.query(sql,params,(err,row)=>{//db.query('select-query',handler)
        if(!err){
            res.json({
                success:true,
                time:req.requestTime,
                message:'Fetch a user data successfully',
                employee_lists:row
            })
        }
        else{
            res.json({
                err:true,
                message:err
            })
        }
    })

}

const create = (req, res) => {
    const {
        firstname, lastname, gender, dob, tel, email, base_salary, address, province, country
    } = req.body;

    const InsertQuery = "INSERT INTO employee (firstname, lastname, gender, dob, tel, email,base_salary, address, province, country) VALUES (?,?,?,?,?,?,?,?,?,?)";
    const params = [firstname, lastname, gender, dob, tel, email, base_salary, address, province, country];

    db.query(InsertQuery, params, (err, result) => {
        if (!err) {
            // After successful insertion, fetch the updated list of employees
            const fetchQuery = "SELECT * FROM employee";
            db.query(fetchQuery, (err, rows) => {
                if (!err) {
                    res.json({
                        success: true,
                        message: 'Insert successfully',
                        employee_lists: rows
                    });
                } else {
                    res.json({
                        success: false,
                        message: err
                    });
                }
            });
        } else {
            res.json({
                success: false,
                message: err
            });
        }
    });
};


const update = (req, res) => {
  const employee_id  = req.params.id; // Extract employee_id from request parameters
    const {
      firstname, lastname, gender, dob, tel, email, base_salary,
      address, province, country
    } = req.body;
  
    const UpdateQuery = 'UPDATE employee SET firstname=?, lastname=?, gender=?, dob=?, tel=?, email=?, base_salary=?, address=?, province=?, country=? WHERE employee_id=?';
    const params = [firstname, lastname, gender, dob, tel, email, base_salary, address, province, country, employee_id];
  
    db.query(UpdateQuery, params, (err, result) => {
      if (err) {
        return res.json({
          error: true,
          message: err
        });
      }
  
      if (result.affectedRows !== 0) {
        // ✅ Update success, now fetch updated employee list
        const fetchQuery = 'SELECT * FROM employee';
        db.query(fetchQuery, (err2, employees) => {
          if (err2) {
            return res.json({
              error: true,
              message: err2
            });
          }
  
          res.json({
            message: 'Update success',
            employee_lists: employees
          });
        });
      } else {
        res.json({
          message: 'Update fail...!',
          err:err,
          employee_lists: []
        });
      }
    });
  };
  

const remove=(req,res)=>{
    const employee_id=req.params.id;
    const deleteQuery = 'DELETE FROM employee WHERE employee_id = ?';
    const params = [employee_id];
  
    db.query(deleteQuery, params, (err, result) => {
      if (err) {
        return res.json({
          error: true,
          message: err
        });
      }
  
      if (result.affectedRows !== 0) {
        // ✅ If delete successful, now fetch updated employee list
        const fetchQuery = 'SELECT * FROM employee';
        db.query(fetchQuery, (err2, employees) => {
          if (err2) {
            return res.json({
              error: true,
              message: err2
            });
          }
  
          res.json({
            message: 'Remove success',
            employee_lists: employees
          });
        });
      } else {
        res.json({
          message: 'Remove fail...!',
          employee_lists: []
        });
      }
    });
}
module.exports={
    getAll,create,update,remove,getOne
}