const { defineFeature, loadFeature } = require("jest-cucumber");
const path = require("path");

const feature = loadFeature(path.resolve(__dirname, "../features/login.feature"));

defineFeature(feature, (test) => {
  test("Login com credenciais válidas", ({ given, when, then }) => {
    given("que eu tenho um usuário válido", () => {
      console.log("GIVEN");
    });

    when("faço uma requisição POST para /login com as credenciais", () => {
      console.log("WHEN");
    });

    then("recebo um token de autenticação", () => {
      console.log("THEN");
    });
  });
});
