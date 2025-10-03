//this is a simple test of java

const fs = require("fs");
const path = require("path");
inpStr = require("prompt-sync")();

//may error dito
var data = {};

function convertToCsv(arr) {
    if (arr.length === 0) {
        return '';
    }

    // Get the headers from the first object's keys
    const headers = Object.keys(arr[0]).join(',');

    // Map each object to a string of its values, then join with newlines
    const rows = arr.map(obj => Object.values(obj).join(',')).join('\n');

    // Combine the headers and the rows
    return `${headers}\n${rows}`;
}




function mainProg() {

    console.log("\nTHIS PROGRAM ADD AND OPEN CSVFILE");

    while (true) {

        console.log("\nMenu a add, o open, q exit");
        pressKey = inpStr();
        switch (pressKey) {



            case "a":
                console.log("inputing data name and address");
                for (let i = 0; i < 2; i += 1) {
                    varName = inpStr("Name: ");
                    varAdd = inpStr("Address: ");
                    data.push({ Name: varName, Add: varAdd });

                }
                const csvString = convertToCsv(data);

                // Use fs.writeFile to save the file
                // The asynchronous method is preferred to avoid blocking the main thread.
                fs.writeFile(filePath, csvString, 'utf8', (err) => {
                    if (err) {
                        console.error('An error occurred while writing the file:', err);
                        return;
                    }

                    console.log('CSV file has been saved successfully!');
                    console.log(`File location: ${filePath}`);
                });

        }
        if ("q" == pressKey) {
            console.log("\nexiting prog");
            break;
        }
    }

}



mainProg();