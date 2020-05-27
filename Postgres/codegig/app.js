const express = require('express');
const Handlebars = require('handlebars');
const exphbs = require('express-handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const bodyParser = require('body-parser');
const path = require('path');

// Database 
const db = require('./config/database');

// Test DB
db.authenticate()
    .then(() => console.log('Database connected'))
    .catch(err => console.log('Error: ' + err))

const app = express();

// Handlebars
/*
Implmented fix using https://www.youtube.com/watch?v=67OhLlFPqFQ&list=PLillGF-RfqbZyLc9sMQ72_u3FW9fVxo1p&index=2

*/
app.engine('handlebars', exphbs({
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// Body parser
app.use(bodyParser.urlencoded({ extended: false }));

// Set static folder
app.use((express.static(path.join(__dirname, 'public'))));

// Index route
app.get('/',(req, res) => res.render('index', { layout: 'landing'}));

// Gig routes
app.use('/gigs', require('./routes/gigs')
)
const PORT = process.env.PORT || 5000 

app.listen(PORT, console.log(`Server started on port ${PORT}`));
