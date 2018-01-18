//using express router
var express = require("express");
var router = express.Router({mergeParams: true}); // new router instance passing all params also
var Campground = require("../models/campground");
var Comment = require("../models/comments");
var middleware = require("../middleware"); // our main file is an idex file. so specifying the parent folder will make it automatically choose the index file.


// get comment form with passed variables
// 'isLoggedIn' is a function created to verify user auth to allow functionality. see before app.listen
router.get("/new", middleware.isLoggedIn, (req, res) => {
    // Find campground by id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
            // render new comment form and pass campground variables to page
            res.render("comments/new",{campground: campground});
        }
    });
})

// POST (create) comment to database
.post("/", middleware.isLoggedIn, (req, res) => {
    // lookup camp by id
    Campground.findById(req.params.id, (err, campground) => {
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            // create new comment
            Comment.create(req.body.comment, (err, comment) => {
                if(err){
                    req.flash("error", "Something went wrong...");
                    console.log(err);
                } else {
                    // add username and id to comment and save comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    // connect new comment to campground
                    campground.comments.push(comment._id);
                    campground.save();
                     // redirect campground show page
                    req.flash("success", "Comment successfully created!");
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
})

// COMMENT EDIT ROUTE
.get("/:comment_id/edit", middleware.checkCommentOwnership, (req, res) => {
    Comment.findById(req.params.comment_id, (err, foundComment) => {
        if(err){
            res.redirect("back");
        } else {
            res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
        }
    });
})

// COMMENT UPDATE 
.put("/:comment_id", middleware.checkCommentOwnership, (req, res) => {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComment) => {
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
})

// "/campgrounds/:id/comments"
// COMMENT DESTROY ROUTE
.delete("/:comment_id", middleware.checkCommentOwnership, (req, res) => {
    // findByIdAndRemove()
    Comment.findByIdAndRemove(req.params.comment_id, (err) => {
        if(err) {
            res.redirect("back");
        } else {
            req.flash("success", "Comment deleted!");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
}); 
// END ROUTES

module.exports = router;