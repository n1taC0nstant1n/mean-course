const express = require('express');
const bodyParser = require('body-parser');
const Post = require('./models/post');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers',
    "Origin, X-Request-Width, Content-Type, Accept");
    res.setHeader('Access-Control-Allow-Methods',
    "GET, POST, PATCH, DELETE, OPTIONS");

    next();
    });

app.post('/api/posts', (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });//req.body;
    console.log(post);
    res.status(201).json({
        message: 'Post added succesfully'
    });
});

app.get('/api/posts',(req, res, next) => {
    //next()
   const posts = [
    {
        id: 'gfjgkjk111',
        title: 'First server side post',
        content: 'This is coming from the server'
    },
    {
        id: '2yfkgujihuk222',
        title: 'Second server side post',
        content: 'This is coming from the server!'
    }
] 
   res.json({
    message: 'Posts fetch succesfully!',
    posts: posts
   });
});

module.exports = app;
