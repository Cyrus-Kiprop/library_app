const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:bookRoutes');

const bookRouter = express.Router();

function router(nav) { // wrapping routes in a funtion
  const books = [{
    title: 'The history of war and peace',
    genre: 'science fiction',
    author: 'Cyrus Kiprop',
    read: false
  }, {
    title: 'blues and the moon',
    genre: 'undersanding javascript and its content',
    author: 'Jack Ryan',
    read: false
  }, {
    title: 'the time machine',
    genre: 'science fiction',
    author: 'Bob Mwangi',
    read: false
  }];// acts as the datatase

  bookRouter.route('/')
    .get((req, res) => {
      res.render('bookListView', {
        nav,
        title: 'Library',
        books
      });
    });
  bookRouter.route('/:id')
    .get((req, res) => {
      const { id } = req.params;
      res.render('bookView',
        {
          nav,
          title: 'Library',
          book: books[id]
        });
    });
  return bookRouter;
}
module.exports = router;// this exports the bookRoutes module as a function
