
// Convert  HTML to XML
function htmlToXml() {
    const htmlInput = document.getElementById('html-input').value;
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlInput, 'text/html');
    const serializer = new XMLSerializer(); // serialize DOM object to an XML string
    let xmlString = serializer.serializeToString(doc.documentElement);


    document.getElementById('xml-output').textContent = xmlString;
    document.getElementById('download-xml').style.display = 'inline';

    return xmlString;
}


function downloadXml(xmlString) {
    const blob = new Blob([xmlString], { type: 'application/xml'});
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'stuff.xml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(url);
}

// Step 5: Attach event listeners to the buttons
document.getElementById('file-input').addEventListener('change', handleFileUpload); // event listener for file upload function

document.getElementById('convert-xml').addEventListener('click', function() {
    const xmlString = htmlToXml();
    document.getElementById('download-xml').addEventListener('click', function() {
        downloadXml(xmlString);
    });
});

