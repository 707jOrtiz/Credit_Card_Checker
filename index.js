// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5];


// Hours wasted on this one function: 4
function validateCred(array) {
  let doubled = [];
  let slicedCard = array.slice(0, -1)
  slicedCard.reverse()
  // Both loops following Luhn algorithm to check validiation
  for (let i in slicedCard) {
    if (i%2 == 0) {
      doubled.push(slicedCard[i] * 2);
    } else {
      doubled.push(slicedCard[i]);
    }  
  }
  // Second for loop to subtract numbers that are over 9, following the algorithm
  for (let i in doubled) {
    if (doubled[i] > 9) {
      doubled[i] -= 9;
    }
  }
  doubled.push(array[array.length - 1]);
  var sum = doubled.reduce((a, b) => a + b, 0)
  if (sum%10 === 0) {
    return true;
  } else {
    return false;
  }
}

// Returns invalid numbers in 'batch' while 'batch' is in a nested array
function findInvalidCards(nested) {
  let invalids = []
  for (let i of nested) {
    for (let j of i) {
      if (validateCred(j) == false) {
        invalids.push(j);
      }
    }
  }
  return invalids;
}

// Returns companies that have cards with invalid numbers using findInvalidCards function
function idInvalidCardCompanies(nested) {
  var nums = []
  var invalids = findInvalidCards(nested)
  for (let i of invalids) {
    nums.push(i[0]);
  }
  var list = []
  for (let i of nums) {
    if (i === 3) {
      list.push('AmEx');
    } else if (i === 4) {
      list.push('Visa');
    } else if (i === 5) {
      list.push('Mastercard');
    } else if (i === 6) {
      list.push('Discover');
    }
  }
  // Erases duplicates
  var uniqueList = [...new Set(list)];
  return uniqueList;
}

// Nested loop to test findInvalidCards
var nested = [[]]
for (let i of batch) {
  nested[0].push(i);
}


// For testing the code
//console.log(idInvalidCardCompanies(nested));
//console.log(nested);
//console.log(findInvalidCards(nested));
//console.log(valid1);
//console.log(validateCred(invalid1));
