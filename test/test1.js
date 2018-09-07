const brain = require('brain.js'),
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

console.log(records);



net.train([{input: [0, 0], output: [0]},
    {input: [0, 1], output: [1]},
    {input: [1, 0], output: [1]},
    {input: [1, 1], output: [0]}]);

var output = net.run([0, 0]);  // [0]
console.log(output)
output = net.run([0, 1]);      // [1]
console.log(output)
output = net.run([1, 0]);      // [1]
console.log(output)
output = net.run([1, 1]);      // [0]
console.log(output)