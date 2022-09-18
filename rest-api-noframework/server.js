const http = require('http');
const produk = require('./dummy/data.json');
const { getProduct } = require('./controller/controller');

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(produk));
});
const PORT = process.env.PORT || 3000;


server.listen(PORT, () => console.log(`Server running on port ${PORT}`));