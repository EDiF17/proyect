// ************ Require's ************
require('dotenv').config();
const express = require('express');
const path = require('path');
const methodOverride =  require('method-override');
const session = require("express-session");
const cookieParser = require('cookie-parser');

// ************ Route System require ************
const mainRoutes = require('./routes/main');
const userRoutes = require('./routes/user');
const pitchsRoutes = require('./routes/pitchs');
const gamesRoutes = require('./routes/games');

// ************ express() ************
const app = express();

// ************ Template Engine ************
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ************ Middlewares ************
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
}));
app.use(cookieParser());

app.use('/', mainRoutes);
app.use('/user', userRoutes);
app.use('/pitchs', pitchsRoutes);
app.use('/games', gamesRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server started on: http://localhost:${port}`);
});