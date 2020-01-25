const exercise = require('../exercise1');

describe('fizzBuzz', () => {
  it('should return error', () => {
    const args = ['', false, undefined, {}, []];
    args.forEach(a => {
      expect(() => {
        exercise.fizzBuzz(a);
      }).toThrow();
    });
  });
  it('should return FizzBuzz when the input is divisible by 3 and 5', () => {
    const result = exercise.fizzBuzz(15);
    expect(result).toMatch(/FizzBuzz/);
    expect(result).toContain('FizzBuzz');
  });

  it('should return Fizz  when the input is divisible by 3', () => {
    const result = exercise.fizzBuzz(9);
    expect(result).toMatch(/Fizz/);
    expect(result).toContain('Fizz');
  });

  it('should return Buzz  when the input is divisible by 5', () => {
    const result = exercise.fizzBuzz(10);
    expect(result).toMatch(/Buzz/);
    expect(result).toContain('Buzz');
  });

  it('should return the number that we passed to function is not divible by 3 or 5', () => {
    let numberToPass = 2
    const result = exercise.fizzBuzz(numberToPass);
    expect(result).toBe(numberToPass);
  });
});