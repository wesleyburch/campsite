//using express router
var express = require("express");
var router = express.Router(); // new router instance
var passport = require("passport");
var User = require("../models/user");
var Campground = require("../models/campground");
var Comment = require("../models/comments");

// route route
router.get("/", function(req,res) {
    res.render("landing");
})

// show register form
.get("/register", function(req, res){
    res.render("register");
})

// create new user store to db
.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    // Create new user. Hashes and stores password too
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register", {error: err.message});
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome " + user.username + "!");
            res.redirect("/campgrounds");
        });
    }); 
})

// show login form
.get("/login", function(req, res){
    res.render("login");
})

// login logic via passport middleware
.post("/login", passport.authenticate("local", 
    {   
        successRedirect: "/campgrounds", // if user is authenticated, redirect to campgrounds
        failureRedirect: "/login" // if user not auth, reload login page
    }), function(req, res){ // could delete the function function(req, res) if wanted. left to show middleware 
})

// logout route
.get("/logout", function(req, res){
    req.logout(); //part of installed package
    req.flash("success", "Successfully logged you out!");
    res.redirect("/campgrounds");
});


module.exports = router;


//========================================
//=========== Authorization ==============
//========================================
//  (USING PASSPORT MIDDLEWARE) 
//  * install packages
//  * define User model

//  * configure passport middleware
//  * add register routes
//  * add register template (register.ejs)

//  * add login routes
//  * add login template (login.ejs)

//  * add logout route

//  * show/ hide auth links 
//========================================