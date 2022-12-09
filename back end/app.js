let express=require('express');
let app=express();
//port number
let port=process.env.port || 3000;
let router = express.Router();
let cors = require('cors');

//insert data
let bodyParser=require("body-parser");


//insert data
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(cors());
app.use("/api/student",router);
app.listen(port,()=>{
    console.log(`Node.js application running on port : ${port}`);
});

//array of json objects
let students=[
    {
        StudentId : 1,
        FirstName : "sriyan",
        LastName : "anurudda",
        dob : '2000-03-12',
        email : 'sriyan@gmail.com',
        center : 'Colombo',
        semester:1,
        cgpa: 3.5
    }  
];

//get all students
router.get("/",(req,res)=>{
    res.json(students);
});

//Get student based on id
router.get('/:Id',(req,res)=>{ 
    let id =req.params.Id;
    let currentStudent=students.filter((x)=>x.StudentId==id)[0];

    if(currentStudent){
        res.json(currentStudent);        
    }else{
        res.sendStatus(404);
    }
});

//validate student function
ValidateStudent =(student)=>{
    let message="";

    if(!student.StudentId){
        message="Student id not found";
    }
    
    if(!student.FirstName){
        message="Student FirstName not found";
    }

    if(!student.LastName){
        message="Student LastName not found";
    }


    return message;
}


//create student
router.post("/",(req,res)=>{
    let student =req.body;
    let isValid=ValidateStudent(student);

    if(isValid==""){
        students.push(student);
        console.log(students);
        
        res.status(201).send(students);      
    }else{
        res.statusMessage=isValid;
        res.sendStatus(404);
    }

});

//update
router.put("/:Id",(req,res)=>{
    let StudentId = req.params.Id;
    let student=req.body;
    let currentStudent=students.filter((x)=>x.StudentId==StudentId)[0];

    if(currentStudent){
        let isValid=ValidateStudent(student);
        if(isValid==""){
            currentStudent.FirstName=student.FirstName;
            currentStudent.LastName=student.LastName;
            currentStudent.dob=student.dob;
            currentStudent.email=student.email;
            currentStudent.center=student.center;
            currentStudent.semester=student.semester;
            currentStudent.cgpa=student.cgpa;

            res.status(200).send(students);
        }else{
            res.statusMessage =isValid;
            res.sendStatus(404);
        }

    }else{
        res.statusMessage="Student does not exist";

        res.sendStatus(404);
    }
})

//delete by id
router.delete("/:Id",(req,res)=>{
    let StudentId=req.params.Id;
    let currentStudent=students.filter((x)=>x.StudentId==StudentId)[0];
    if(currentStudent){
        students=students.filter((x)=>x.StudentId!=StudentId);
        res.statusMessage="Student deleted sucessfully.";
        res.sendStatus(200);
    }else{
        res.statusMessage="Student does not exist";
        res.sendStatus(404);
    }
});

//delete by email
router.delete("/emails/:email",(req,res)=>{
    let email=req.params.email;
    let currentStudent=students.filter((x)=>x.email==email)[0];
    if(currentStudent){
        students=students.filter((x)=>x.email!=email);
        res.statusMessage="Student deleted sucessfully.";
        res.sendStatus(200);
    }else{
        res.statusMessage="Student does not exist";
        res.sendStatus(404);
    }
});


//Get student based on name
router.get('/names/:name',(req,res)=>{ 
    let name =req.params.name;
    let currentStudent=students.filter((x)=>x.FirstName==name);

    if(currentStudent){
        res.json(currentStudent);        
    }else{
        res.sendStatus(404);
    }
});

//Get student based on center
router.get('/centers/:center',(req,res)=>{ 
    let center =req.params.center;
    let currentStudent=students.filter((x)=>x.center==center);

    if(currentStudent){
        res.json(currentStudent);        
    }else{
        res.sendStatus(404);
    }
});

//Get student based on semester
router.get('/semesters/:semester',(req,res)=>{ 
    let semester =req.params.semester;
    let currentStudent=students.filter((x)=>x.semester==semester);

    if(currentStudent){
        res.json(currentStudent);        
    }else{
        res.sendStatus(404);
    }
});

//Get student based on cgpa
router.get('/cgpas/:cgpa',(req,res)=>{ 
    let cgpa =req.params.cgpa;
    let currentStudent=students.filter((x)=>x.cgpa==cgpa);

    if(currentStudent){
        res.json(currentStudent);        
    }else{
        res.sendStatus(404);
    }
});