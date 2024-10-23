import { stringInject } from './index';

describe('stringInject', () => {
  it('should replace placeholders with corresponding values', () => {
    const str = 'Hello, << name >>! Welcome to << place >>.';
    const data = { name: 'Alice', place: 'Wonderland' };
    const result = stringInject(str, data);
    expect(result).toBe('Hello, Alice! Welcome to Wonderland.');
  });

  it('should return the original string if no placeholders are present', () => {
    const str = 'Hello, Alice!';
    const data = { name: 'Alice' };
    const result = stringInject(str, data);
    expect(result).toBe('Hello, Alice!');
  });

  it('should leave placeholders unchanged if no matching data is provided', () => {
    const str = 'Hello, << name >>! Welcome to << place >>.';
    const data = {};
    const result = stringInject(str, data);
    expect(result).toBe('Hello, ! Welcome to .');
  });

  it('should handle multiple placeholders', () => {
    const str = 'Today is << day >>, and the weather is << weather >>.';
    const data = { day: 'Monday', weather: 'sunny' };
    const result = stringInject(str, data);
    expect(result).toBe('Today is Monday, and the weather is sunny.');
  });

  it('should handle placeholders with extra whitespace', () => {
    const str = 'Hello, <<   name   >>! Your score is << score >>.';
    const data = { name: 'Bob', score: '95' };
    const result = stringInject(str, data);
    expect(result).toBe('Hello, Bob! Your score is 95.');
  });

  it('should return an empty string if input is empty', () => {
    const str = '';
    const data = { name: 'Alice' };
    const result = stringInject(str, data);
    expect(result).toBe('');
  });

  it('should return an empty string if no data is provided', () => {
    const str = 'Hello, << name >>!';
    const result = stringInject(str, {});
    expect(result).toBe('Hello, !');
  });

  it('should not throw an error if a placeholder does not exist in data', () => {
    const str = 'Hello, << name >>!';
    const data = {};
    expect(() => stringInject(str, data)).not.toThrow();
  });
});
