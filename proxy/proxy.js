const server = require('express')();
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

server.use(cors());

server.use('/api', (req, res, next) => {
    createProxyMiddleware({ target: `http://127.0.0.1:8000`, secure: true })(req, res, next);
});


server.listen(4000, () => {
    console.log('proxy online');
});