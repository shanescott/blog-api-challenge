
const express = require("express");

const router = express.Router();

const { BlogPosts } = require("./models");

//Create some initial blog posts
BlogPosts.create("Today Sucked!", "It was awful!","Reginald Bowlstacker", "11-3-18");
BlogPosts.create("Today was most excellent!", "It was dope AF!","Reginald Bowlstacker", "10-2-18");
BlogPosts.create("Today was unbelievably bad!", "I would rather not talk about it","Reginald Bowlstacker", "9-3-18");

router.get("/", (req, res) => {
    res.json(BlogPosts.get());
});

router.post("/", (req, res) => {
    const requiredFields = ["title", "content", "author", "publishDate"];
    for (let i = 0; i < requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
            const message = `Missing \`${field}\` in request body`;
            console.error(message);
            return res.status(400).send(message);
        }
    }
    const item = BlogPosts.create(
        req.body.title, 
        req.body.content, 
        req.body.author, 
        req.body.publishDate
        );
    res.status(201).json(item);
});


router.put("/:id", (req, res) => {
    const requiredFields = ["id", "title", "content", "author", "publishDate"];
    for (let i=0; i < requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
            const message = `Missing \`${field}\` in request body`
            console.error(message);
            return res.status(400).send(message);
        }
    }
    if (req.params.id !== req.body.id) {
        const message = 
            `Request path id (${req.params.id}) and request body id `
            `(${req.body.id}) must match`;
            console.error(message);
            return res.status(400).send(message);
        }
        console.log(`Updating blog post item \`${req.params.id}\``);
            BlogPosts.update({
                id: req.params.id,
                title: req.body.title,
                content: req.body.content,
                author: req.body.author,
                publishDate: req.body.publishDate
        });
        res.status(204).end();
    });

    router.delete("/:id", (req, res) => {
        BlogPosts.delete(req.params.id);
        console.log(`Deleted blog post item \`${req.params.ID}\``);
        res.status(204).end();
    });
    
    module.exports = router;
