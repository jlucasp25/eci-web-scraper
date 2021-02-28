const url = 'https://www.elcorteingles.pt/gaming/nintendo/jogos-nintendo/?sorting=discountPerDesc';
const axios = require('axios');
const cheerio = require('cheerio');
const Product = require('./Product.js');


const categoryLinks = {
    'Gaming/Discount':'https://www.elcorteingles.pt/gaming/?sorting=discountPerDesc',
    'Technology/Discount':'https://www.elcorteingles.pt/tecnologia/discount::81-%3E100%2C%2C71-%3E81%2C%2C51-%3E61%2C%2C61-%3E71%2C%2C41-%3E51/?sorting=discountPerDesc',
    'Gaming/Nintendo/Games/Discount':'https://www.elcorteingles.pt/gaming/nintendo/jogos-nintendo/?sorting=discountPerDesc',
    'Gaming/PlayStation/Games/Discount':'https://www.elcorteingles.pt/gaming/playstation/jogos-playstation-4/?sorting=discountPerDesc',
    'Toys/Discount':'https://www.elcorteingles.pt/brinquedos/discount::81-%3E100%2C%2C71-%3E81%2C%2C61-%3E71%2C%2C51-%3E61%2C%2C41-%3E51/?sorting=discountPerDesc'
};

const fetchBuildProductInformation = (url) => {
    let database = [];
    axios
        .get(url)
        .then((response) => {
            const $ = cheerio.load(response.data);
            let scripts = $('script').get();
            let scriptData = null;
            for (let script of scripts) {
                if (script.children[0] !== undefined) {
                    let scriptContents = script.children[0].data;
                    if (scriptContents.startsWith(' dataLayer = ')) {
                        scriptData = scriptContents.substring(13,scriptContents.indexOf(';'));
                        break;
                    }
                }
            }
            scriptData = JSON.parse(scriptData);
            let products = scriptData[0].products;
            for (let product of products) {
                let productObject = new Product(product.id,product.name,product.category[0],product.price.o_price,product.price.f_price,product.price.discount,product.status,product.badges.express_delivery);
                database.push(productObject);
            }
            printDatabase(database);
        })
        .catch((error) => {
            console.error(error)
        });
};

const printDatabase = (database) => {
    let current_time = new Date();
    for (let product of database) {
        console.log('| ' + product.name + ' | ' + product.current_price + ' € | ' + product.discount_percentage +' % | Stock: ' + product.stock + ' |');
    }
    console.log('');
    console.log('* --- ' + current_time.getHours() + ':' + current_time.getMinutes() + ' --- *');
}


fetchBuildProductInformation(categoryLinks['Gaming/Discount']);

setInterval(() => {
    fetchBuildProductInformation(categoryLinks['Gaming/Discount']);
}, 1800000);