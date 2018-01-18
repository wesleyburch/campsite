var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comments");

var data = [
    {
        name: "Cloud's Rest", 
        image: "https://s-media-cache-ak0.pinimg.com/originals/2e/b7/e2/2eb7e206036f11c94ed0cac8fb1fc05e.jpg",
        description: "Marfa tofu actually mustache Truffaut try-hard messenger bag keytar raw denim sriracha 90's sustainable paleo umami irony bitters McSweeney's Austin fap deep v Schlitz twee vinyl selvage Thundercats street art Intelligentsia tousled roof party DIY mumblecore Echo Park bicycle rights beard craft beer meh occupy put a bird on it trust fund heirloom photo booth hella authentic hoodie 3 wolf moon ethical gluten-free wayfarers flexitarian jean shorts food truck semiotics post-ironic disrupt chia next level small batch stumptown Pinterest leggings mixtape polaroid normcore Wes Anderson aesthetic +1 chambray Brooklyn blog fashion axe fixie locavore drinking vinegar typewriter Blue Bottle art party ugh tote bag Carles biodiesel direct trade Shoreditch seitan four loko bespoke PBR&B banh mi pour-over Godard plaid farm-to-table organic Bushwick shabby chic butcher pop-up Helvetica Odd Future synth American Apparel banjo Portland Neutra retro whatever Cosby sweater kitsch cliche fanny pack flannel dreamcatcher master cleanse iPhone Tumblr hashtag cray XOXO keffiyeh crucifix 8-bit cardigan forage fingerstache vegan swag kale chips brunch letterpress High Life quinoa Banksy kogi artisan literally PBR cred pug church-key scenester mlkshk readymade VHS Williamsburg ennui Pitchfork single-origin coffee tattooed narwhal gentrify sartorial lomo pickled before they sold out viral Etsy pork belly asymmetrical distillery lo-fi Tonx slow-carb YOLO skateboard selfies salvia you probably haven't heard of them freegan chillwave gastropub Vice Kickstarter meggings cornhole"
    },
    {
        name: "Desert Mesa", 
        image: "https://www.active.com/Assets/Outdoors/Featured+Content/desert-camping-460.jpg",
        description: "Marfa tofu actually mustache Truffaut try-hard messenger bag keytar raw denim sriracha 90's sustainable paleo umami irony bitters McSweeney's Austin fap deep v Schlitz twee vinyl selvage Thundercats street art Intelligentsia tousled roof party DIY mumblecore Echo Park bicycle rights beard craft beer meh occupy put a bird on it trust fund heirloom photo booth hella authentic hoodie 3 wolf moon ethical gluten-free wayfarers flexitarian jean shorts food truck semiotics post-ironic disrupt chia next level small batch stumptown Pinterest leggings mixtape polaroid normcore Wes Anderson aesthetic +1 chambray Brooklyn blog fashion axe fixie locavore drinking vinegar typewriter Blue Bottle art party ugh tote bag Carles biodiesel direct trade Shoreditch seitan four loko bespoke PBR&B banh mi pour-over Godard plaid farm-to-table organic Bushwick shabby chic butcher pop-up Helvetica Odd Future synth American Apparel banjo Portland Neutra retro whatever Cosby sweater kitsch cliche fanny pack flannel dreamcatcher master cleanse iPhone Tumblr hashtag cray XOXO keffiyeh crucifix 8-bit cardigan forage fingerstache vegan swag kale chips brunch letterpress High Life quinoa Banksy kogi artisan literally PBR cred pug church-key scenester mlkshk readymade VHS Williamsburg ennui Pitchfork single-origin coffee tattooed narwhal gentrify sartorial lomo pickled before they sold out viral Etsy pork belly asymmetrical distillery lo-fi Tonx slow-carb YOLO skateboard selfies salvia you probably haven't heard of them freegan chillwave gastropub Vice Kickstarter meggings cornhole"
    },
    {
        name: "Canyon Floor", 
        image: "https://www.fs.usda.gov/Internet/FSE_MEDIA/stelprdb5127312.jpg",
        description: "Marfa tofu actually mustache Truffaut try-hard messenger bag keytar raw denim sriracha 90's sustainable paleo umami irony bitters McSweeney's Austin fap deep v Schlitz twee vinyl selvage Thundercats street art Intelligentsia tousled roof party DIY mumblecore Echo Park bicycle rights beard craft beer meh occupy put a bird on it trust fund heirloom photo booth hella authentic hoodie 3 wolf moon ethical gluten-free wayfarers flexitarian jean shorts food truck semiotics post-ironic disrupt chia next level small batch stumptown Pinterest leggings mixtape polaroid normcore Wes Anderson aesthetic +1 chambray Brooklyn blog fashion axe fixie locavore drinking vinegar typewriter Blue Bottle art party ugh tote bag Carles biodiesel direct trade Shoreditch seitan four loko bespoke PBR&B banh mi pour-over Godard plaid farm-to-table organic Bushwick shabby chic butcher pop-up Helvetica Odd Future synth American Apparel banjo Portland Neutra retro whatever Cosby sweater kitsch cliche fanny pack flannel dreamcatcher master cleanse iPhone Tumblr hashtag cray XOXO keffiyeh crucifix 8-bit cardigan forage fingerstache vegan swag kale chips brunch letterpress High Life quinoa Banksy kogi artisan literally PBR cred pug church-key scenester mlkshk readymade VHS Williamsburg ennui Pitchfork single-origin coffee tattooed narwhal gentrify sartorial lomo pickled before they sold out viral Etsy pork belly asymmetrical distillery lo-fi Tonx slow-carb YOLO skateboard selfies salvia you probably haven't heard of them freegan chillwave gastropub Vice Kickstarter meggings cornhole"
    }
]

function seedDB(){
    // Remove all camps
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        } 
        console.log("Removed campgrounds!");
        //add a few camps
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err);
                } else {
                    console.log("added a camp");
                    //create a comment
                    Comment.create(
                        {
                            text: "This place is great, but I wish there was internet",
                            author: "Homer"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                campground.comments.push(comment._id);
                                campground.save();
                                console.log("created new comment");
                            }
                        });
                }
            });
        });
    });
    
    
    //add comments
}

module.exports = seedDB;