module.exports = {
  extends: [
    'plugin:vue/recommended'
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: "babel-eslint",
    sourceType: "module",
    allowImportExportEverywhere: false
  },
  rules: {
    "vue/no-parsing-error": [2, { "x-invalid-end-tag": false }]
  }
}

