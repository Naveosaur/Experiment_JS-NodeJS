import express from 'express';
import bodyparser from 'body-parser';

import userRoutes from './routes/user.js';


const app = express();
const PORT = 3000;

app.use(bodyparser.json());
app.use('/user', userRoutes);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));