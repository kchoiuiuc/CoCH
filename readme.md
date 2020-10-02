# Chemicals of Corcern Highlighter
<img src="https://github.com/gchoi17/highlight_harmful_chemicals/blob/master/src/icons/flask_128.png" align="right" style="padding-left: 10px" />
Search ingredients, highlight chemicals of concern in cosmetics or skin care products and click the highlighted chemical to see the related document!

In order to use, go to a website that shows ingredients of a product and click the search button. If you want to see more information about the chemical of concern, simply click the highlighted chemical to see the related documents on Safe Cometics.

## Keywords (chemicals of concern)
To add or remove keywords (chemicals of concern), click edit keywords button to go to the options page. Keywords are stored as a [keyword, index] pair, and index indicates the line number of url of related documents.

## Highlighting
To change the font or background (highlight) colors, choose colors that you want on popup and click the save colors button.

### Sources
linedtextarea: https://github.com/cotenoni/jquery-linedtextarea<br>
icons:  <span>
            Icons made by 
            <a href="http://www.freepik.com/" title="Freepik">Freepik</a> from 
            <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
        </span><br>
Default list of chemicals of concern was scraped from <a href=http://www.safecosmetics.org/>Safe Cosmetics</a> using Python Beautiful Soup and Selenium Chromedriver<br>
Based on an earlier chrome extension named
*Automatic Keywords Highlighter*(https://github.com/wrzlbrmft/chrome-keywords-highlighter)<br>
