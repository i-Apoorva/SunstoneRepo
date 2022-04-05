import db from '../models/index.js';
import fs from "fs";
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __basedir = path.dirname(__filename);
const Image = db.Faculty;
export const createFaculty = async (request, response) => {
    try{
        let facultyName = request.query.name;
        let subIds = request.query.subjects? request.query.subjects: null;
        let faculty = await db.Faculty.create({name: facultyName})

        if(subIds && subIds.length){
            await faculty.addSubjects(JSON.parse(subIds))
        }
        
        return response.status(201).send({success: true, faculty});
    } catch(error){
     console.log(error)
    }
}

export const updateFaculty = async (request, response) => {
    try{
        let facultyName = request.query.name ? request.query.name : null;
        let facultyId = request.query.id;
        let subIds = request.query.subjects? request.query.subjects: null;
        let query = {}
        let result = {}
        if(facultyName){
            query ={
                name: facultyName
            }
         result = await db.Faculty.update(query,{where: {facultyId}})
         }
       

        if(subIds && subIds.length){
            let facultySubjArr = [];
         for (const subId of JSON.parse(subIds)) {
          facultySubjArr.push({
          faculty_id: facultyId,
          subject_id: subId,
        });
      }
           
        await db.facultySubject.destroy({where: {facultyId}});
        if(facultySubjArr.length){
            await db.facultySubject.bulkCreate(facultySubjArr)
        }
        }
        
        return response.status(201).send({success: true, result});
    } catch(error){
     console.log(error)
    }
}

export const getFaculty = async (request, response) => {
    try{
        let id = request.query.id;
        let result = await db.Faculty.findOne({where: {id}})
        return response.status(201).send(result);
    } catch(error){
     console.log(error)
    }
}

export const getAllFacultys = async (request, response) => {
    try{
        let Facultys = await db.Faculty.findAll()
        console.log(JSON.stringify(Facultys))
        response.render('faculty', { title: 'Sunstone Eduversity - faculty', Facultys });
    } catch(error){
     console.log(error)
    }
}

export const deleteFaculty = async (request, response) => {
    try{
        let id = request.query.id;
        let result = await db.Faculty.destroy({where: {id}})
        
        return response.status(200).send({success: "deleted",result});
    } catch(error){
     console.log(error)
    }
}

export const uploadFileFaculty = async (req, res) => {
    try {
        console.log('===============>',req);
        if (req.file == undefined) {
          return res.send(`You must select a file.`);
        }
        let id = req.query.id ?req.query.id : null
        console.log('ID====>', {id})
        Image.update({
        //   type: req.file.mimetype,
        //   name: req.file.originalname,
         picture: fs.readFileSync(
            __basedir + "/../uploads/" + req.file.filename
          ),
        },{where:{id}}).then(async(image) => {
            let result = await Image.findOne({where: {id}})
            console.log({id},{result})
          fs.writeFileSync(
            __basedir + "/../uploads/" + req.file.filename,
            result.picture
          );
          return res.status(200).send(`File has been uploaded.`);
        });
      } catch (error) {
        console.log(error);
        return res.send(`Error when trying upload images: ${error}`);
      }
}