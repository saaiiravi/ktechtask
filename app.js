var express= require('express');
var bodyParser=require('body-parser');
var routes = require('./routes/index');
var path = require('path');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');

//initialising app
var app = express();
console.log('App initialised');


// View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');

// BodyParser Middleware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
//set port
app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function(){
	console.log('Server started on port '+app.get('port'));
});