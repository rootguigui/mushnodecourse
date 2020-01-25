
module.exports.fizzBuzz = function(input) { 
  if (typeof input === 'number') {
    if ((input % 3 === 0) && (input % 5) === 0) {
      return 'FizzBuzz';
    }
    else if(input % 3 === 0) {
      return 'Fizz'
    } 
    else if (input % 5 === 0) {
      return 'Buzz'
    } 
    else {
      return input;
    }
  } 
  else {
    throw new Error('Input should be a number.')
  }
}
