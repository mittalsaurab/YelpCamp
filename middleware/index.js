var Camp=require("../models/camp");
var Comment=require("../models/comment");

var middleware={}

middleware.checkCampAuth=function (req,res,next){

	if(req.isAuthenticated()){
		Camp.findById(req.params.id,function(err,foundCamp){
			if(err) {
				console.log(err);
				req.flash("error","Camp is not found");
				res.redirect("back");
			}
			else{
				if(!foundCamp){
					req.flash("error","Camp is not found");
					res.redirect("back");
				}

				if(foundCamp.author.id.equals(req.user._id)||req.user&&req.user.isAdmin){
					 req.flash("success","Successfully ");
					 next();			
				}else{
					req.flash("error","You don't have permission to edit or delete someone else comment");
					res.redirect("back");
				}
			}
		})
	}else{
		req.flash("error","Please Login First ..!");
		res.redirect("/login");
	}

}


middleware.checkCommentAuth=function(req,res,next){
	
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id,function(err,foundComment){
			if(err) {
				console.log(err);
				req.flash("error","Comment is not found");
				res.redirect("back");
			}
			else{
				if(!foundComment){
					req.flash("error","Camp is not found");
					res.redirect("back");
				}
				if(foundComment.author.id.equals(req.user._id)||req.user&&req.user.isAdmin){
					 req.flash("success","Successfully ")
					 next();			
				}else{
					req.flash("error","You don't have permission to edit or delete someone else comment")
					res.redirect("back");
				}
			}
		})
	}else{
		req.flash("error","Please Login First ..!");
		res.redirect("/login");
	}

}

middleware.isLoggedIn=function(req,res,next){
		if(req.isAuthenticated()){
			return next();
		}else{
			req.flash("error","Please Login First ..!");
			res.redirect('/login');
		}
}

module.exports=middleware;