const express = require('express');

const bookRouter = express.Router();

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
}];

bookRouter.route('/')
  .get((req, res) => {
    res.render('bookListView', {
      nav: [{ link: '/books', title: 'Books' }, {
        link: '/author', title: 'author'
      }],
      title: 'Library',
      books
    });
  });
bookRouter.route('/:id')
  .get((req, res) => {
    const { id } = req.params;
    res.render('bookView',
      {
        nav: [{ link: '/books', title: 'Books' }, {
          link: '/author', title: 'author'
        }],
        title: 'Library',
        book: books[id]
      });
  });
module.exports = bookRouter;
