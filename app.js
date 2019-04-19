/* eslint-disable comma-dangle */
// this is the first app directory
// after creating this file we must require express.
const express = require('express'); /** the builtin require function is the easiest way to include modules that exist in separate files * */
const debug = require('debug')('app');// tell it where we ares
const chalk = require('chalk');
const morgan = require('morgan');
const path = require('path');// joins all the strings in the the path


const app = express();// instance of express
const port = process.env.PORT || 3000;

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, './public/')));
app.use('/css', express.static(path.join(__dirname, './node_modules/bootstrap/dist/css/')));
app.use('/js', express.static(path.join(__dirname, './node_modules/bootstrap/dist/js/')));
app.use('/js', express.static(path.join(__dirname, './node_modules/jquery/dist/')));

//  ENGINE TEMPLATINGS
app.set('views', './src/views');
app.set('view engine', 'ejs'); // set pug || ejs to be the default template engine

const nav = [
  { link: '/books', title: 'Book' }, {
    link: '/author', title: 'author'
  }
];
const bookRouter = require('./src/routes/bookRoutes')(nav); // imports the bookroutes from the bookRoutes.js module
const adminRouter = require('./src/routes/adminRouter')(nav);

app.use('/books', bookRouter);
app.use('/admin', adminRouter);
app.get('/books', (req, res) => {
  res.render('index', {
    nav: [{ link: '/books', title: 'Books' }, {
      link: '/author', title: 'authors'
    }],
    title: 'Library'
  });
});

app.listen(port, () => {
  debug(`listening at port + ${chalk.green(port)}`);
});
