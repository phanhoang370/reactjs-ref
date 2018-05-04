export function findIndex(data, id, type) {
  var result = -1;
  data.forEach((value, index) => {
    if (value[type + '_id'] === id) {
      result = index;
    }
  });
  return result;
}
