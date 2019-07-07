var express= require("express");

var router=express.Router({mergeParams:true});

var Camp=require("../models/camp");

var middleware=require("../middleware/index");

var NodeGeocoder=require('node-geocoder');

var options={
	provider:'google',
	httpAdapter:'https',
	apiKey:process.env.GEO_CODER_API,
	formatter:null
};

// process.env.GEO_CODER_API

var geocoder=NodeGeocoder(options);

//SHOW CAMPGROUNDS 

router.get('/',function(req,res){
	
	// console.log(req.query.search);

	if(req.query.searh){
		console.log("heyyy");
	}

	if(req.query.search){
		const regex = new RegExp(escapeRegex(req.query.search), 'gi');	

		Camp.find({name:regex},function(err,camps){
			if(err){ 
				console.log("SOMETHING WENT WRONG");
			}	
			else{
				if(camps.length<1){
					res.render("campgrounds/campgrounds.ejs",{camps:camps,"error":"No campgrounds found with this name"});	
				}
				else{
					res.render("campgrounds/campgrounds.ejs",{camps:camps});	
				}
						
			}
		})	

	}
    else{
      	Camp.find({},function(err,camps){
			if(err){ 
				console.log("SOMETHING WENT WRONG");
			}	
			else{
				res.render("campgrounds/campgrounds.ejs",{camps:camps});		
			}
		})	
    }
		
	
})
//CREATE CAMPGROUND

router.get('/new',middleware.isLoggedIn,function(req,res){
	res.render("campgrounds/newcamp.ejs");	
})

router.post('/',middleware.isLoggedIn,function(req,res){
		var campground=req.body.camp;
		campground.author={
			id:req.user._id,
			username:req.user.username
		}
		
		// // console.log(campground);
		// geocoder.geocode('delhi',function(err,data){
		// 	console.log(process.env.GEO_CODER_API);
		// 	console.log(data);
		// 	// eval(require('locus'));

		// 	if(err||!data.length){
		// 		req.flash("error","Invalid Address");
		// 		res.redirect('back');
		// 	}

		// 	// var lat = data.results[0].geometry.location.lat;
		//     // var lng = data.results[0].geometry.location.lng;
		//     // var location = data.results[0].formatted_address;

		//     // campground.location=location;
		//     // campground.lng=lng;
		//     // campground.lat=lat;
		// }) 

		Camp.create(campground,function(err,dummy){
				if(err){
					console.log(err);
				}
				else{
					console.log(dummy);
					// console.log(campground);
					req.flash("success","Camp added");
					res.redirect("/campgrounds");
				}
		})
})

//Show Campground

router.get('/:id',function(req,res){
	Camp.findById(req.params.id).populate("comments").exec(function(err,foundCamp){
		if(err){
			console.log("IN here");
			console.log(err);	
		} 
		else{			
			res.render("campgrounds/show",{camp:foundCamp});
		}
	})
})

//EDIT CAMPGROUND

router.get('/:id/edit',middleware.checkCampAuth,function(req,res){
	Camp.findById(req.params.id,function(err,foundCamp){
		res.render("campgrounds/edit",{camp:foundCamp});	
	})

})

router.put('/:id',middleware.checkCampAuth,function(req,res){
		Camp.findByIdAndUpdate(req.params.id,req.body.camp,function(err,updatedCamp){
				res.redirect('/campgrounds/'+req.params.id);			
		})
})


//DELETE CAMPGROUND

router.delete('/:id',middleware.checkCampAuth,function(req,res){

	Camp.findByIdAndDelete(req.params.id,function(err,deletedCamp){
				res.redirect('/campgrounds');	
	})
})


function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};


module.exports=router;