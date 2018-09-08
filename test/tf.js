const tf = require('@tensorflow/tfjs');
const
    parse = require('csv-parse/lib/sync'),
    fs = require('fs')
;

const brainConfig = {
    binaryThresh: 0.5,     // ¯\_(ツ)_/¯
    hiddenLayers: [5],     // array of ints for the sizes of the hidden layers in the network
    activation: 'sigmoid'  // supported activation types: ['sigmoid', 'relu', 'leaky-relu', 'tanh']
};

const net = new brain.NeuralNetwork(brainConfig);

const csvContent = fs.readFileSync('./insurance.csv');
const records = parse(csvContent, {columns: true});


/* MAPPING
* 1) age
* 2) sex
* 3) bmi
* 4) smoker
* */

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
const testSet = trainingSet.splice(1100, 500);


net.train(trainingSet);

testSet.forEach(set=>{
    const output = net.run(set.input);
    console.log('Input: ' + JSON.stringify(set.input));
    console.log('Output: ' + JSON.stringify(output));
});