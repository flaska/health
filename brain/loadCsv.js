const parse = require('csv-parse/lib/sync'),
    fs = require('fs')
;

/* MAPPING
* 0) age
* 1) sex
* 2) bmi
* 3) smoker
* */

const csvContent = fs.readFileSync('./insurance.csv');
const records = parse(csvContent, {columns: true});

function transformRecord(record){
    return {
        input: [
            parseFloat(record.age),
            record.sex==='male'?1:0,
            parseFloat(record.bmi),
            record.smoker==='yes'?1:0
        ],
        output: [parseFloat(record.charges)]
    };
}

exports.trainingSet = records.map(record=>transformRecord(record));



