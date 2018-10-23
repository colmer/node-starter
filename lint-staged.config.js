// const js = ['npx prettier --write', 'npx eslint --fix', 'git add'];
// const json = ['npx prettier --write --parser=json --print-width=1000000', 'git add'];
// const json5 = ['npx prettier --write --parser=json5 --print-width=1000000', 'git add'];

// const js = ['yarn prettier --write', 'yarn eslint --fix', 'git add'];
// const json = ['yarn prettier --write --parser=json --print-width=1000000', 'git add'];
// const json5 = ['yarn prettier --write --parser=json5 --print-width=1000000', 'git add'];

module.exports = {
  linters: {
    // 'src/**/*.js': js,
    // 'src/**/*.json': json,
    // 'src/**/*.json5': json5,
    //
    // '**/*.js': js,
    // './.{json,babelrc,eslintrc,lintstagedrc,prettierrc,stylelintrc}': json,
    // './.{json5}': json5,
  },
  // ignore: ['./dist/**/*.*', '**/node_modules/**/*.*'],
};
