const id = x => x;

function mapObj(obj, keyTransformFn = id, valTransformFn = id) {
  if (obj === null || typeof obj !== 'object' || Array.isArray(obj)) {
    return obj;
  }

  return Reflect.ownKeys(obj).reduce((acc, key) => {
    acc[keyTransformFn(key)] = valTransformFn(obj[key]);
    return acc;
  }, {});
}

module.exports = {
  mapObj,
};
