const brain = require('brain.js'),
    data = require('./loadCsv')
;

const brainConfig = {
    binaryThresh: 0.5,     // ¯\_(ツ)_/¯
    hiddenLayers: [5],     // array of ints for the sizes of the hidden layers in the network
    activation: 'sigmoid'  // supported activation types: ['sigmoid', 'relu', 'leaky-relu', 'tanh']
};

const net = new brain.NeuralNetwork(brainConfig);

const trainingSet = data.testSet;
const testSet = data.testSet;

net.train(trainingSet);

testSet.forEach(set=>{
    const output = net.run(set.input);
    console.log('Input: ' + JSON.stringify(set.input));
    console.log('Output: ' + JSON.stringify(output));
});