const rp = require('request-promise');
const $ = require('cheerio');
const chemLabel = require('./chemLabel');
const url = 'http://www.safecosmetics.org/get-the-facts/chem-of-concern/'
const chemUrls = [];

rp(url)
    .then(function(html) {
        // console.log(che('h2.entry-title > a', html));
        for (let i = 0; i < $('h2.entry-title > a', html).length; i++) {
            chemUrls.push($('h2.entry-title > a', html)[i].attribs.href);
        }
    })
    .then(async function() {
        const chemArray = await Promise.all(
            chemUrls.map(function (url) {
                return chemLabel(url);
            })
        );
        console.log(chemUrls.map(function (url) {
            return chemLabel(url);
        }));
        for (i = 0; i < chemArray.length; i++) {
            chemArray[i].chems = await chemArray[i].chems.replace(/WHAT TO LOOK FOR ON THE LABEL: /g, '');
        }

        // var newString = await chemArray[0].chems.replace('WHAT TO LOOK FOR ON THE LABEL: ', '');
        // console.log(newString);
    })
    .catch(function(err) {
        console.log(err);
    });
