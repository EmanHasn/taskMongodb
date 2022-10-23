const { redirect } = require("express/lib/response")
const dbConnect = require("../db/connect")
const {ObjectId} = require("mongodb")

class Post{
    static home = (req , res) =>{
        dbConnect(db  =>{
            db.collection("posts").find()
            .toArray( 
                (error , data )=>{
                 res.render("home" , {
                pageTitle : "All Tasks", 
                data, 
                isEmpty: !data.length 
            })
            })
        })
    } 
    static edit = (req , res) => {
    const postId = req.params.id
        dbConnect(db =>
            db.collection("posts")
            .findOne({_id:new ObjectId(postId)})
           .then( postData =>{
               res.render("edit" , {
                   pageTitle:"edit post",
                   postData
               })

           })
        )
  
    } 
 
    static editLogic = (req , res) =>{
        dbConnect(db =>{
            db.collection("posts")
            .updateOne(
                {_id: new ObjectId(req.params.id)},
                {$set : {...req.body}}
            ).then(r => console.log(r))
        })
        res.redirect("/")
    }
  

    static addpost = (req , res) => {
            res.render("addpost", {
                        pageTitle : "Add post"
            })
    } 
    static addLogic = (req , res) =>{
    const post = req.body 
    dbConnect((db,client)=>{
        db.collection("posts").insertOne(post)
        .then(()=> res.redirect("/") )
        .catch(e=> console.log(e))
    })
    }

    static single = (req , res) =>  {
        const postId = req.params.id
        dbConnect(db =>
            db.collection("posts")
            .findOne({_id:new ObjectId(postId)})
           .then( postData =>{
               res.render("single" , {
                   pageTitle:"single post",
                   postData
               })

           })
        )
    }



    static delete = (req , res) =>{
        const post = req.body 
        dbConnect((db,client)=>{
            db.collection("posts").deleteOne(post)
            .then(()=> res.redirect("/") )
            .catch(e=> console.log(e))
        })
    }

  
}

module.exports = Post;

