const parse = require('csv-parse/lib/sync'),
    fs = require('fs'),
    normalizer = require('./normalizer')
;

/* MAPPING
* 1) age
* 2) sex
* 3) bmi
* 4) smoker
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

const trainingSet = records.map(record=>transformRecord(record));

normalizer.normalize(trainingSet);


const testSet = trainingSet.splice(1100, 500);

exports.trainingSet = trainingSet;
exports.testSet = testSet;

