const express = require('express'); 
const app = express();
const { authPage, authCourse } = require('./middlewares');

use(express.json())

app.get('/home', (req, res) => {
    res.send('Hello World!')
})

app.get("/course/grades", authPage(['admin']), (req, res) => {
    res.json({
        name1 : 100,
        name2: 95,
        name3: 34,
        name4: 67,
    })
})

app.get("/course/:number", authCourse, (req, res) => {
    const courseNumber = req.params.number;
    res.json('Permission to see course ${courseNumber} granted')
})

app.listen(3000, () => {
    console.log('Server is listening on port 3000')
});