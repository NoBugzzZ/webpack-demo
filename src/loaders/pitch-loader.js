const loaderUtils = require('loader-utils')

module.exports = function (input) {
  return input + loaderUtils.getOptions(this).text
}
module.exports.pitch = function (remaining, preceding, input) {
  console.log(`Remaining: ${remaining}, preceding: ${preceding}
Input: ${JSON.stringify(input, null, 2)}
`)
    return 'pitched'
}

// const cache = new Map();

// module.exports = function (content) {
//   // Calls only once for given resourcePath
//   const callbacks = cache.get(this.resourcePath);
//   callbacks.forEach((callback) => callback(null, content));
//   cache.set(this.resourcePath, content);

//   return content;
// };
// module.exports.pitch = function () {
//   if (cache.has(this.resourcePath)) {
//     const item = cache.get(this.resourcePath);

//     if (item instanceof Array) {
//       item.push(this.async()); // Load to cache
//     } else {
//       return item; // Hit cache
//     }
//   } else {
//     cache.set(this.resourcePath, []); // Missed cache
//   }
// };