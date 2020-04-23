var express = require("express");
var router = express.Router();

// Load models
const Todo = require('../models/todo');

router.get("/", isLoggedIn, (req, res) => {
    Todo.find({}, (err, allTodos) => {
        if(err) {
            console.log(err);
        } else {
            res.render("todo", { todos: allTodos });
        }
    });
});

router.post("/", isLoggedIn, (req, res) => {
    var { item, priority } = req.body;
    var author = {
      id: req.user._id
    };
    var newTodo = { item, priority, author };
    Todo.create(newTodo, (err, newlycreated) => {
        if(err) {
          console.log(err);
        } else {
          res.redirect('/');
        }
    })
});

router.post('/deleteTodo', isLoggedIn, (req, res) => {
	Todo
		.findByIdAndDelete(req.body.id)
		.then((doc) => {
			res.redirect('back');
		})
		.catch((err)=> res.redirect('/spending'));
});

router.post('/markTodo', isLoggedIn, (req, res) => {
  if(req.body.completed == 0) {
    var completed = 1;
  } else {
    var completed = 0;
  }
	Todo
		.findByIdAndUpdate(req.body.id, { completed: completed })
		.then((doc) => {
			res.redirect('back');
		})
		.catch((err)=> res.redirect('/'));
});

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
    }
	res.redirect("/register");
};

module.exports = router;