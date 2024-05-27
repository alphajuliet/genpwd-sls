// gen_common.js
// Common functions across generators
// aj

const R = require('ramda');

// Capitalise a word
// capitalise :: String -> String
const capitalise = s => s.replace(/^[a-z]/, s => s.toUpperCase());

// Random number string in range [0, 10^n), padded to n digits
// randomNumericString :: Integer -> (() -> String)
const randomNumericString = (n) => {
  return () => {
    const x = Math.random() * (Math.pow(10, n)-1);
    return String("0000000000" + x).slice(-n);
  };
};

// Random 0 to n-1
// dice :: Integer -> Integer
const dice = (n) => Math.floor(Math.random() * n);

// Returns a function that returns a random element from the given list.
// RandomList :: [a] -> (() -> a)
const RandomList = (t) => 
  () => t[dice(t.length)];

// Return a function that randomly selects elements from a weighted list.
// A weighted list simply has more copies of higher weighted elements.
// WeightedList :: Map String Integer -> (() -> String)
const WeightedList = (t) => {

  // Creates multiple versions of an element based on the count.
  // e.g. {"a": 2, "b": 3} -> ["a", "a", "b", "b", "b"]
  // expandedList :: Map String Integer -> [String]
  const expandedList = (m) => R.chain(
    p => R.times(R.always(p[0]), p[1]),
    R.toPairs(m)
  );

  return RandomList(expandedList(t));
};

//---------------------------------
// Transform a random element in an array
// trRandElement :: (a -> a) -> [a] -> [a]
const trRandElement = R.curry((f, arr) => { 
  const idx = dice(arr.length);
  return R.join('', R.update(idx, f(arr[idx]), arr));
});

const symbols =  ["!","#","$","^","*","&", "+","@","-","=","/","~","?","\\","%","[","]","{","}","(",")"];

// emptyStringF :: * -> String
const emptyStringF = R.always("");

// Functional "smarts"
// Call each function in the list and concatenate the results.
// crunch :: [() -> String] -> String
const crunch = f => R.join('', R.juxt(R.flatten(f))());

module.exports = {
  capitalise: capitalise,
  randomNumericString: randomNumericString,
  dice: dice,
  symbols: symbols,
  RandomList: RandomList,
  WeightedList: WeightedList,
  trRandElement: trRandElement,
  emptyStringF: emptyStringF,
  crunch: crunch
};

// The End
