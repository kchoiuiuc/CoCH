function keywordsHighlighter(options, remove) {
	var occurrences = 0;
	// Based on "highlight: JavaScript text higlighting jQuery plugin" by Johann Burkard.
	// http://johannburkard.de/blog/programming/javascript/highlight-javascript-text-higlighting-jquery-plugin.html
	// MIT license.
	function highlight(node, pos, keyword, options, url) {
		var anchor = document.createElement("a");
		anchor.className = "highlighted";
		anchor.style.color = options.foreground;
		anchor.style.backgroundColor = options.background;
		anchor.setAttribute("href", url);

		var highlighted = node.splitText(pos);
		/*var afterHighlighted = */highlighted.splitText(keyword.length);
		var highlightedClone = highlighted.cloneNode(true);

		anchor.appendChild(highlightedClone);
		highlighted.parentNode.replaceChild(anchor, highlighted);
	}

	function addHighlights(node, keywords, indices, options, urls) {
		var skip = 0;

		var i;
		if (3 == node.nodeType) {
			for (i = 0; i < keywords.length; i++) {
				var keyword, pos;
				if (keywords[i].length > 3) {
					keyword = keywords[i].toLowerCase();
					pos = node.data.toLowerCase().indexOf(keyword);
				}
				else {
					keyword = keywords[i];
					pos = node.data.indexOf(keyword);
				}
				var url = urls[indices[i]];
				if (0 <= pos) {
					highlight(node, pos, keyword, options, url);
					skip = 1;
				}
			}
		}
		else if (1 == node.nodeType && !/(script|style|textarea)/i.test(node.tagName) && node.childNodes) {
			for (i = 0; i < node.childNodes.length; i++) {
				if (node.className != "highlighted")
					i += addHighlights(node.childNodes[i], keywords, indices, options, urls);
			}
		}
		return skip;
	}

	function removeHighlights(node) {
		var anchor;
		while (anchor = node.querySelector("a.highlighted")) {
			anchor.outerHTML = anchor.innerHTML;
		}
	}

	if (remove) {
		removeHighlights(document.body);
	}

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