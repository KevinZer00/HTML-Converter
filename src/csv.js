function htmlToCsv() {
    const htmlInput = document.getElementById('html-input').value;
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlInput, 'text/html');
    const table = doc.querySelector('table'); // NOTE: CSV reads data from tables

    if (!table) { // if there exists data inside table
        document.getElementById('csv-output').textContent = 'No table found';
        document.getElementById('download-csv').style.display = 'none';
        return null;
    }

    let csvString = ''; // initialize CSV
    for (let row of table.rows) { // loop through current row out of X number of rows

        // retrive text content of each cell, trim, and wrap in quotes 
        let cells = Array.from(row.cells).map(cell => `"${cell.textContent.trim()}"`);

        csvString += cells.join(',') + '\n'; // join the cells with commas and break line at end of each row
    }

    document.getElementById('csv-output').textContent = csvString;
    document.getElementById('download-csv').style.display = 'inline';

    return csvString;
}

function downloadCsv(csvString) {
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'table.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(url);
}

document.getElementById('convert-csv').addEventListener('click', function () {
    const csvString = htmlToCsv();
    document.getElementById('download-csv').addEventListener('click', function () {
        downloadCsv(csvString);
    });
});