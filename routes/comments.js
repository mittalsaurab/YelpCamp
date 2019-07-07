var express= require("express");
var router=express.Router({mergeParams:true});
var Camp=require("../models/camp");
var Comment=require("../models/comment");
var middleware=require("../middleware/index");

//CREATE Comment

router.get('/new',middleware.isLoggedIn,function(req,res){
	Camp.findById(req.params.id,function(err,foundCamp){
		if(err){
			 console.log("in getcamp");
			 console.log(err);

		}	 
		else{

			res.render("comments/new",{camp:foundCamp});
		}
	})	
})
router.post('/',middleware.isLoggedIn,function(req,res){
	Camp.findById(req.params.id,function(err,foundCamp){
		if(err){
			// console.log("in camp");
			req.flash("error","Camp is not found")
			console.log(err);
		}
		else{			
			Comment.create(req.body.comment,function(err,comm){
				if(err) {
					// console.log("in comment");
					req.flash("error","SOMETHING WENT WRONG ...")
						console.log(err);
				}		
				else{
					
					if(!comm){
						req.flash("error","Comment not found")
						res.redirect("back");
					}

					// console.log(comm);
					comm.author={
						id:req.user._id,
						username:req.user.username
					}
					comm.save();
					// console.log(comm);
					foundCamp.comments.push(comm);
					foundCamp.save();
					req.flash("success","Comment successfully added ...");
					
					res.redirect('/campgrounds/'+req.params.id);
				}	
			})
		}
	})
})

//Edit comments 

router.get('/:comment_id/edit',middleware.checkCommentAuth,function(req,res){
	Comment.findById(req.params.comment_id,function(err,foundComment){
			 res.render("comments/edit",{comment:foundComment,camp_id:req.params.id});		
	})
	
})

router.put('/:comment_id',middleware.checkCommentAuth,function(req,res){
	Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedComment){
			res.redirect('/campgrounds/'+req.params.id);
	})
})

router.delete('/:comment_id',middleware.checkCommentAuth,function(req,res){
	Comment.findByIdAndDelete(req.params.comment_id,function(err){
			res.redirect('/campgrounds/'+req.params.id);
	})
})


module.exports=router;