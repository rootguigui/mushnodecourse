const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB....', err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);
const course = new Course({
    name: 'React Native Course',
    author: 'Guilherme Almeida',
    tags: [ 'React-Native', 'Mobile', 'frontend' ],
    isPublished: true
});

async function createCourse() {
    const result = await course.save();
    console.log('course is saved...', result);
}

async function getCourses() {
    // $eq (equal)
    // $ne (not equal)
    // $gt (greater than)
    // $gte (greater than or equal to)
    // $lt (less than)
    // $lte (less than or equal to)
    // $in 
    // $nin (not in)

    // or
    // and

    // Regular expression
    // Starts with Mosh
    // .find({ author: /ˆMosh/ })

    // End with Hamedani
    // .find({ author: /Hamedani$/i })

    // Contains Mosh
    // .find({ author: /.*Mosh.*/i })

    const courses = await Course
        // .find({ author: 'Mosh' })
        // .find({ isPublished: { $eq: true }})
        .find({ author: /.*M.*/i })
        // .or([{ author: 'Mosh' },{ isPublished: true }])
        .limit(10)
        .sort({ name: 1 })
        .select({ name: 1, tags: 1 , author: 1 })
        // .count();

    console.log(courses);
}

async function updateCourse(id) {
    // const course = await Course.findById(id);
    // if (!course) return;

    // course.set({
    //     isPublished: false,
    //     author: 'another author'
    // });

    // const result = await course.save();
    // console.log(result);
    const course = await Course.findByIdAndUpdate(id, {
        $set: {
            author: 'Guilherme',
            isPublished: true
        }
    }, { new: true });
    console.log(course);
}

async function deleteCourse(id) {
    const course = await Course.findByIdAndRemove(id);
    console.log(course);
}

deleteCourse('5e0ebdf1a3b05f048e8b8fcf')
// updateCourse('5e0ebdf1a3b05f048e8b8fcf');
// getCourses();
// createCourse();
