import express from 'express';
import webpack from 'webpack';
import webpackConfig from './webpack.config.js';
import path from 'path';
import Request from 'request-promise';

let compiler = webpack(webpackConfig),
    app = express();


app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});


//yahoo API
app.get('/api/stock/:symbol',  async (req, res) => {
  let response = await Request.get(`https://query1.finance.yahoo.com/v7/finance/chart/${req.params.symbol}`);
  let data = JSON.parse(response);
  res.send(data);
});

//assets
app.use('/static', express.static(__dirname + '/static'));



let server = app.listen(3000, () => {

let host = server.address().address;
let port = server.address().port;
console.log('Example app listening at http://%s:%s', host, port);

});
