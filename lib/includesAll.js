const includesAll = (arr, compareArr) => {
  if (!Array.isArray(arr) || !Array.isArray(compareArr))
    throw new Error('Only arrays are supported');

  if (arr.length <= 0 || compareArr.length <= 0)
    throw new Error('Empty arrays are not supported');

  let results = [];
  for (let item of compareArr) {
    if (!arr.includes(item)) {
      results.push(false);
    }
    results.push(true);
  }
  const finalResults = [...new Set(results)];
  return finalResults.includes(false) ? false : true;
};

console.log(
  includesAll(['isaac', 'annet', 'tom', 'jack'], ['isaac', 'annet', 'jack'])
);
