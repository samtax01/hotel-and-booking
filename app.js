//Import Express
const express = require('express');
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require('passport');
const path = require('path');

// Initialize App
const app = express();

// View Engine
const handlebars = require('express-handlebars')
app.engine('.hbs', handlebars({
    // layoutsDir: __dirname+'/views',
    defaultLayout: 'main',
    extname: '.hbs'
}))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.hbs')
// app.use(express.static('./views'))

//cors
app.use(cors());

// Import App config
const config = require("./config");

// define directory
global.__base = __dirname + '/';


// Database configuration
mongoose.Promise = global.Promise;
mongoose.connect(config.mongoURI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection.once('open', () => {
    // All code in your mongoose schema js files should have run before it is used in other files.
    // For example, the following code snippet makes sure the mongoose schema files/modules are executed. https://stackoverflow.com/a/38970017/5385845
    require("fs").readdirSync(__dirname + '/app/models').forEach( (file)=> {
        if (~file.indexOf('.js')) require(__dirname + '/app/models/' + file);
    });
    console.log('MongoDB Ready...')
}).on('error', (error) => console.log('Error connecting to MongoDB:', error));

// Setup server port
const port = config.port;
app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({limit:'50mb', extended: false}));

// passport configuration
require('./app/config/passport');
app.use(passport.initialize());

// Send message for default route URL
const apiRoutes = require("./app/routes/index");
app.use('/', apiRoutes);
app.use('/docs', express.static(__dirname + '/apidoc'));

// Launch app to listen to specified port
app.listen(port, () => { console.log("Running App on port " + port); });
//listener = app.listen(null, () => { console.log("Running App on port " + listener.address().port); });
