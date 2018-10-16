function trimTrailingUnderscores(str) {
  return str.replace(/_+$/, '');
}

function snakeToCamelCase(str) {
  const strArr = str.split('');
  for (let i = strArr.length - 2; i >= 0; i -= 1) {
    if (strArr[i] === '_' && /[a-z]/.test(strArr[i + 1])) {
      strArr.splice(i, 2, strArr[i + 1].toUpperCase());
    }
  }
  return strArr.join('');
}

function capitalizeLetterAtIndexN(str, n) {
  if (n < 0 || n >= str.length) return str;
  if (!/[a-z]/.test(str[n])) return str;

  const strArr = str.split('');
  strArr.splice(n, 1, strArr[n].toUpperCase());
  return strArr.join('');
}

function capitalizeFirstLetter(str) {
  return capitalizeLetterAtIndexN(str, 0);
}

module.exports = {
  capitalizeFirstLetter,
  capitalizeLetterAtIndexN,
  snakeToCamelCase,
  trimTrailingUnderscores,
};
