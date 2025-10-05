//this is a simple test of java


const fs = require('fs').promises; // Use the Promise-based API for fs
const readline = require('readline');


// Setup the readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

/**
 * Wraps rl.question in a Promise for use with async/await.
 */
function askQuestion(query) {
    return new Promise(resolve => rl.question(query, resolve));
}

var globalData = [];

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

function parseCsv(csvString) {
    // Split the string into lines (rows)
    const lines = csvString.trim().split('\n');

    // Get the headers from the first line and split by commas
    const headers = lines[0].split(',');

    // Process the remaining lines (data)
    const data = lines.slice(1).map(line => {
        const values = line.split(',');
        const obj = {};

        // Map header names to values for each object
        for (let i = 0; i < headers.length; i++) {
            obj[headers[i].trim()] = values[i].trim();
        }

        return obj;
    });

    return data;
}


async function mainProg() {

    console.log("\nTHIS PROGRAM ADD AND OPEN CSVFILE");

    while (true) {

        console.log("\nMenu a add, o open, q exit ver 2");
        pressKey = await askQuestion("input: ");
        switch (pressKey) {

            case "a":
                console.log("start to add");
                for (i = 0; i < 2; i += 1) {
                    varName = await askQuestion("Name: ");
                    varAddress = await askQuestion("Address: ");
                    //console.log("\nvarName ", varName, "\nvarAddress ", varAddress);

                    globalData.push({ Name: varName, Address: varAddress });
                }

                const dataInput = convertToCsv(globalData);
                filePath = "./user.csv";

                //console.log("sample input ", dataInput, "\n\nhowever data is ", data);
                try {
                    await fs.writeFile(filePath, dataInput);
                    console.error('Sucesfully save it on ', filePath);
                } catch (error) {
                    console.error('An error occurred:', error.message);
                } finally {
                    //..other code here
                }
                break;
            case "o":
                filePath = "./user.csv";

                try {

                    // Read the file asynchronously
                    data = await fs.readFile(filePath, 'utf8');
                    globalData = parseCsv(data);
                    console.log(`\nfinal result from open mode data is \n`, globalData);
                } catch (error) {
                    console.log('error: ', error.message);
                }


                break;
        }

        if ("q" == pressKey) {
            console.log("\nexiting prog");
            rl.close();
            break;
        }
    }

}



mainProg();