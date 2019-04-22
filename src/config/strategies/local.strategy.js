const passport = require('passport');
const { Strategy } = require('passport-local');
const debug = require('debug')('app');// tell it where we ares
const MongoClient = require('mongodb');

module.exports = function localstrategy() {
  passport.use(new Strategy(/** tells the passport what kind of strategy we are 
    implementing in our code */
    {
      usernameField: 'username',
      passwordField: 'password'
    }, (username, password, done) => { /** the new strategy takes in a callback in this case it 
      is done as the third argument"* */
      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryapp';

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('successfully connected to the database');
          const db = client.db(dbName);
          const collection = db.collection('users');

          const user = await collection.findOne({ username });
          if (user.password === password) {
            done(null, user);
          } else {
            done(null, false);
          }
        } catch (err) {
          debug(err.stack);
        }
        client.close();
      }());
    }
  ));
};
