const express = require('express');
const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app:bookRoutes');
const bookController = require('../controllers/bookcontroller');

const bookRouter = express.Router();

function router(nav) { // wrapping routes in a funtion
  bookRouter.use((req, res, next) => {
    if (req.body) {
      next();
    } else {
      res.redirect('/');
    }
  });
  bookRouter.route('/')
    .get((req, res) => {
      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryapp';

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('successfully connected to the database');
          const db = client.db(dbName);

          const collection = await db.collection('books');

          const books = await collection.find().toArray();

          res.render('bookListView', {
            nav,
            title: 'Library',
            books
          });
        } catch (error) {
          debug(error.stack);
        }
        client.close();
      }());
    });
  bookRouter.route('/:id')
    .get((req, res) => {
      const { id } = req.params;
      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryapp';

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('successfully connected to the database');
          const db = client.db(dbName);

          const collection = await db.collection('books');

          const book = await collection.findOne({ _id: new ObjectID(id) });
          debug(book);
          res.render(
            'bookView',
            {
              nav,
              title: 'Library',
              book,

            }
          );
        } catch (error) {
          debug(error.stack);
        }
        client.close();
      }());
    });
  return bookRouter;
}
module.exports = router;// this exports the bookRoutes module as a function
