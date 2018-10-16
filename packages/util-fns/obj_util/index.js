function mapObj(obj, keyTransformFn = x => x, valTransformFn = x => x) {
  return Reflect.ownKeys(obj).reduce((acc, key) => {
    acc[keyTransformFn(key)] = valTransformFn(obj[key]);
    return acc;
  }, {});
}

module.exports = {
  mapObj,
};
