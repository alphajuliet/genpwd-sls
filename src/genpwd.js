// genpwd.js
// Main entry to genpwd

const R = require('ramda');

// Add generators
const generators = [
  require('./generator_1'),
  require('./generator_2'),
  require('./generator_3'),
  require('./generator_4'),
];

// Application metadata
const Info = {
  name: "GenPwd",
  author: "AndrewJ",
  version: "3.0.0",
  date: "2018-09-22",
  info: "GenPwd is a simple password generator.",
  aboutText: function () {
    let str = this.name + " v" + this.version;
    str += ", last modified: " + this.date;
    str += " by: " + this.author + ".\n\n";
    str += this.info;
    return str;
  }
};

// Available generators
const generatorList = [
  { id: 0, name: "Generator 0" },
  { id: 1, name: "Generator 1" },
  { id: 2, name: "Generator 2" },
  { id: 3, name: "Markov", default: true }
]

// Generate a list of random words from the chosen generator.
const generate = async (event) => {
  const params = event.queryStringParameters || {};
  const genId = parseInt(params.genId) || 3;
  const generatorModule = generators[genId];
  const generator = generatorModule.default || generatorModule;
  const nwords = parseInt(params.nwords) || 10;
  const strength = parseInt(params.strength) || 0;

  const punctuation = params.punctuation || null;
  const numbers = params.numbers || null;
  const capitals = params.capitals || null;
  const options = {
    punctuation: punctuation,
    numbers: numbers,
    capitals: capitals
  };

  const resp = R.map(() => generator.randomWord(strength, options), R.range(0, nwords));
  return resp;
}
exports.info = Info;
exports.generators = generatorList;
exports.generate = generate;

// The End