module.exports = {
  testMatch: ["**/tests/steps/**/*.steps.js"],
  reporters: [
    "default",
    ["jest-html-reporter", {
      "pageTitle": "Relatório de Testes",
      "outputPath": "./reports/test-report.html",
      "includeFailureMsg": true,
      "includeConsoleLog": true
    }]
  ]

}