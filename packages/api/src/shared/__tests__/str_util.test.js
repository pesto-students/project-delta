import {
  trimTrailingUnderscores,
  snakeToCamelCase,
  capitalizeLetterAtIndexN,
} from '../str_util';

describe('trimTrailingUnderscore', () => {
  it('should not change a string that has no trailing underscores', () => {
    expect(trimTrailingUnderscores('')).toBe('');
    expect(trimTrailingUnderscores('a')).toBe('a');
    expect(trimTrailingUnderscores('abcdef')).toBe('abcdef');
    expect(trimTrailingUnderscores('_ab_cde_f')).toBe('_ab_cde_f');
  });

  it('should remove trailing underscores if present', () => {
    expect(trimTrailingUnderscores('_')).toBe('');
    expect(trimTrailingUnderscores('a_')).toBe('a');
    expect(trimTrailingUnderscores('a____')).toBe('a');
    expect(trimTrailingUnderscores('abcdef__')).toBe('abcdef');
  });
});

describe('snakeToCamelCase', () => {
  it('should not modify strings that are not snake-cased', () => {
    expect(snakeToCamelCase('')).toBe('');
    expect(snakeToCamelCase('_')).toBe('_');
    expect(snakeToCamelCase('Aa')).toBe('Aa');
  });

  it('should replace _ followed by a lowercase letter by the uppercased version of that letter', () => {
    expect(snakeToCamelCase('_a')).toBe('A');
    expect(snakeToCamelCase('_a_a')).toBe('AA');
    expect(snakeToCamelCase('kebab_is_nice')).toBe('kebabIsNice');
  });
});

describe('capitalizeLetterAtIndexN', () => {
  it('should not modify str if n is not in [0, str.length)', () => {
    expect(capitalizeLetterAtIndexN('', 0)).toBe('');
    expect(capitalizeLetterAtIndexN('abc', -1)).toBe('abc');
    expect(capitalizeLetterAtIndexN('abc', 3)).toBe('abc');
  });

  it('should not modify str if letter at index n is not a lowercase alphabet', () => {
    expect(capitalizeLetterAtIndexN('abC', 2)).toBe('abC');
    expect(capitalizeLetterAtIndexN('ab2', 2)).toBe('ab2');
    expect(capitalizeLetterAtIndexN('ab ', 2)).toBe('ab ');
  });

  it('should replace the char at index n with it\'s uppercased version if it is a lowercase alphabet', () => {
    expect(capitalizeLetterAtIndexN('a', 0)).toBe('A');
    expect(capitalizeLetterAtIndexN('abc', 2)).toBe('abC');
    expect(capitalizeLetterAtIndexN('abcdefghi', 3)).toBe('abcDefghi');
  });
});
