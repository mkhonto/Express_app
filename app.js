var express = require('express');
var  exphbs = require('express-handlebars');
var session = require('express-session');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var	myConnection = require('express-myconnection');
var db_main = require('./routes/db_main');
var regUser = require('./routes/regUser');

var app = express();

var dbOptions = {
	host: 'localhost',
	user: 'root',
	password: 'lisawaco55',
	port: 3306,
	database: 'Members',
};

//render files from the public folder
app.use(express.static('public'));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));
app.use(myConnection(mysql, dbOptions, 'single'));
app.get('/', db_main.show);

app.get('/regUser', regUser.show);

var user = {
					"UserOne" : "thereWeG0"
				};



//
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json 
app.use(bodyParser.json());

app.use(function(req, res, next){
  console.log('in my middleware!');

  //proceed to the next middleware component
  console.log(req.path);
  //not logged in and not trying to logged in redirect to login
  if(!req.session.user && req.path !== "/login"){
  	return res.redirect('/login')
  }

  next();
});

app.get('/', function(req, res){
	res.render('home');

});

// create a route
app.get('/signUp', function (req, res){
	var jabu = "<h1>Sign up</h1><form action='/signUp' method='post'>Enter Username<input type='text' name='username'>Enter password<input type='password' name='password' ><button type='submit' name='login label='login'>Sign up</button></form>"
	res.send(jabu);

})

app.post('/signUp', function (req, res){
		var currentPassword = user[req.body.username];

 	if (currentPassword && currentPassword === req.body.password){
 		req.session.user = "signUp";
 		res.redirect('/login');	
 	}
 	else{

 	var html = "<h1>login</h1><p>Try again!</p><form action='/login' method='post'>Enter user name<input type='text' name='username'>Enter password<input type='password' name='password' ><button type='submit' name='login label='login'>login</button></form>" 
	   	  res.send(html);
 	 }
})

app.get('/login', function (req, res) {
	var html = "<h1>Login</h1><form action='/login' method='post'>Enter Username<input type='text' name='username'>Enter password<input type='password' name='password' ><button type='submit' name='login label='login'>login</button></form>"
	 	res.send(html);
});

app.post('/login', function (req, res) {

	var currentPassword = user[req.body.username];

 	if (currentPassword && currentPassword === req.body.password){
 		req.session.user = "pirate";
 		res.redirect('/pirates');	
 	}
 	else{

 	var html = "<h1>login</h1><p>Try again!</p><form action='/login' method='post'>Enter user name<input type='text' name='username'>Enter password<input type='password' name='password' ><button type='submit' name='login label='login'>login</button></form>" 
	   	  res.send(html);
 	 }
});


app.get('/pirates', function (req, res) {
 res.send('pirates!!');
});

app.get('/logout', function (req, res) {
	loggedIn = false;
	delete req.session.user;
 	res.redirect('/login');
});



//start the server
var server = app.listen(3030, function (){

 var host = server.address().address;
 var port = server.address().port;

 console.log('Example app listening at http://%s:%s', host, port);

});