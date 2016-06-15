if (typeof __DEV__ !== 'undefined') {
  module.exports = require('./configureStore.dev');
} else {
  module.exports = require('./configureStore.prod');
}
