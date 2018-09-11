var  Normalizer = exports.Normalizer = new function normalizer(){
    var normalizier = this;
    this.ageQ = 1;
    this.bmiQ = 1;
    this.chargesQ = 1;
    this.findQuotient = function(unitName, arrayOfValues){
        let max = Math.max(...arrayOfValues);
        console.log('Max value for ' + unitName + ' is: ' + max);
        normalizier[unitName + 'Q'] = 1 / max;
        console.log('Quotient for ' + unitName + ' is: ' + normalizier[unitName + 'Q']);
    };
    this.normalizeUnit = function(unitName, originalValue){
        return originalValue * normalizier[unitName + 'Q'];
    };
    this.denormalizeUnit = function(unitName, normalizedValue){
        return normalizedValue / normalizier[unitName + 'Q'];
    };
};

exports.normalize = function(trainingSet){
    Normalizer.findQuotient('age', trainingSet.map(o=>o.input[0]));
    Normalizer.findQuotient('bmi', trainingSet.map(o=>o.input[2]));
    Normalizer.findQuotient('charges', trainingSet.map(o=>o.output[0]));

    return trainingSet.map(rec =>{
        return {input:[
                Normalizer.normalizeUnit('age',rec.input[0]),
                rec.input[1],
                Normalizer.normalizeUnit('bmi',rec.input[2]),
                rec.input[3]
            ], output: [
               Normalizer.normalizeUnit('charges',rec.output[0])
            ]};
    });
};