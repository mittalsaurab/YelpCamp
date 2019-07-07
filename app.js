require('dotenv').config();

var express				=require("express"),
	app					=express(),
	mongoose			=require("mongoose"),
	moment				=require('moment'),
	request				=require("request"),
 	bodyParser 			=require("body-parser"),
 	flash				=require("connect-flash"),
 	Camp      			=require("./models/camp"),
 	Comment   			=require("./models/comment"),
 	seedDB	  			=require("./seed"),
 	methodOverride 		=require("method-override"),
 	passport  			=require("passport"),
 	LocalStrategy		=require("passport-local"),
	passportLocalMongoose=require("passport-local-mongoose"),
	User 				 =require("./models/user");
	
	var commentRoutes=require("./routes/comments");
	var campgroundRoutes	 =require("./routes/campgrounds");
	var authRoutes			=require("./routes/index");

mongoose.connect("mongodb://localhost/yelp_camp",{ useNewUrlParser: true });

app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine","ejs")
app.use(methodOverride("_method"));
app.use(express.static(__dirname+'/public'));
app.use(flash());

app.use(require("express-session")({
	secret:"I am having interest in cp too",
	resave:false,
	saveUninitialized:false
}))

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
	res.locals.currentUser=req.user;
	res.locals.error=req.flash("error");
	res.locals.success=req.flash("success");
	next();
})

// seedDB();

app.get('/',function(req,res){
	res.render("landing.ejs");
})

app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);

app.use(authRoutes);

app.listen(3000,function(){
	console.log("Yelpcamp started");
})