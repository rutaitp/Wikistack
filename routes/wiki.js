const express = require('express');
const router = express.Router();
const models = require('../models');
const Page = models.Page;
const User = models.User;

//no need to write wiki here as index.js has router.use ('/wiki')
router.get('/', function(req, res) {
  res.redirect('/');
});

router.post('/', function(req, res) {
  // res.json(req.body)
  const page = Page.build({
    title: req.body.title,
    content: req.body.pageContent
  });
  page.save();
  res.json(req.body);
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
    res.json(foundPage);
  })
  .catch(next);
})

module.exports = router;
