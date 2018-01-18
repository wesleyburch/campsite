var express          = require("express"),
    app              = express(),
    bodyParser       = require("body-parser"),
    mongoose         = require("mongoose"),
    passport         = require("passport"),
    LocalStrategy    = require("passport-local"),
    methodOverride   = require("method-override"),
    flash            = require("connect-flash"),
    Campground       = require("./models/campground"),
    Comment          = require("./models/comments"),
    User             = require("./models/user"),
    seedDB           = require("./seeds");

// requiring routes
var campgroundRoutes = require("./routes/campgrounds"),
    commentRoutes    = require("./routes/comments"),
    authRoutes       = require("./routes/index");

// Connecting to our app DB (didnt exist
// this line created it also)
mongoose.connect("mongodb://localhost/yelp_campv12");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB(); //seed the database

// PASPPORT CONFIG
app.use(require("express-session")({
    secret: "I'm a full-stack developer!",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// creating own middleware to pass user variable between routes
app.use(function(req, res, next){
    res.locals.currentUser = req.user; 
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

// prefixes to be used in each router file
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes); //all campground routes should start with /campground
app.use("/", authRoutes);

app.listen(8888, function() {
    console.log("YelpCamp server has started!");
});

