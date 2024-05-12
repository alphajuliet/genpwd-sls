// generator.js
// Generator 2
// Pseudo-Japanese style
// aj

const R = require('ramda');
const G = require('./gen_common');

const c1 = G.WeightedList(
  {"k":5,"g":5,"t":5,"d":5,"s":5,"z":4,"h":3,"b":3,
    "p":3,"n":3,"r":5,"m":5,"y":2,"gy":1,"j":2,"sh":2,
    "ch":2,"ky":1,"hy":1,"ry":2,"my":1,"ny":1,"by":1,"py":1});
const v1 = G.WeightedList(
  {"a":2,"i":1,"u":2,"e":1,"o":2, "ou":1});
const n = G.WeightedList(
  {"":5, "n":1});

var randomWord = (strength = 0, opts = {}) => {

  // puncF :: Map String Boolean -> (() -> String)
  let puncF = opts["punctuation"] ? G.RandomList(G.symbols) : G.emptyStringF;
  // numF  :: Map String Boolean -> Integer -> (() -> String)
  let numF  = n => opts["numbers"] ? G.randomNumericString(n) : G.emptyStringF;
  // capF  :: Map String Boolean -> (() -> String) -> (() -> String)
  let capF  = f => opts["capitals"] ? R.compose(G.capitalise, f) : f;

  let syll = [capF(c1), v1, n];

  var f;
  switch (G.dice(4)) {
    case 0:  f = [syll, puncF, c1, v1]; break;
    case 1:  f = [syll, puncF, syll, c1, v1]; break;
    case 2:  f = [v1, syll, puncF, syll]; break;
    case 3:  f = [puncF, syll, syll]; break;
    default: f = [syll, syll, puncF]; break;
  }

  let g = (G.dice(2) < 1) ? [f, numF(2)] : [numF(2), f];

  let w = G.crunch(g); // Turn into a string

  w = w.replace(/[Tt]i/, "chi");
  w = w.replace(/[Ss]i/, "shi");
  w = w.replace(/[Hh]u/, "fu");
  w = w.replace(/[Cc]fu/, "chu"); // fix from the previous rule when it matches "chu"
  w = w.replace(/[Ss]fu/, "shu"); // fix from the previous rule when it matches "shu"
  w = w.replace(/[Tt]u/, "tsu");
  w = w.replace(/[Ss]he/, "sho");
  w = w.replace(/(\wy)[ie]/, "$1o");
  return w;
};

exports.randomWord = randomWord;

// The End
