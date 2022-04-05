import db from '../models/index.js';
import fs from "fs";
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __basedir = path.dirname(__filename);
const Image = db.Student;
export const createStudent = async (request, response) => {
    try{
        let studentName = request.query.name;
        let subIds = request.query.subjects? request.query.subjects: null;
        let student = await db.Student.create({name: studentName})
        if(subIds && subIds.length){
            await student.addSubjects(JSON.parse(subIds))
        }
        
        return response.status(201).send({success: true, student});
    } catch(error){
     console.log(error)
    }
}

export const updateStudent = async (request, response) => {
    try{
        let studentName = request.query.name;
        let studentId = request.query.id;
        let subIds = request.query.subjects? request.query.subjects: null;
        let student = await db.Student.update({name: studentName},{where: {id: studentId}})
        
        if(subIds && subIds.length){
            const studentSubjArr = [];
      for (const subId of JSON.parse(subIds)) {
        studentSubjArr.push({
          student_id: studentId,
          subject_id: subId,
        });
      }
           
        await db.studentSubject.destroy({where: {studentId}});
        if(studentSubjArr.length){
            await db.studentSubject.bulkCreate(studentSubjArr)
        }
        }
        
        return response.status(201).send({success: true, student});
    } catch(error){
     console.log(error)
    }
}

export const getStudent = async (request, response) => {
    try{
        let id = request.query.id;
        let result = await db.Student.findOne({where: {id}})
        return response.status(201).send(result);
    } catch(error){
     console.log(error)
    }
}

export const getAllStudents = async (request, response) => {
    try{
        let Students = await db.Student.findAll({
            include: [
                {
                    model: db.Subject, 
                    as: "subjects", 
                    attributes: []
                }]})
        response.render('student', { title: 'Sunstone Eduversity - faculty', Students, successMsg: '', errorMsg: ''});
    } catch(error){
     console.log(error)
    }
}

export const deleteStudent = async (request, response) => {
    try{
        let id = request.query.id;
        let result = await db.Student.destroy({where: {id}})
        
        return response.status(200).send({success: "deleted",result});
    } catch(error){
     console.log(error)
    }
}

export const uploadFileStudent = async (req, res) => {
    try {
        if (req.file == undefined) {
            return res.render('Student', { title: 'Sunstone Eduversity - faculty', Students: {},errorMsg: 'You must select a file!', successMsg: ''});
        }
        let id = req.query.id ?req.query.id : null
        Image.update({
        //   type: req.file.mimetype,
        //   name: req.file.originalname,
         picture: fs.readFileSync(
            __basedir + "/../uploads/" + req.file.filename
          ),
        },{where:{id}}).then(async(image) => {
            let result = await Image.findOne({where: {id}})
          fs.writeFileSync(
            __basedir + "/../uploads/" + req.file.filename,
            result.picture
          );

          res.render('student', { title: 'Sunstone Eduversity - faculty', Students: {}, successMsg: 'Your file is uploaded successfully!', errorMsg: ''});
        });
      } catch (error) {
        console.log(error);
        return res.redirect(`/`);
      }
}