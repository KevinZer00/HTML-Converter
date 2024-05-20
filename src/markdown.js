
// conversion function for HTML to Markdown
function htmlToMarkdown() {
    const htmlInput = document.getElementById('html-input').value; 
    const turndownService = new TurndownService(); 
    let markdownString = turndownService.turndown(htmlInput);

    document.getElementById('markdown-output').textContent = markdownString;
    document.getElementById('download-markdown').style.display = 'inline';

    return markdownString;

}

function downloadMarkdown(markdownString) {
    const blob = new Blob([markdownString], { type: 'text/markdown' }); // create a blob to store JSON stuff
    const url = URL.createObjectURL(blob); // create temp URL so browser can reference to blob 

    const a = document.createElement('a'); // create an <a> element that will trigger download
    a.href = url; // set the destination to blob URL
    a.download = 'data.md'; // set file name 
    document.body.appendChild(a); // append the <a> to body; must be there to be clickable NOTE: this will not be seen
    a.click(); // click the <a> to trigger the download
    document.body.removeChild(a); // remove the <a> after

    URL.revokeObjectURL(url); // revoke the Blob URL to free up resources and avoid memory leaks
}


document.getElementById('convert-markdown').addEventListener('click', function() {
    const markdownString = htmlToMarkdown();
    document.getElementById('download-markdown').addEventListener('click', function() {
        downloadMarkdown(markdownString);
    });
});
