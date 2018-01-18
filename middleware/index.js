var Campground = require("../models/campground");
var Comment = require("../models/comments");

// ALL MIDDLEWARE HERE
var middlewareObj = {};

// middleware function created to make sure user is
// owner of campground before allowing edit/delete
middlewareObj.checkCampgroundOwnership = (req, res, next) => {
    if(req.isAuthenticated()) {
        Campground.findById(req.params.id, (err, foundCampground) => {
            if(err || !foundCampground) {
                req.flash("error", "Sorry, that campground cannot be found");
                res.redirect("back");
            } else {
                // does user own campground post?
                if(foundCampground.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that.");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that!");
        res.redirect("back");
    }
};

// middleware function created to make sure user is
// owner of comment before allowing edit/delete
middlewareObj.checkCommentOwnership = (req, res, next) => {
    if(req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, (err, foundComment) => {
            if(err || !foundComment) {
                req.flash("error", "Sorry, that comment doesn\'t exist!")
                res.redirect("back");
            } else {
                // does user own the comment?
                // can't do === because it's a mongoose id, not a string
                if(foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that.");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that!");
        res.redirect("back");
    }
};

// middleware function made to verify logged in user. 
// used logged in functionality (post, logout button, etc.)
middlewareObj.isLoggedIn = (req, res, next) => {
    // runs passport middleware to check if user authenticated
    if(req.isAuthenticated()){
        // move on to next step (whatever is next)
        return next();
    }
    // flash middleware to display flash message BEFORE REDIRECT
    // just gives a way to access it...will access elsewhere in login
    req.flash("error", "Please Login First!");
    // or redirect to login page
    res.redirect("/login");
};

module.exports = middlewareObj;