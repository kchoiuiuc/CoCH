// Kevin Choi
// Get the contents of a page, highlight the keywords by replacing the plaintext with the highlighted (background modified)
// text with anchor to the related website attached.
function keywordsHighlighter(options, remove) {
	var occurrences = 0;
	// Highlighting function based on "highlight: JavaScript text higlighting jQuery plugin" by Johann Burkard.
	// http://johannburkard.de/blog/programming/javascript/highlight-javascript-text-higlighting-jquery-plugin.html
	// MIT license.
	function highlight(node, pos, keyword, options, url) {
		// Create an anchor object that would be replacing the plaintext
		var anchor = document.createElement("a");
		anchor.className = "highlighted";
		anchor.style.color = options.foreground;
		anchor.style.backgroundColor = options.background;
		anchor.setAttribute("href", url);
		// Get the plaintext with the position and the length
		var highlighted = node.splitText(pos);
		/*var afterHighlighted = */highlighted.splitText(keyword.length);
		var highlightedClone = highlighted.cloneNode(true);
		// Replace
		anchor.appendChild(highlightedClone);
		highlighted.parentNode.replaceChild(anchor, highlighted);
	}
	// Get and replace plaintexts
	function addHighlights(node, keywords, indices, options, urls) {
		var skip = 0;

		var i;
		// nodeType 3 indicates text node
		if (3 == node.nodeType) {
			for (i = 0; i < keywords.length; i++) {
				var keyword, pos;
				// case insensitive if length greater than 3
				if (keywords[i].length > 3) {
					keyword = keywords[i].toLowerCase();
					pos = node.data.toLowerCase().indexOf(keyword);
				}
				else {
					keyword = keywords[i];
					pos = node.data.indexOf(keyword);
				}
				var url = urls[indices[i]];
				// invalid position
				if (0 <= pos) {
					highlight(node, pos, keyword, options, url);
					skip = 1;
				}
			}
		}
		// nodeType 1 indicates element node (p or div)
		// Check the comments of these elements
		else if (1 == node.nodeType && !/(script|style|textarea)/i.test(node.tagName) && node.childNodes) {
			for (i = 0; i < node.childNodes.length; i++) {
				if (node.className != "highlighted")
					i += addHighlights(node.childNodes[i], keywords, indices, options, urls);
			}
		}
		return skip;
	}
	// Remove highlights by replacing the anchored nodes with its text (plaintext)
	function removeHighlights(node) {
		var anchor;
		while (anchor = node.querySelector("a.highlighted")) {
			anchor.outerHTML = anchor.innerHTML;
		}
	}

	if (remove) {
		removeHighlights(document.body);
	}
	// parsing keywords from the url
	var keywords = options.keywords.split("\n");
	var indices = [];
	for (var i=0; i<keywords.length; i++) {
		var comma = 0;
		while (comma < keywords[i].length) {
			if (keywords[i][keywords[i].length-comma]==",") break;
			comma++;
		}
		if (comma == keywords[i].length) {
			indices.push(null);
			break;
		}

		indices.push(parseInt(keywords[i].substring(keywords[i].length-comma+1, keywords[i].length)));
		keywords[i] = keywords[i].substring(0, keywords[i].length-comma);
	}
	var urls = options.urls.split("\n");
	delete options.keywords;
	delete options.urls;

	addHighlights(document.body, keywords, indices, options, urls);
}
// Passive chrome listner waiting for the user input to highlight the chemicals
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if ("returnChemicals" == request.message) {
		if ("undefined" != typeof request.keywords && request.keywords) {
			keywordsHighlighter({
					"keywords": request.keywords,
					"urls": request.urls,
					"foreground": request.foreground,
					"background": request.background
				},
				request.remove
			);
		}
	}
});
