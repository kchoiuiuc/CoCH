document.addEventListener("DOMContentLoaded", function() {
	loadChemicals();

    document.getElementById("buttonSave").addEventListener("click", function() {
        saveChemicals();
        window.close();
    });
    
    document.getElementById("buttonCancel").addEventListener("click", function() {
        window.close();
	});
});

function loadChemicals() {
	if ("undefined" != typeof localStorage) {
		document.getElementById("textareaChemicals").value = localStorage.getItem("chemicals");
		document.getElementById("textareaUrls").value = localStorage.getItem("urls");
	}
}

function saveChemicals() {
	if ("undefined" != typeof localStorage) {
		localStorage.setItem("chemicals", document.getElementById("textareaChemicals").value);
        localStorage.setItem("urls", document.getElementById("textareaUrls").value);
	}
}

$(document).ready(function(){
    $(".optionsLeft").width(window.screen.width/4.5);
    $(".em-options").width(window.screen.width/5);
    $(".coc").width(window.screen.width/5);
    $(".links").width(window.screen.width/3.5);
    $(".lined").height(window.screen.height/2);
    $(".lined").linedtextarea();
 });