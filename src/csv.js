function htmlToCsv() {
    const htmlInput = document.getElementById('html-input').value;
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlInput, 'text/html');
    const tables = doc.getElementsByTagName('table'); // NOTE: CSV reads data from tables

    if (tables.length === 0) { // if there exists data inside table
        alert ('No table found.'); // create error message for when it does not exist 
        return ''; // return empty string
    }

    let csvString = ''; // initialize CSV
    for (let table of tables) { // loop through the current table out of X number of tables
        for (let row of table.rows) { // loop through current row out of X number of rows
            
            // retrive text content of each cell, trim, and wrap in quotes 
            let cells = Array.from(row.cells).map(cell => `"${cell.textContent.trim()}"`);

            csvString += cells.join(',') + '\n'; // join the cells with commas and break line at end of each row
        }
    }

    document.getElementById('csv-output').textContent = csvString;
    document.getElementById('download-csv').style.display = 'inline';

    return csvString;
}

function downloadCsv (csvString) {
    const blob = new Blob([csvString], {type: 'text/csv'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'table.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(url);
}

document.getElementById('convert-csv').addEventListener('click', function() {
    const csvString = htmlToCsv();
    document.getElementById('download-csv').addEventListener('click', function() {
        downloadCsv(csvString);
    });
});