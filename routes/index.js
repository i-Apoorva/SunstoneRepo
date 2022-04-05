import express from 'express';
import {createSubject, updateSubject, getAllSubjects, deleteSubject } from '../controller/subjects.js'
import {createStudent,updateStudent, getAllStudents, deleteStudent, uploadFileStudent} from '../controller/students.js'
import {createFaculty, updateFaculty, getAllFacultys, deleteFaculty, uploadFileFaculty} from '../controller/faculty.js'
import upload from "../middleware/uploadImage.js";
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Sunstone Eduversity' });
});

// routes for subjects
router.get('/subject', getAllSubjects);

router.post('/subject', createSubject);

router.put('/subject', updateSubject);

router.delete('/subject', deleteSubject);

// routes for student
router.get('/student', getAllStudents);

router.post('/student', createStudent);

router.put('/student', updateStudent);

router.delete('/student', deleteStudent);

// routes for faculty
router.get('/faculty', getAllFacultys);

router.post('/faculty', createFaculty);

router.put('/faculty', updateFaculty);

router.delete('/faculty', deleteFaculty);

//upload file
router.post('/student-upload', upload.single("file"), uploadFileStudent)
router.post('/faculty-upload', upload.single("file"), uploadFileFaculty)


export default router;