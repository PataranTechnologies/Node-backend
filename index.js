const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Student = require("./models/Student/Student");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Accept, Content-Type");
    if(req.method === 'OPTIONS'){
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
        return res.status(200).json({});
    }
    next();
});

app.get("/students", async (req, res, next) => {
    const students = await Student.find().exec();
    res.json({students});
})

app.post("/students", async (req, res, next) => {
    const { name, age, standard, rollNumber, school, city } = req.body;

    const student = new Student({
        name,
        age,
        standard,
        rollNumber,
        school,
        city
    });
    const result = await student.save();
    res.json({result});
});

app.put("/students/:studentId", async (req, res, next) => {
    const id = req.params.studentId;

    const { name, age, standard, rollNumber, school, city } = req.body;

    const student = await Student.findById(id);
    
    student.name = name;
    student.age = age;
    student.standard = standard;
    student.rollNumber = rollNumber;
    student.school = school;
    student.city = city;

    const result = await student.save();
    res.json({result});
});

app.delete("/students/:studentId", async (req, res, next) => {
    const id = req.params.studentId;

    const student = await Student.findById(id);
    await student.remove();

    res.json({message: "Student Record Deleted"});
});

mongoose.connect("mongodb+srv://admin:password@pataran@pataran.xkf5t.mongodb.net/students?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true}).then(app.listen(5000, () => {
    console.log("Server (5000) and Database connected!");
})).catch(error => console.log(error));