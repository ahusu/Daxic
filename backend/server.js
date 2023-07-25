const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");
const morgan = require('morgan');
const {db} = require('./database')

//webpack should watch for changes and updates the bundle.js in dist
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('../webpack.config.js');

app.use(morgan('dev'));
app.use(express.static(path.join('dist')));
app.use(express.json());
const compiler = webpack(webpackConfig);
app.use(
  webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
  })
);
app.use(webpackHotMiddleware(compiler));

app.get('*.css', (req, res, next) => {
  res.type('text/css');
  next();
});

app.get('/discs/:user_id', (req, res) => {

});

app.post('/discs', async (req,res) => {
  let { body: questionBody, name: questionName, email: questionEmail, product_id: productId } = req.body;
  let query = `
  INSERT INTO discs (name, speed, glide, turn, fade, weight, manufacturer, plastic
  VALUES (1,2,3,4,5,6,7,8);`
  try {
    await db.one()
  } catch (err) {
    res.send('Error adding disc')
  }

});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
