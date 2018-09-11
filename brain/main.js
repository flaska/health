const brain = require('brain.js'),
    data = require('./loadCsv'),
    normalizer = require('./normalizer'),
    Normalizer = normalizer.Normalizer
;

const brainConfig = {
    binaryThresh: 0.5,     // ¯\_(ツ)_/¯
    hiddenLayers: [5],     // array of ints for the sizes of the hidden layers in the network
    activation: 'sigmoid'  // supported activation types: ['sigmoid', 'relu', 'leaky-relu', 'tanh']
};

const net = new brain.NeuralNetwork(brainConfig);

var trainingSet = data.trainingSet;

trainingSet = normalizer.normalize(trainingSet);
const testSet = trainingSet.splice(1100, 500);

net.train(trainingSet);


testSet.forEach(set=>{
    const output = net.run(set.input);

    const realCost = Normalizer.denormalizeUnit('charges', set.output[0]);
    const predictedCost = Normalizer.denormalizeUnit('charges', output[0]);

    console.log('Input: ' + JSON.stringify([
        Normalizer.denormalizeUnit('age', set.input[0]),
        set.input[1],
        Normalizer.denormalizeUnit('bmi', set.input[2]),
        set.input[3]
    ]));
    console.log('Real cost: ' + realCost);
    console.log('Predicted cost: ' + predictedCost);
});