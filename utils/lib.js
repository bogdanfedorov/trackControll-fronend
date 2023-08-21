export function getObjectDifference(obj1, obj2) {
  const diff = {};

  for (const key in obj1) {
    if (obj1[key] !== obj2[key]) {
      diff[key] = obj2[key];
    }
  }

  return diff;
}
