const Joi = require('joi');
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require('dotenv').config();

app.use(express.json());

const courses = [
    { id: 1, name: 'course1'},
    { id: 2, name: 'course2'},
    { id: 3, name: 'course3'}
];

// port
const port = process.env.PORT;

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/api/courses", (req, res) => {
    res.send(courses);
});


// post method
app.post("/api/courses", (req, res) => {

    const { error } = validateCourse(req.body);

    //400 Bad request
    if (error) return res.status(400).send(error.details[0].message);

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };

    courses.push(course);
    res.send(course);
});

app.put("/api/courses/:id", (req, res) => {
    // Look up the course
    // If not existing, return 404

    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send("the course with the give id was not found!");
    
    // Validate
    // If invalid , return 400 -Bad Request

    const { error } = validateCourse(req.body);

    if (error) {
        //400 Bad request
        return res.status(400).send(error.details[0].message);
    }

    // update course
    // Return the updated course
    course.name = req.body.name;
    res.send(course);
});

app.delete("/api/courses/:id", (req, res) => {
    // Look up the course
    // Not existing , return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send("the course with the give id was not found!");
    
    // Delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    // Return the same course
    res.send(course);
});

// /api/courses/1
app.get("/api/courses/:id", (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send("the course with the give id was not found!");

    res.send(course);
});

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(course, schema);
}

app.listen(port, (err) => {
    if (err) throw console.error(err);
    
    console.log(`Listening on port ${port} ...`);
});