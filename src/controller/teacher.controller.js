const db=require('../util/db')
const getAll=(req,res)=>{
    db.query('SELECT * FROM teacher',(err,row)=>{//db.query('select-query',handler)
        if(!err){
            res.json({
                success:true,
                time:req.requestTime,
                message:'Fetch data successfully',
                teacher_lists:row
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
    const sql='select * from teacher where teacher_id=?'
    const params=[id];
    db.query(sql,params,(err,row)=>{//db.query('select-query',handler)
        if(!err){
            res.json({
                success:true,
                time:req.requestTime,
                message:'Fetch a user data successfully',
                teacher_lists:row
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

    const InsertQuery = "INSERT INTO teacher (firstname, lastname, gender, dob, tel, email,base_salary, address, province, country) VALUES (?,?,?,?,?,?,?,?,?,?)";
    const params = [firstname, lastname, gender, dob, tel, email, base_salary, address, province, country];

    db.query(InsertQuery, params, (err, result) => {
        if (!err) {
            // After successful insertion, fetch the updated list of teachers
            const fetchQuery = "SELECT * FROM teacher";
            db.query(fetchQuery, (err, rows) => {
                if (!err) {
                    res.json({
                        success: true,
                        message: 'Insert successfully',
                        teacher_lists: rows
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
  const teacher_id  = req.params.id; // Extract teacher_id from request parameters
    const {
      firstname, lastname, gender, dob, tel, email, base_salary,
      address, province, country
    } = req.body;
  
    const UpdateQuery = 'UPDATE teacher SET firstname=?, lastname=?, gender=?, dob=?, tel=?, email=?, base_salary=?, address=?, province=?, country=? WHERE teacher_id=?';
    const params = [firstname, lastname, gender, dob, tel, email, base_salary, address, province, country, teacher_id];
  
    db.query(UpdateQuery, params, (err, result) => {
      if (err) {
        return res.json({
          error: true,
          message: err
        });
      }
  
      if (result.affectedRows !== 0) {
        // ✅ Update success, now fetch updated teacher list
        const fetchQuery = 'SELECT * FROM teacher';
        db.query(fetchQuery, (err2, teachers) => {
          if (err2) {
            return res.json({
              error: true,
              message: err2
            });
          }
  
          res.json({
            message: 'Update success',
            teacher_lists: teachers
          });
        });
      } else {
        res.json({
          message: 'Update fail...!',
          err:err,
          teacher_lists: []
        });
      }
    });
  };
  

const remove=(req,res)=>{
    const teacher_id=req.params.id;
    const deleteQuery = 'DELETE FROM teacher WHERE teacher_id = ?';
    const params = [teacher_id];
  
    db.query(deleteQuery, params, (err, result) => {
      if (err) {
        return res.json({
          error: true,
          message: err
        });
      }
  
      if (result.affectedRows !== 0) {
        // ✅ If delete successful, now fetch updated teacher list
        const fetchQuery = 'SELECT * FROM teacher';
        db.query(fetchQuery, (err2, teachers) => {
          if (err2) {
            return res.json({
              error: true,
              message: err2
            });
          }
  
          res.json({
            message: 'Remove success',
            teacher_lists: teachers
          });
        });
      } else {
        res.json({
          message: 'Remove fail...!',
          teacher_lists: []
        });
      }
    });
}
module.exports={
    getAll,create,update,remove,getOne
}