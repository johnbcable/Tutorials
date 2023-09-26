const Joi = require('joi');
const express = require('express');
var apikeys = [];
apikeys['live'] = '075d6878-04a8-4110-b216-6296135e43f1';
apikeys['pre-live'] = 'eb5ac0eb-0c21-47d1-b167-dba2f0456c17';
apikeys['test'] = '58c863e4-3d70-4c8e-ad2b-ea3051fee2b6';

const courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'}
];
const app = express();
app.use(express.json());

app.get('/',(req, res) => {
    res.send('Hello World!!!');
})

app.get('/api/courses',(req, res) => {
    res.send(courses);
})

// /api/course/:id
app.get('/api/courses/:id',(req, res) => {
    const course = courses.find(c => c.id == parseInt(req.params.id));
    if (!course) {
        res.status(404).send('The course with the given id was not found');
    } else {
        res.send(course);
    }
})

app.get('/api/lights/byboundary', (req, res) => {
    const tlat = req.body.toplat;
    const tlng = req.body.toplng;
    const blat = req.body.bottomlat;
    const blng = req.body.bottomlng;

    const calc_yotta_api_key = apikeys[req.body.env];

    res.send({
        tlat,
        tlng,
        blat,
        blng,
        calc_yotta_api_key
    });

});
app.post('/api/courses', (req, res) => {

    const { error } = validateCourse(req.body);
//    console.log(result);

    if (error) {
        // 400
        return res.status(400).send(result.error.details[0].message);
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    // Look up course
    // if not existing return 404
    const course = courses.find(c => c.id == parseInt(req.params.id));
    if (!course) {
        return res.status(404).send('The course with the given id was not found');
    }

    // Validate passed-in course details
     const {error} = validateCourse(req.body);
    // If invalid return 400
    if (error) {
        // 400
        return res.status(400).send(result.error.details[0].message);
    }

    // Update course
    course.name = req.body.name;
    // Return the updated course
    res.send(course);
});

app.delete('api/course/:id', (req, res) => {
    //look up course 
    // if not exist return 404
    const course = courses.find(c => c.id == parseInt(req.params.id));
    if (!course) {
        return res.status(404).send('The course with the given id was not found');
    }

    // Delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
})
function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(course, schema);

}
//  PORT env variable
const port = process.env.PORT|| 3000
app.listen(port, () => console.log(`Listening on port ${port} ...`));