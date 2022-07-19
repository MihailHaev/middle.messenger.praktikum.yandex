export const trim = (stringToTrim: string, symbolsToTrim?: string): string => {
  const arrayOfSymbolsToTrim = symbolsToTrim ? symbolsToTrim.split('') : [' ', '\xA0'];
  let isLeftTrimmed = false;
  let isRightTrimmed = false;

  const leftTrimmedString = stringToTrim
    .split('')
    .reduce((accum: Array<string>, symbol: string): Array<string> => {
      if (arrayOfSymbolsToTrim.includes(symbol) && !isLeftTrimmed) {
        return accum;
      }
      isLeftTrimmed = true;
      return [...accum, symbol];
    }, []);
  const trimmedString = leftTrimmedString.reduceRight((accum: string, symbol: string): string => {
    if (arrayOfSymbolsToTrim.includes(symbol) && !isRightTrimmed) {
      return accum;
    }
    isRightTrimmed = true;
    return `${symbol}${accum}`;
  }, '');
  return trimmedString;
};

// trim('  abc  '); // => 'abc'
// trim('-_-abc-_-', '_-'); // => 'abc'
// trim('\xA0foo'); // "foo"
// trim('\xA0foo', ' '); // " foo"
// trim('-_-ab c -_-', '_-'); // ab c

// ['  foo  ', '  bar  '].map((value) => trim(value)); // => ['foo', 'bar']
