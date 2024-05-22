/* NOTE: THESE TWO STEPS ARE ONLY NEEDED IF TESTING HARDCODED DATA

// Step 1: Define the HTML string
const html = `
 <!DOCTYPE html>
 <html lang="en">
 <head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <title>Document</title>
 </head>
 <body>
     <h1>Hi there</h1>
     <p>This is a paragraph.</p>
 </body>
 </html>
 `;

// Step 2: convert HTML string to DOM object for manipulation
const parser = new DOMParser(); // create instance 
const doc = parser.parseFromString(html, 'text/html'); // convert HTML string to object

*/

 // Step 1: Allow user to also import HTML file; will display results in text box
 function handleFileUpload(event) {
    const file = event.target.files[0]; // access first file in file input element
    if (file) { // if file is selected
        const reader = new FileReader(); // creates FileReader object to read contents
        reader.onload = function(e) { // callback function for once file is read 
            const htmlInput = e.target.result; // retrieves file content as string 
            document.getElementById('html-input').value = htmlInput; // displays HTML content in text box
        };
        reader.readAsText(file); // read file as text
    }
}

function tableToJson() {
    const inputHTML = document.getElementById('html-input').value; // access the value of whatever is HTML input
    const parser = new DOMParser();
    const doc = parser.parseFromString(inputHTML, 'text/html');
    const table = doc.querySelector('table');

    if (!table) {
        document.getElementById('json-output').textContent = 'No table found';
        document.getElementById('download-csv').style.display = 'none';
        return null;
    }

    const headers = Array.from(table.querySelectorAll('th')).map(th => th.innerText.trim()); 
    const rows = table.querySelectorAll('tbody tr');
    const jsonData = Array.from(rows).map(row => {
        const cells = row.querySelectorAll('td');
        let obj = {};
        cells.forEach((cell, index) => {
            obj[headers[index]] = cell.innerText.trim();
        });
        return obj;
    });

    const jsonString = JSON.stringify(jsonData, null, 2);
    document.getElementById('json-output').innerText = jsonString;
    return jsonString;
}


// Step 5: Attach event listeners to the buttons
document.getElementById('file-input').addEventListener('change', handleFileUpload); // event listener for file upload function
document.getElementById('convert-json').addEventListener('click', function() { // event listener for convert JSON button
    const jsonString = tableToJson(); // calls function to convert HTML to JSON
    document.getElementById('download-json').addEventListener('click', function() { // event listener for download JSON button
        downloadJson(jsonString); // calls function to download JSON with newly converted string
    });
});


