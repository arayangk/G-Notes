const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const notesRoutes = require('./routes/Notes.routes');
const userRoutes = require('./routes/Users.routes');
const signinRoutes = require('./routes/Signin.routes');
const auth  = require('./middleware/Auth');
require('dotenv').config();

const app = express();
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(notesRoutes);
app.use(userRoutes);
app.use(signinRoutes);
app.use(auth);

const URL = process.env.DATABASE
mongoose.connect(URL);



app.get('/' , (req, res) => res.send('hello Server is running'));



app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));