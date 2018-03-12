const express = require('express');
const router = express.Router();
const models = require('../models');
const Page = models.Page;
const User = models.User;

//no need to write wiki here as index.js has router.use ('/wiki')
router.get('/', function(req, res) {
  Page.findAll()
  .then(function(pages) {
    res.render('index', {pages: pages});
  });
});

router.post('/', function(req, res, next) {
  User.findOrCreate({
    where: {
      name: req.body.name,
      email: req.body.email
    }
  })
  .then(function(values){
    const user = values[0]; //access the user instance
    console.log(user);
    const page = Page.build({
      title: req.body.title,
      content: req.body.pageContent,
      status: req.body.status
    });
    return page.save().then(function(page) { //save the page instance
      console.log("Page was saved!");
      return page.setAuthor(user); //and set author to it
    })
  })
  .then(function(page){
    res.redirect(page.route);
  })
  .catch(next)
});

router.get('/add', (req, res) =>

  res.render('addpage')
);

router.get('/:urlTitle', function(req, res, next) {
  let reqTitle = req.params.urlTitle;
  Page.findOne({
    where: {urlTitle: reqTitle}
  })
  .then(function(foundPage) {
    //error handling
    if(page === null) return next(new Error("That page was not found!"));

    res.render('wikipage', {title: foundPage.title, content: foundPage.content });
  })
  .catch(next);
})

module.exports = router;
