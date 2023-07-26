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
app.use(express.urlencoded({ extended: true }))
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

app.get('/discs', async (req, res) => {
  let query = `SELECT * FROM discs`
  try {
    let discs = await db.one(query)
    res.status(200).send(discs)
  } catch(err) {
    res.status(400).send(err)
  }
});

app.post('/discs', async (req,res) => {
  console.log(req.body)
  let query = `
  INSERT INTO discs (name, speed, glide, turn, fade, weight, manufacturer, plastic, color)
  VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9);`
  try {
    await db.query(query, [req.body.name, req.body.speed, req.body.glide, req.body.turn, req.body.fade, req.body.weight,req.body.manufacturer, req.body.plastic, req.body.color]);
    res.status(201).send('Success!')
  } catch (err) {
    console.log(err)
    res.status(400).send('Error adding disc')
  }

});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
