const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Post = require('./models/post');

const app = express();
mongoose.connect('mongodb+srv://brad1234:brad1234@cluster0.9bxlps0.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {
        console.log('Connected to database!')
    })
    .catch(() => {
        console.log('Connection failed!');
    })
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
