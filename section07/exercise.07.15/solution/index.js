const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises', { useNewUrlParser: true })
    .then(response => console.log('Connected to MongoDB....'))
    .catch(error => console.log('Could not connect to MongoDB....', error))

const courseSchema = new mongoose.Schema({
    tags: [ String ],
    date: { type: Date, default: Date.now },
    name: String,
    author: String,
    isPublished: Boolean,
    price: Number
});

const Course = mongoose.model('Course', courseSchema);

async function getAllCourses() {
    return await Course
        .find({ isPublished: true })
        .or([{ tags: 'frontend'}, { tags: 'backend' }])
        .sort({ price: -1 })
        .select({ name: 1, author: 1, price: 1 })
}

async function run() {
    const courses = await getAllCourses();
    console.log(courses);
}

run();