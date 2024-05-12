// generator.js
// Generator 3
// Another attempt at Englishy words
// aj

const R = require('ramda');
const G = require('./gen_common');

// Consonants
const c = G.WeightedList(
  {"k":5,"g":5,"t":5,"d":5,"s":5,"z":2,"b":4,
    "p":3,"n":4,"r":5,"m":4,"j":1,"sh":2,"l":2,"ch":2});
const ce = G.WeightedList(
  {"ck":1,"g":3,"t":3,"d":3,"ss":2,"bb":1,
    "pp":1,"rp":1,"n":4,"th":1,"m":2,"sh":2,"ll":2,"ch":2,
    "st":2,"nt":2,"ft":1,"mt":1,"rk":2,"rm":1,"rn":1,"rs":1,"rt":2,
    "ng":2,"nch":1,"nd":1,"rd":1,"sk":1,"nce":1,"rce":1});
const cs = G.WeightedList(
  {"k":5,"g":5,"t":5,"d":5,"s":5,"z":2,"b":4,
    "p":3,"n":4,"r":5,"m":4,"j":2,"sh":2,"l":2,"ch":2,
    "bl":1,"br":1,"dr":1,"fl":1,"fr":1,"gl":1,"gr":1,
    "cl":1,"cr":1,"sl":1,"st":1,"str":1,"thr":1,"tr":2,"tw":1,
    "w":1});

// Vowels
const vm = G.WeightedList(
  {"a":4,"ai":1,"e":4,"ee":2,"io":1,"oo":2,"i":4,"o":4,"u":2});
const ve = G.WeightedList(
  {"a":2,"ee":1,"i":2,"io":1,"o":2,"oo":1,"y":2});
const vs = G.WeightedList(
  {"a":1,"e":1,"i":1,"o":1});


var randomWord = (strength = 0, opts = {}) => {

  // puncF :: Map String Boolean -> (() -> String)
  let puncF = opts["punctuation"] ? G.RandomList(G.symbols) : G.emptyStringF;
  // numF  :: Map String Boolean -> Integer -> (() -> String)
  let numF  = n => opts["numbers"] ? G.randomNumericString(n) : G.emptyStringF;
  // capF  :: Map String Boolean -> (() -> String) -> (() -> String)
  let capF  = f => opts["capitals"] ? R.compose(G.capitalise, f) : f;

  var f;
  switch (G.dice(6)) {
    case 0:  f = [c, vm, capF(c), vm, ce]; break;
    case 1:  f = [capF(c), vm, c, ve]; break;
    case 2:  f = [cs, vm, capF(c), vm, c, ve]; break;
    case 3:  f = [capF(cs), vm, c]; break;
    case 4:  f = [vs, c, capF(c), ve]; break;
    case 5:  f = [vs, c, capF(c), vm, cs]; break;
    default: f = [capF(c), vm, c, vm, c, vm, ce]; break;
  }

  let w = (G.dice(2) < 1) ? [f, puncF, numF(2)] : [numF(2), f, puncF];
  return G.crunch(w);
};

exports.randomWord = randomWord;

// The End
