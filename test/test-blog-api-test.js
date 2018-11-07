
const chai = require('chai');
const chaiHttp = require('chai-http');

const { app, runServer, closeServer } = require('../server');

const expect = chai.expect;

chai.use(chaiHttp);

describe('Blog Posts', function() {

    before(function() {
        return runServer();
    });

    after(function() {
        return closeServer();
    });

    it('should list blog posts on GET', function() {
        return chai.request(app)
        .get('/blog-posts')
        .then(function(res) {
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res.body).to.be.a('array');
            expect(res.body.length).to.be.above(0);
            res.body.forEach(function(item) {
                expect(item).to.be.a('object');
                expect(item).to.have.all.keys('title', 'author', 'content', 'publishDate', 'id');
            });
        });
    });

    it('should add a new blog post on POST', function() {
        const newPost = {title: "new post", author: "shaneomac", content:"Wow look at this new post!", publishDate: "this is the publishDate"};
        return chai.request(app)
        .post('/blog-posts')
        .send(newPost)
        .then(function(res) {
            expect(res).to.have.status(201);
            expect(res).to.be.json;
            expect(res.body).to.be.a('object');
            expect(res.body).to.include.keys('id', 'title', 'content', 'publishDate', 'author');
            expect(res.body.id).to.not.equal(null);
            expect(res.body).to.deep.equal(Object.assign(newPost, {id: res.body.id}));
            });    
        });
    });

