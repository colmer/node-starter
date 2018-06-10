/**
 * Резолвер путей для Intellij IDEA.
 * Вручную дублируем сюда настройки алиасов из конфига `module-resolver` в .babelrc
 */

const path = require('path');

module.exports = {
  context: path.resolve('./src'),
  resolve: {
    extensions: ['.js', '.es', '.es6', '.mjs'],
    alias: {
      '@': path.resolve('./src'),
      test: path.resolve('./test'),
    },
  },
};
