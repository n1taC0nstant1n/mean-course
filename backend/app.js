const express = require('express');

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Header',
    "Origin, X-Request-Width, Content-Type, Accept");
    res.setHeader('Access-Control-Allow-Methods',
    "GET, POST, PATCH, DELETE, OPTIONS");

    next();
    });



app.use('/api/posts',(req, res, next) => {
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
