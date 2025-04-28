const db=require('../util/db')
const getAll=(req,res)=>{
    db.query('SELECT * FROM student',(err,row)=>{//db.query('select-query',handler)
        if(!err){
            res.json({
                success:true,
                time:req.requestTime,
                message:'Fetch data successfully',
                student_lists:row
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
    const id=req.params.id;
    const sql='select * from student where student_id=?'
    const params=[id];
    db.query(sql,params,(err,row)=>{//db.query('select-query',handler)
        if(!err){
            res.json({
                success:true,
                time:req.requestTime,
                message:'Fetch a student data successfully',
                student_lists:row
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
        firstname, lastname, gender, dob, tel, email,address, province, country
    } = req.body;

    const InsertQuery = "INSERT INTO student (firstname, lastname, gender, dob, tel, email, address, province, country) VALUES (?,?,?,?,?,?,?,?,?)";
    const params = [firstname, lastname, gender, dob, tel, email, address, province, country];

    db.query(InsertQuery, params, (err, result) => {
        if (!err) {
            // After successful insertion, fetch the updated list of student
            const fetchQuery = "SELECT * FROM student";
            db.query(fetchQuery, (err, rows) => {
                if (!err) {
                    res.json({
                        success: true,
                        message: 'Insert successfully',
                        student_lists: rows
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
  const student_id  = req.params.id; // Extract student_id from request parameters
    const {
      firstname, lastname, gender, dob, tel, email,
      address, province, country
    } = req.body;
  
    const UpdateQuery = 'UPDATE student SET firstname=?, lastname=?, gender=?, dob=?, tel=?, email=?, address=?, province=?, country=? WHERE student_id=?';
    const params = [firstname, lastname, gender, dob, tel, email, address, province, country, student_id];
  
    db.query(UpdateQuery, params, (err, result) => {
      if (err) {
        return res.json({
          error: true,
          message: err
        });
      }
  
      if (result.affectedRows !== 0) {
        // ✅ Update success, now fetch updated employee list
        const fetchQuery = 'SELECT * FROM student';
        db.query(fetchQuery, (err2, student) => {
          if (err2) {
            return res.json({
              error: true,
              message: err2
            });
          }
  
          res.json({
            message: 'Update success',
            student_lists: student
          });
        });
      } else {
        res.json({
          message: 'Update fail...!',
          err:err,
          student_lists: []
        });
      }
    });
  };
  

const remove=(req,res)=>{
    const student_id=req.params.id;
    const deleteQuery = 'DELETE FROM student WHERE student_id = ?';
    const params = [student_id];
  
    db.query(deleteQuery, params, (err, result) => {
      if (err) {
        return res.json({
          error: true,
          message: err
        });
      }
  
      if (result.affectedRows !== 0) {
        // ✅ If delete successful, now fetch updated employee list
        const fetchQuery = 'SELECT * FROM student';
        db.query(fetchQuery, (err2, student) => {
          if (err2) {
            return res.json({
              error: true,
              message: err2
            });
          }
  
          res.json({
            message: 'Remove success',
            student_lists: student
          });
        });
      } else {
        res.json({
          message: 'Remove fail...!',
          student_lists: []
        });
      }
    });
}
module.exports={
    getAll,create,update,remove,getOne
}