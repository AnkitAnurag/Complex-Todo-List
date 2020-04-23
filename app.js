var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var session = require('express-session');

// Models
var Todo = require("./models/todo");
var User = require("./models/user");

// Routes
var TodoRoutes = require("./routes/todo");
var UserRoutes = require("./routes/user");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// Connect DB
var url = process.env.DATABASEURL || "mongodb+srv://varun2000:varun2000@webdev-sdnkq.mongodb.net/todo?retryWrites=true&w=majority"

mongoose.connect(url,{
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false
    }, () => {
        console.log("DB CONNECTED!!");
});

// Express session
app.use(
	session({
	  secret: 'secret',
	  resave: true,
	  saveUninitialized: true
	})
  );

// Back button cached sessions destroy
app.use(function(req, res, next) {
	res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
	next();
});

//PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret: "Once again Rusty wins cutest dog!!",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	next();
});

app.use(TodoRoutes);
app.use(UserRoutes);


  
app.listen(process.env.PORT || 3000, () => {
  console.log("The Todo List server has started!!!!");
});
