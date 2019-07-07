var Camp=require("./models/camp");
var Comment=require("./models/comment");
var mongoose=require("mongoose");
var data = [
    {
        name: "Cloud's Rest", 
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Desert Mesa", 
        image: "https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Canyon Floor", 
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    }
]


function seedDB(){
    Camp.remove({},function(err){
        if(err) 
            console.log(err);
        else{
            console.log("Removed successfully");

            Comment.remove({},function(err){
                if(err) console.log(err);
                else{
                    data.forEach(function(camp){
                        Camp.create(camp,function(err,newCamp){
                            if(err)
                                console.log(err);
                            else{
                                console.log("camp added");
                                Comment.create({
                                    text:"Yes finally i have commented this thing on your post",
                                    author:"hacker"
                                },function(err,newComment){
                                    if(err){
                                        console.log(err);
                                    }
                                    else{
                                        newCamp.comments.push(newComment);
                                        newCamp.save(function(err){
                                            if(err){
                                                console.log(err);
                                            }
                                        });
                                        console.log("comment added");
                                    }
                                })
                            }
                        });
                            
                    })
                                }
            });
        }
    });        
}

module.exports=seedDB;