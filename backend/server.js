const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");
const morgan = require('morgan');
const { db } = require('./database')
const { getChatGPTResponse } = require('./openai');

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
  let query = `SELECT * FROM discs;`
  try {
    let discs = await db.query(query)
    res.status(200).send(discs)
  } catch (err) {
    res.status(400).send(err)
  }
});

app.post('/ai', async (req, res) => {
  console.log(req.body)
  let prompt = `These are the discs in my bag right now: ${req.body.bag}.  Can you recommend me 3 discs to try with the descriptions of how they might be good fits?`
  try {
    let rec = await getChatGPTResponse(prompt);
    res.status(200).send(rec)
  } catch (err) {
    res.status(400).send(err)
  }
});

app.post('/discs', async (req, res) => {
  let discType = '';
  if (req.body.speed <= 3) { discType = "Putter"; }
  else if (req.body.speed <= 5) { discType = 'Midrange'; }
  else if (req.body.speed <= 8) { discType = 'Fairway Driver'; }
  else { discType = 'Distance Driver'; };
  let query = `
  INSERT INTO discs (name, speed, glide, turn, fade, weight, manufacturer, plastic, color, type)
  VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10);`
  try {
    await db.query(query, [req.body.name, req.body.speed, req.body.glide, req.body.turn, req.body.fade, req.body.weight, req.body.manufacturer, req.body.plastic, req.body.color, discType]);
    res.status(201).send('Success!')
  } catch (err) {
    console.log(err)
    res.status(400).send('Error adding disc')
  }

});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
