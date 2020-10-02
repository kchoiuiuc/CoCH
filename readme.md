# Chemicals of Corcern Highlighter
<img src="https://github.com/gchoi17/highlight_harmful_chemicals/blob/master/src/icons/flask_128.png" align="right" style="padding-left: 10px" />
Search ingredients, highlight chemicals of concern in cosmetics or skin care products and click the highlighted chemical to see the related document!

### Instruction
In order to use, go to a website that shows ingredients of a product, click the extension icon to activate popup and click the search button. If you want to see more information about the chemical of concern, simply click the highlighted chemical to see the related documents on Safe Cometics.

### Keywords (chemicals of concern)
To add or remove keywords (chemicals of concern), click edit keywords button to go to the options page. Keywords are stored as a [keyword, index] pair, and index indicates the line number of url of related documents.

### Highlighting
To change the font or background (highlight) colors, choose colors that you want on popup and click the save colors button.

## Installation

### Getting the Source Code

You can download the latest source code as a [ZIP
file](https://github.com/gchoi17/highlight_harmful_chemicals/archive/master.zip)
or use Git:

```
git clone https://github.com/gchoi17/highlight_harmful_chemicals.git
```

### Testing in Google Chrome

If you want to test your contributions in Chrome, you can load the extension
directly from its source directory. First, download the source code as described
above. Then open Chrome and follow these steps:

1. Visit `chrome://extensions`.
2. Make sure that the *Developer mode* is active (checkbox in the upper-right
corner).
3. Click on *Load unpacked extension...*.
4. Navigate into the `src` directory of the source code and select it.

Whenever you updated a file of the extension you have to reload it in Chrome.
To do so, simply visit `chrome://extensions` again and hit *Ctrl+R*.

## Sources
* linedtextarea: https://github.com/cotenoni/jquery-linedtextarea<br>
* Icons:  <span>
            Icons made by 
            <a href="http://www.freepik.com/" title="Freepik">Freepik</a> from 
            <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
        </span><br>
* Default list of chemicals of concern was scraped from <a href=http://www.safecosmetics.org/>Safe Cosmetics</a> using Python Beautiful Soup and Selenium Chromedriver<br>
* Based on an earlier chrome extension named
*Automatic Keywords Highlighter*(https://github.com/wrzlbrmft/chrome-keywords-highlighter)<br>
