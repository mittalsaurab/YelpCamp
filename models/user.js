var mongoose=require("mongoose");
var passportLocalMongoose=require("passport-local-mongoose");


var userSchema=new mongoose.Schema({
	username:String,
	password:String,
	firstName:String,
	lastName:String,
	email:String,
	avatar:{type:String,default:"http://cool100.ca/uploads/made/uploads/listen-live/356/madelinemerlo_640_768_70_s_c1.jpg"},
	isAdmin:{type:Boolean,default:false },

	notifications:[
			{
				type:mongoose.Schema.Types.ObjectId,
				ref:"Notification"
			}
	],
	followers:[
		{
			type:mongoose.Schema.Types.ObjectId,
			ref:"User"
		}
	]

})

userSchema.plugin(passportLocalMongoose);


module.exports=mongoose.model("User",userSchema);	