import express from 'express';

const router = express.Router();

let users = [];

router.get('/', (req, res) => {
    res.send('Hello World');
});

router.post('/', (req, res) => {
    const user = req.body;
    users.push(user);
    res.send(`${user.name} added`);

    res.send('Post route')
})

router.get('/:id', (req, res) => {
    const { id } = req.params;
    
    const searchedUser = user.find((user) => user.id === id);

    res.send('user with ID route')
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    
    users = users.filter((user) => user.id !== id);
    res.send('delete user route')
})

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name, lastName, age } = req.body;

    const user = users.find((user) => user.id === id);

    if(name) user.name = name;
    if(lastName) user.lastName = lastName;
    if(age) user.age = age;

    res.send('update user route')
})

export default router