var PdfApp = function() {
}

PdfApp.prototype = function() {
	var pdfText = "",
	infoDiv,
    pathDiv,
	pathToWrittenFile = "",
	onFileGenerated
        
	writeFile = function() {
		window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFileSystem, function() {
			console.log("failed to get fs")
		});
	},

	gotFileSystem = function(fileSystemPath) {
		fileSystemPath.root.getFile(pathToWrittenFile, {create: true, exclusive: false}, gotFileEntry, function() {
			console.log("error")
		});
	},

	gotFileEntry = function(fileEntry) {
		fileEntry.createWriter(gotFileWriter, function() {
			console.log("error")
		});
	},

	gotFileWriter = function(writer) {
		writer.onwriteend = function(evt) {
			onFileGenerated()
		};
		writer.write(pdfText);
	},
    
	openFile = function() {
		if (pathToWrittenFile !== "") {
			if (window.device.platform === 'Android') {
				window.plugins.childBrowser.openExternal("file://" + pathToWrittenFile);
			}
			else {
				window.plugins.childBrowser.showWebPage("file://" + pathToWrittenFile);
			}
		}
	},
    
	createFile = function(fileName, onGenerated) {
		var pdf = CreatePDF(false);
		onFileGenerated = onGenerated;
		infoDiv = document.getElementById("infoField");
        pathDiv = document.getElementById("pathField");
		pathToWrittenFile = window.location.href.replace('index.html', '').replace("file://", "") + fileName;
		infoDiv.innerText = "Generating...";
		pdf.onload(function() {
			pdfText = pdf.getText();
			infoDiv.innerText = "Gnerated! Writing...";
            pathDiv.innerText = "Path: " + pathToWrittenFile;
			writeFile();
		})
	};
    
	return{
		createFile:createFile,
		openFile:openFile,
	};
}();