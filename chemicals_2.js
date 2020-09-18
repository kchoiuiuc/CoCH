const rp = require('request-promise');
const $ = require('cheerio');
const chemLabel = require('./chemLabel');
const url = 'http://www.safecosmetics.org/get-the-facts/chem-of-concern/';
const chemUrls = [];

async function chemicals(url) {
    try {
        const html = await rp(url);
        // console.log(che('h2.entry-title > a', html));
        for (let i = 0; i < $('h2.entry-title > a', html).length; i++) {
            chemUrls.push($('h2.entry-title > a', html)[i].attribs.href);
        }
        Promise.all(
            chemUrls.map(function (url_1) {
                return chemLabel(url_1);
            })
        ).then(function(proms){console.log(proms);})
    } catch (err) {
        console.log(err);
    }
}

async function makeList() {
    var foo = await chemicals(url);
    console.log(foo);
}

makeList();