const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:adminRoutes');

const adminRouter = express.Router();

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


function routes(nav) {
  adminRouter.route('/')
    .get((req, res) => {
      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryapp';

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          const db = client.db(dbName);
          debug('successfully connected to the database');

          const response = await db.collection('books').insertMany(books);
          res.json(response);
        } catch (e) {
          debug(e.stack);
        }
        client.close();
      }());
    });
  return adminRouter;
}
module.exports = routes;
