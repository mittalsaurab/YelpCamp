var express= require("express");
var passport=require("passport");
var User=require("../models/user"	)
var router=express.Router({mergeParams:true});
var Camp=require("../models/camp");
var Comment=require("../models/comment");

//AUTHORISATION PART

// REGISTRATION FORM	

router.get('/register',function(req,res){
	res.render("register");
})


router.post('/register',function(req,res){

	console.log(req.body.newUser);

	var obj1={username:req.body.username};
	
	var obj2=req.body.newUser;

	let merged = {...obj1, ...obj2};

	console.log(merged);

	var newUser=new User(merged);
	
	// eval(require('locus'));

	if(req.body.adminCode==="1234"){
		newUser.isAdmin=true;
	}

	User.register(newUser,req.body.password,function(err,user){
		
		if(err){
			console.log("Show this");
			console.log(err);
			req.flash("error",err.message);
			res.redirect('/register');  //Important thing to keep in mind
		}else{
			//console.log(user);
			// eval(require('locus'));
			passport.authenticate("local")(req,res,function(){
			// eval(require('locus'));
				
				req.flash("success","Welcome to YelpCamp "+req.user.username);
				
				res.redirect('/campgrounds');
			})
		}
	})
})

router.get('/login',function(req,res){
	res.render("login");
})

router.post('/login',passport.authenticate("local",{
	successRedirect:"/campgrounds",
	failureRedirect:"/login",
	successFlash:"Successfully Logged in ...",
	failureFlash:true
}),function(req,res){

});

router.get('/logout',function(req,res){
	req.logout();
	req.flash("success","Successfully Logged Out ..");
	res.redirect('/campgrounds');
})

// Profile part

router.get('/user/:id',function(req,res){

	User.findById(req.params.id,function(err,foundUser){
		if(err){
			console.log(err);
			res.redirect("back");
		}
			
		Camp.find().where('author.id').equals(foundUser._id).exec(function(err,camps){
			console.log("camps :"+camps);

			if(err){
				// console.log(err);
			}

			res.render("users/show",{user:foundUser,camps:camps});

		})
	
	})
})



module.exports=router;