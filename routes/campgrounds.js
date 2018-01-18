//using express router
var express = require("express");
var router = express.Router(); // new router instance
var Campground = require("../models/campground");
var Comment = require("../models/comments");
var middleware = require("../middleware"); // our main file is an idex file. so specifying the parent folder will make it automatically choose the index file.


// INDEX - show all campgrounds 
// using router.get instead of app.get because we're using express' router
router.get("/", (req,res) => {
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds) {
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/index",{campgrounds: allCampgrounds});
        }
    })
    // res.render("campgrounds",{campgrounds: campgrounds});
})

// CREATE ROUTE - add new campground to DB
.post("/", middleware.isLoggedIn, (req, res) => {
    //get data from form and add to camp array
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var description = req.body.description;
    // CREATE NEW CAMPGROUND AND SAVE TO DB
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = {name: name, price: price, image: image, description: description, author: author};
    
    Campground.create(newCampground, (err, newlyCreated) => {
        if(err){
            console.log(err);
        } else {
            //redirect back to campgrounds page 
            
            res.redirect("/campgrounds");
        }
    });
})

// NEW - Show form to create new campground
.get("/new", middleware.isLoggedIn, (req, res) => {
    res.render("campgrounds/new");
})

// SHOW - shows more info about one campground
.get("/:id", (req, res)  => {
    // FIND CAMP WITH PROVIDED ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
        if(err){
            console.log(err);
        } else {
            // RENDER SHOW TEMPLATE WITH THAT CAMPGROUND
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
})

// EDIT CAMPGROUND ROUTE
.get("/:id/edit", middleware.checkCampgroundOwnership, (req, res) => {
    // Is user logged in
    Campground.findById(req.params.id, (err, foundCampground) => {
        res.render("campgrounds/edit", {campground: foundCampground}); //pass in campground we're editing
    });
})

// UPDATE CAMPGROUND ROUTE
.put("/:id", middleware.checkCampgroundOwnership, (req, res) => {
    // find and update correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground) => {
        if(err){
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
    // redirect to show page
})

// DESTROY CAMPGROUND GROUTE
.delete("/:id", middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findByIdAndRemove(req.params.id, (err) =>{
        if(err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    });
});

// exporting router 
module.exports = router;