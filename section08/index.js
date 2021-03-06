const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB....', err));

const courseSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true,
        minlength: 3,
        maxlength: 255,
        // match: /parterner/
    },
    category: {
        type: String,
        enum: ['web', 'mobile', 'api'],
        lowercase: true,
        trim: true,
        required: true
    },
    author: String,
    tags: {
        type: Array,
        validate: {
            isAsync: true,
            validator: function (v, callback) {
                setTimeout(() => {
                    // Do some async work
                    const result  = v && v.length > 0;
                    callback(result);
                }, 1000)
            },
            message: 'A course should have at least one tag.'
        }
    },
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: {
        type: Number,
        required: function() { return this.isPublished; },
        min: 10,
        max: 200,
        get: v => Math.round(v),
        set: v => Math.round(v),
    }
});

const Course = mongoose.model('Course', courseSchema);

const course = new Course({
    name: 'React Native Course - teste validator case',
    author: 'Guilherme Almeida',
    category: ' WEB',
    tags: [ 'React-Native', 'Mobile', 'frontend' ],
    isPublished: true,
    price: 15.8
});

async function createCourse() {
    try {

        const result = await course.save();
        console.log('course is saved...', result);

    } catch (ex) {
        for (field in ex.errors) {
            const { properties } = ex.errors[field];
            console.log(properties.message);
        }
        
    }
}

async function getCourses() {

    const courses = await Course
        // .find({ author: 'Mosh' })
        // .find({ isPublished: { $eq: true }})
        .find()
        // .or([{ author: 'Mosh' },{ isPublished: true }])
        .limit(10)
        .sort({ name: 1 })
        .select({ name: 1, tags: 1 , author: 1 })
        // .count();

    console.log(courses);
}

async function updateCourse(id) {
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

// deleteCourse('5e0ebdf1a3b05f048e8b8fcf')
// updateCourse('5e0ebdf1a3b05f048e8b8fcf');
// getCourses();
createCourse();
