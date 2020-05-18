const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();

// DB
mongoose.connect('mongodb://localhost/node-todo')
    .then(db => console.log('DB Connected!'))
    .catch(err => console.log(err));

// IMPORT ROUTES
const indexRoutes = require('./routes/index');

// SETTINGS
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// MIDDLEWARE
app.use(morgan('dev'));
app.use(express.urlencoded( { extended: false } ));

// ROUTES
app.use('/', indexRoutes);

// START SERVER
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});