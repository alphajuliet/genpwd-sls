// generator_1.js
// Generator 1
// The original generator
// aj

const R = require('ramda');
const G = require('./gen_common');

const c1 = G.WeightedList(
  {"b":2,"bl":1,"br":1,"c":2,"cr":1,"ch":2,"cl":1,"d":2,"f":2,"fl":1,
    "fr":1,"g":2,"gl":1,"gr":1,"h":1,"j":2,"k":2,"l":2,"m":3,"n":2,"p":2,
    "pl":1,"pr":1,"qu":1,"r":2,"s":3,"sh":2,"sk":1,"sl":1,"sm":1,"sn":1,
    "st":2,"str":1,"t":3,"th":2,"thr":1,"tr":2,"tw":1,"v":2,"w":1,"z":2});
const c2 = G.RandomList(
  ["b","bl","br","cr","ch","cl","d","f","fl","fr","g","gg", "gl","gr",
    "h","j","k","l","m","n","p","pl","pp","pr","pt","qu","r","s","sh","sk",
    "sl","sm","sn","st","str","t","th","thr","tr","tw","v","w","z"]);
const c3 = G.WeightedList(
  {"b":1,"ch":1,"ck":1,"ct":1,"d":2,"dd":1,"f":1,"ff":1,"ft":1,"g":1,
    "k":1,"l":2,"ll":1,"lb":1,"ld":1,"lm":1,"ln":1,"lp":1,"lt":1,"m":3,
    "mp":1,"mt":1,"n":3,"nd":1,"ng":1,"nn":1,"nt":1,"p":2,"pp":1,"pt":1,
    "rd":1,"rg":1,"rk":1,"rn":1,"rr":1,"rs":1,"rt":1,"s":3,"sh":1,"ss":2,
    "st":2,"t":3,"tt":2,"th":2,"v":2,"wn":1});
const v1 = G.WeightedList(
  {"a":5,"aa":1,"ai":1,"e":5,"ea":1,"ee":1,"i":5,"o":5,"oo":2,"u":2});
const v2 = G.WeightedList(
  {"a":5, "e":5,"i":5, "ia":1, "o":5, "oa":1,"oo":2, "u":2, "ua":1});
const v3 = G.WeightedList(
  {"a":5,"ao":1,"e":5,"ea":1,"ee":2,"eo":1,"i":2,"ia":2,"io":2,"o":5,
    "oa":2,"oo":2,"ow":2,"ua":1,"uo":1,"y":5});

var randomWord = (strength = 0, opts = {}) => {

  // puncF :: Map String Boolean -> (() -> String)
  let puncF = opts["punctuation"] ? G.RandomList(G.symbols) : G.emptyStringF;
  // numF  :: Map String Boolean -> Integer -> (() -> String)
  let numF  = n => opts["numbers"] ? G.randomNumericString(n) : G.emptyStringF;
  // capF  :: Map String Boolean -> (() -> String) -> (() -> String)
  let capF  = f => opts["capitals"] ? R.compose(G.capitalise, f) : f;

  let syll1 = [c1, v1, c2]; 

  var f;
  switch (G.dice(8)) {
    case 0:  f = [syll1, puncF, capF(c2), v2, c3]; break;
    case 1:  f = [v1, capF(c1), puncF, v2, c3]; break;
    case 2:  f = [c1, v1, puncF, capF(c3), v3]; break;
    case 3:  f = [v1, c1, v1, capF(c3), v3, puncF]; break;
    case 4:  f = [c1, v1, capF(c1), v2, c3, puncF]; break;
    case 5:  f = [puncF, capF(c1), v2, c3, v3]; break;
    case 6:  f = [c1, v1, capF(c2), puncF, v2, c3]; break;
    case 7:  f = [c1, v1, capF(c1), v1, c1, v1, puncF]; break;
    default: f = [c1, v1, puncF, capF(c3), v3]; break;
  }
  let w = (G.dice(2) < 1) ?  [f, numF(2)] : [numF(2), f];
  return G.crunch(w);
};

exports.randomWord = randomWord;

// The End
