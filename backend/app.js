const express = require('express');

const app = express();

app.use('/api/posts',(req, res, next) => {
    //next()
   const posts = [
    {
        id: 'hgfjgkjk111',
        title: 'First server side post',
        content: 'This is coming from the server'
    },
    {
        id: 'lyfkgujihuk222',
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
