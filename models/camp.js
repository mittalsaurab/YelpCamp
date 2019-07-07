var mongoose=require("mongoose");
var Comment=require("./comment");
var User=require("./user");
var campgroundSchema= new mongoose.Schema({
	name:String,
	image:String,
	price:Number,
	description:String,
	createdAt:{type:Date,default:Date.now},
	location:String,
	lat:Number,
	lng:Number,
	author:{
			id:{  type:mongoose.Schema.Types.ObjectId,
				   ref:"User" 
				},
			username:String
	},	
	comments:[{
		type:mongoose.Schema.Types.ObjectId,
		ref:"Comment"
	}]
})

var Camp=mongoose.model("Camp",campgroundSchema);

module.exports=Camp;	