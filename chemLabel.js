const rp = require('request-promise');
const $ = require('cheerio');
// const url = 'http://www.safecosmetics.org/get-the-facts/chemicals-of-concern/14-dioxane/'

// rp(url)
//     .then(function(html) {
//         // console.log(che('h2.entry-title > a', html));
//         var chems = $('p:contains("WHAT TO LOOK FOR ON THE LABEL:")', html).text();
//         chems = chems.replace("WHAT TO LOOK FOR ON THE LABEL: ", "");
//         chems = chems.replace(" and", ",");
//         console.log(chems);
//     })
//     .catch(function(err) {

//     });

var chemLabel = function(url) {
    return rp(url)
        .then(function(html) {
            var chems = $('p:contains("WHAT TO LOOK FOR ON THE LABEL:")', html).text().trim();
            return {chems, url};
        })
        .catch(function(err) {
            console.log(err);
        });
}

module.exports = chemLabel;