const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");
const morgan = require('morgan');

//webpack should watch for changes and updates the bundle.js in dist
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('../webpack.config.js');

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../dist')));
app.use(express.json());
const compiler = webpack(webpackConfig);
app.use(
  webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
  })
);
app.use(webpackHotMiddleware(compiler));



app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
