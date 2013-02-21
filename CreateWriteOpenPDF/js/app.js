var pdfApp = new PdfApp();

document.addEventListener("deviceready", onDevoceReady, false);

function onDevoceReady() {
	navigator.splashscreen.hide();
	
	$("#generatePdf").on("touchstart", onGenerateFile);
}

function onGenerateFile() {
	pdfApp.createFile("test.pdf", onFileGenerated);
}

function onFileGenerated() {
	var $openPdf = $("#openPdf");
	document.getElementById("infoField").innerText = "Ready to open";
	$openPdf.off("touchstart");
	$openPdf.on("touchstart", pdfApp.openFile)
	$openPdf.removeAttr("disabled");
}