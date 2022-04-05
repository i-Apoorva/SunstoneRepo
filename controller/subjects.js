import db from '../models/index.js';
export const createSubject = async (request, response) => {
    try{
        let subName = request.query.name;
        let result = await db.Subject.create({name: subName})
        
        return response.status(201).send({success: true, result});
    } catch(error){
     console.log(error)
    }
}

export const updateSubject = async (request, response) => {
    try{
        let subName = request.query.name;
        let id = request.query.id;
        let result = await db.Subject.update({name: subName},{where: {id}})
        
        return response.status(201).send({success: true, result});
    } catch(error){
     console.log(error)
    }
}

export const getSubject = async (request, response) => {
    try{
        let id = request.query.id;
        let result = await db.Subject.findOne({where: {id}})
        return response.status(201).send(result);
    } catch(error){
     console.log(error)
    }
}

export const getAllSubjects = async (request, response) => {
    try{
        let subjects = await db.Subject.findAll()
        console.log(JSON.stringify(subjects))
        response.render('subject', { title: 'Sunstone Eduversity - faculty', subjects });
    } catch(error){
     console.log(error)
    }
}

export const deleteSubject = async (request, response) => {
    try{
        let id = request.query.id;
        let result = await db.Subject.destroy({where: {id}})
        
        return response.status(200).send({success: "deleted",result});
    } catch(error){
     console.log(error)
    }
}