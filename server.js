
const express = require('express');
const morgan = require('morgan');

const app = express();

const blogPostsRouter = require('./blogPostsRouter');

//log the http layer of the application
app.use(morgan('common'));

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

app.use('/BlogPosts', blogPostsRouter);

app.listen(process.env.PORT || 8080, () => {
    console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});
