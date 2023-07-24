const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");
const morgan = require('morgan');

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../dist')));
app.use(express.json());

app.get('/discs', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
