const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = 3000;

mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Connected to MongoDB...'))
    .catch((error) => console.log('Couldnt connected to server', error));

const authorSchema = new mongoose.Schema({
    name: String,
    bio: String,
    website: String
});

const Author = mongoose.model('Author', authorSchema);

const courseSchema = new mongoose.Schema({
    name: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    }
});

const Course = mongoose.model('Course', courseSchema);

async function createAuthor(name, bio, website) {
    const author = new Author({
        name, bio, website
    });

    const result = await author.save();
    console.log(result);
}

async function createCourse(author, name) {
    const course = new Course({ name, author });

    const result = await course.save();
    console.log(result);
}

async function listCourses() {
    const courses = await Course
        .find()
        .populate('author')
        .select('name')
    console.log(courses);
}

// createAuthor('Guilherme', 'My bio', 'My website');
// createCourse('5e18ebbb660b4831002e8eba', 'Node Course');
listCourses();

app.listen(port, () => console.log("Listening to port ", port));
