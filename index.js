const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
//requiring uuid for id generation
const { v4: uuidv4 } = require('uuid');
uuidv4(); 
// aquiring method override
const methodOverride = require("method-override");
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
let posts = [
    {
        id: uuidv4() ,
        username : "Adit",
        content : "IAS Batch2027"
    },
    {
        id: uuidv4(),
        username : "ShradhaKhapra",
        content : "Tutor at apna college"
    },
    {   id: uuidv4(),
        username : "Sanyam",
        content : "I love coding"
    },
];


app.get("/posts", (req,res)=> {//see the data we are using is also post and route for api is also post //GET Request
    res.render("index.ejs", {posts});
});
//now, to create new post
app.get("/posts/new", (req,res) =>{
    res.render("new.ejs")
})

app.post("/posts", (req, res)=>{//to get post request by submitting the form, and storing the data in array
    let {username, content} = req.body;
    let id = uuidv4(); 
    posts.push({id, username, content});

   
//but till now we have to open two separate pages one for form and other for webpage,
//now we will design it using "redirect" such that form opens up on same page and stores data like happens on websites
// can explore on express documentation,res.redirect()
res.redirect("/posts");//by default it sends get request
})

//show or view route i.e.. GET/posts/:id
app.get("/posts/:id", (req,res) => {
    let {id} = req.params;
    console.log(id)
    //res.send("Request Working")
    let post =posts.find((p) => id === p.id);
    //console.log(post)
    res.render("show.ejs",{post});
})

//#Patch request- To update specific post
app.patch("/posts/:id", (req,res) => {
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    res.redirect("/posts");
});

//To edit the post
app.get("/posts/:id/edit",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", {post})
}) 


//Delete Post Using Destroy Route
app.delete("/posts/:id", (req,res)=>{
    let {id} = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts")
})

app.listen(port, ()=> {
    console.log("listening to port 8080");
})