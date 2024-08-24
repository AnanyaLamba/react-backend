const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogpost = require("./models/blogpost");
const cors = require("cors");

const app = express();

app.use(cors());

//connecting to the database
const USER_NAME = "Ananya";
const PASSWORD = "ananya%402002";
const DB_NAME = "reactCluster";
const DB_URI = `mongodb+srv://${USER_NAME}:${PASSWORD}@merncluster.5u5kp.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=merncluster`;
const PORT = 3011;



let promiseObj = mongoose.connect(DB_URI);
promiseObj.then((result) => {
  console.log("connected to the database");
  app.listen(PORT, () => {
    console.log(`the app is start listening on ${PORT}`);
  });
  // console.log(result);
});
promiseObj.catch((err) => {
  console.log(err.message);
});

app.get("/", (req, res) => {
  res.send("Home page"); //this will show the content written on the browser
});

app.get("/blogs", (req, res) => {
  blogpost
    .find()
    .sort({ createdAt: -1 })
    //this will return a promise jise hum then and catch se resolve karenge
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send("error in fetching blogpost");
    });
});

app.get("/blogs/id/:id", (req, res) => {
  const id = req.params.id;
  blogpost
    .findById(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(500).send("blog not found");
      }
    })
    .catch((err) => {
      res.send(err.message);
    });
});

app.use(express.json());


app.post("/blogs", (req, res) => {
  const data = req.body;
  // res.send("this is my data");
  console.log(data);
  const blog = new blogpost(data);
  blog.save()
    .then((data) => {
      console.log("inside post request");
      res.json(data);
    })
    .catch((err) => {
      console.log("error has been occured");
    });
});

app.delete("/blogs/id/:id", (req, res) => {
  const blogId = req.params.id;
  // res.send("data is deleted");
  blogpost.findByIdAndDelete(blogId)
  .then((result) => {
    if (result) {
      res.json(result);
    }
    else{
        res.status(400).send("Blogpost not found")
    }
  })
  .catch((err)=>{
    console.log('Error deleting blog post:', err);
    res.status(500).send("Error deleting bog post");
  });
});
