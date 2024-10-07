const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");
const morgan = require('morgan');
const { db } = require('./database')
const { getChatGPTResponse } = require('./openai');

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

app.get('/menu', async (req, res) => {
  let query = `SELECT * FROM stock;`
  try {
    let menu = await db.query(query)
    res.status(200).send(menu)
  } catch (err) {
    res.status(400).send(err)
  }
});

// app.post('/ai', async (req, res) => {
//   console.log(req.body)
//   let prompt = `These are the discs in my bag right now: ${req.body.bag}.  Can you recommend me 5 discs to try with the descriptions of how they might be good fits? Please separate each description into it's own paragraph`
//   try {
//     let gptResponse = await getChatGPTResponse(prompt);
//     res.status(200).send(gptResponse);
//   } catch (err) {
//     res.status(400).send(err)
//   }
// });

app.post('/logBag', async (req, res) => {

  let query = `
  INSERT INTO stock (name, hmid, weight, notes, picture, strain, price, tag)
  VALUES ($1,$2,$3,$4,$5,$6,$7,$8);`
  console.log(query)
  try {
    await db.query(query, [req.body.name, req.body.hmid, req.body.weight, req.body.notes, req.body.picture, req.body.strain, req.body.price, req.body.tag]);
    res.status(201).send('Success!')
  } catch (err) {
    console.log(err)
    res.status(400).send('Error logging bag')
  }
});

app.post('/addPerson', async (req, res) => {
  let query = `
  INSERT INTO people (name, role)
  VALUES ($1, $2);`
  try {
    await db.query(query, [req.body.name, req.body.role])
    res.status(201).send('Added person!')
  } catch (err) {
    console.log(err)
    res.status(400).send('Error: ' + err.message)
  }
})

app.put('/alterBag', async(req,res)=>{
  let query = `UPDATE stock SET
  name = $1, hmid = $2, weight= $3, notes= $4, picture= $5, strain=$6, price= $7, tag= $8
  WHERE id = $9`
  try {
    await db.query(query, [req.body.name, req.body.hmid, req.body.weight, req.body.notes, req.body.picture, req.body.strain, req.body.price, req.body.tag, req.body.id]);
    res.status(200).send('Success!')
  } catch (err) {
    console.log(err)
    res.status(400).send('Error editing bag')
  }
});

app.put('/closeOutBag/:bag_id', async (req, res) => {
  const bagId = req.params.bag_id;

  const outLogQuery = 'SELECT * FROM stock WHERE id = $1';
  const deleteQuery = 'DELETE FROM stock WHERE id = $1';

  try {
    const result = await db.query(outLogQuery, [bagId]);

    if (result.rows.length === 0) {
      return res.status(404).send('Bag not found');
    }

    const outLog = result.rows[0];

    const closeoutQuery = `
      INSERT INTO closedout (name, hmid, weight, notes, picture, strain, price, tag)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
    `;

    try {
      await db.query(closeoutQuery, [
        outLog.name,
        outLog.hmid,
        outLog.weight,
        outLog.notes,
        outLog.picture,
        outLog.strain,
        outLog.price,
        outLog.tag
      ]);

      await db.query(deleteQuery, [bagId]);

      res.status(202).send('Success!');
    } catch (err) {
      console.log(err);
      res.status(400).send('Error closing out bag');
    }
  } catch (err) {
    console.log(err);
    res.status(400).send('Error removing bag');
  }
});


// const findType = (speed) =>{
//   let discType;
//   if (speed <= 3) { discType = "Putter"; }
//   else if (speed <= 5) { discType = 'Midrange'; }
//   else if (speed <= 8) { discType = 'Fairway Driver'; }
//   else { discType = 'Distance Driver'; };
//   return discType;
// }

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

module.exports = app;