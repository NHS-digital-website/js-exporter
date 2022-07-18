const path = require('path');
const exporter = require('../exporter/exporter');
const express = require('express');

process.env.port = process.env.port.trim() || 3000;

const app = express();

app.use(express.json());

app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views"));

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/lib', express.static(path.join(__dirname, '../dist')));
app.use('/favicon.ico', express.static(path.join(__dirname, 'favicon.ico')));

app.post('/', async function (req, res) {
  let options = req.body;
  if (!options) {
    res.status(500)
    res.send('Missing chart options');
    return;
  }

  try {
    const viz = await exporter(options, options.library);
    res.writeHead(200, { 'Content-Type' : viz.contentType });
    res.end(viz.buffer);
  } catch(e) {
    res.status(500)
    res.send(e.message);
    return;
  }
});

app.get('/:page?', async function (req, res) {
  let page = req.params.page;
  if (!page) {
    page = 'index';
  }
  res.sendFile(path.join(__dirname, `views/${page}.html`));
});

console.log('Server started on port ' + process.env.port);
app.listen(process.env.port);
