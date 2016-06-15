const mirrorKeys = obj => {
  const mirroredObject = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      mirroredObject[key] = key;
    }
  }

  return mirroredObject;
};

export default mirrorKeys;