const { mapObj } = require('.');

describe('mapObj', () => {
  it('simply passes through args that are not objects', () => {
    /* eslint-disable no-unused-vars */
    expect(mapObj(null, _ => 'a')).toBe(null);
    expect(mapObj(undefined, _ => 'a')).toBe(undefined);
    expect(mapObj(true, _ => 'a')).toBe(true);
    expect(mapObj(123, _ => 'a')).toBe(123);
    expect(mapObj('abc', _ => 'a')).toBe('abc');
    expect(mapObj([], _ => 'a')).toEqual([]);
    /* eslint-enable no-unused-vars */
  });

  it('should never change an empty object', () => {
    expect(mapObj({})).toEqual({});
    expect(mapObj({}, _ => 'a')).toEqual({}); // eslint-disable-line no-unused-vars
    expect(mapObj({}, _ => 'a', _ => 'b')).toEqual({}); // eslint-disable-line no-unused-vars
  });

  it('should not change an object when no transform functions have been specified', () => {
    const obj = { a: 1, b: 2 };
    expect(mapObj(obj)).toEqual(obj);
  });

  it('should transform keys as specified', () => {
    const obj = { a: 1, b: 2 };
    expect(mapObj(obj, x => x.toUpperCase())).toEqual({ A: 1, B: 2 });
  });

  it('should transform values as specified', () => {
    const obj = { a: 1, b: 2 };
    expect(mapObj(obj, x => x, x => x + 1)).toEqual({ a: 2, b: 3 });
  });
});
