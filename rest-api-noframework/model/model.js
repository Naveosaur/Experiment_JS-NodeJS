const produk = require('../dummy/data.json');

function findAll() {
    return new Promoise((resolve, reject) => {
        resolve(produk);
    });
}

module.exports = {
    findAll
}