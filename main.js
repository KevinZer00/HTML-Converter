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

// Step 2: Add elements to object
function elementToJson(element) {
    const obj =
    {
        tag: element.tagName.toLowerCase(), // OPTIONAL: convert to lowercase; HTML isn't case sensitive, JS is
        attributes: {}, // initialize empty object for attributes (class, id, etc)
        children: [] // initialize empty array for child elements 
    };

    // loop through attributes and add them to the object 
    for (let attrib of element.attributes) { // all attributes of current HTML element with name + value
        obj.attributes[attrib.name] = attrib.value; // store element's attributes
    }

    // Loop through child nodes
    for (let child of element.childNodes) {
        if (child.nodeType === 1) {  // check if element node (div, p, etc)
            obj.children.push(elementToJson(child)); // process child elements recursively
        }
        else if (child.nodeType === 3) { // text node 
            const textContent = child.textContent.trim(); // remotes blank on both ends
            if (textContent) { // if not empty
                obj.children.push(textContent); // add text content 
            }
        }
    }

    return obj;
}


// Step 3: Convert HTML to JSON
function htmlToJson() {
    const htmlInput = document.getElementById('html-input').value; // retreive HTML input from text box
    const parser = new DOMParser(); // create instance
    const doc = parser.parseFromString(htmlInput, 'text/html'); // convert HTML string to object
    const json = elementToJson(doc.documentElement); // convert the object to JSON by calling function
    const jsonString = JSON.stringify(json, null, 2); // convert JSON to string 

    document.getElementById('json-output').textContent = jsonString; //display the JSON inside <pre> element
    document.getElementById('download-json').style.display = 'inline'; // display download button once JSON data is displayed otherwise would have to handle error scenario

    return jsonString; // store the JSON string for download
}



// Step 4: Add functionality to download JSON as a file
function downloadJson(jsonString) {
    const blob = new Blob([jsonString], { type: 'application/json' }); // create a blob to store JSON stuff
    const url = URL.createObjectURL(blob); // create temp URL pointing to blob 

    const a = document.createElement('a'); // create an <a> element that will trigger download
    a.href = url; // set the destination to blob URL
    a.download = 'test.json'; // set file name 
    document.body.appendChild(a); // append the <a> to the body. NOTE: this will not be seen
    a.click(); // click the <a> to trigger the download
    document.body.removeChild(a); // remove the <a> after

    URL.revokeObjectURL(url); // revoke the Blob URL to free up resources
}



// Step 5: Attach event listeners to the buttons
document.getElementById('file-input').addEventListener('change', handleFileUpload); // event listener for file upload function

document.getElementById('convert-json').addEventListener('click', function() { // event listener for convert JSON button
    const jsonString = htmlToJson(); // calls function to convert HTML to JSON
    document.getElementById('download-json').addEventListener('click', function() { // event listener for download JSON button
        downloadJson(jsonString); // calls function to download JSON with newly converted string
    });
});


