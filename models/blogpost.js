const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogpostSchema  = new Schema({
    title: {
        type: String,
        required: true
    },
    summary:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    sector:{
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    }
}, {timestamps: true});

const blogPostCollectionName = 'blogPost';

const BlogPostModel = mongoose.model('BlogPostModel',blogpostSchema,blogPostCollectionName);

//pehla model ka name hota hai jo capital se start hota hai dursa name hota hai schema aur last name hota hai collection ka 

module.exports  = BlogPostModel;
