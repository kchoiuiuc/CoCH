document.addEventListener("DOMContentLoaded", function() {
    loadColors();

	document.getElementById("buttonSave").addEventListener("click", function() {
		saveColors();
		window.close();
    });

    document.getElementById("buttonOptions").addEventListener("click", function() {
        chrome.runtime.openOptionsPage()
    });
});

function saveColors() {
	if ("undefined" != typeof localStorage) {
		localStorage.setItem("foreground", document.getElementById("colorForeground").value);
        localStorage.setItem("background", document.getElementById("colorBackground").value);
    }
}

function loadColors() {
	if ("undefined" != typeof localStorage) {
		document.getElementById("colorForeground").value = localStorage.getItem("foreground") || "#000000";
		document.getElementById("colorBackground").value = localStorage.getItem("background") || "#ffff00";
	}
}