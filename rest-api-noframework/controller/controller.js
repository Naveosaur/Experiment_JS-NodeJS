const Produk = require('../model/produk');

async function getProduct(req, res) {
    try {
        const produks = await Produk.findAll();

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(produks));
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    getProduct
}