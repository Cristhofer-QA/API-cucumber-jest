const { defineFeature, loadFeature } = require("jest-cucumber");
const path = require("path");
const feature = loadFeature(path.resolve(__dirname, "../features/auth.feature"));
const { createClient } = require('../../support/client');
const endpoints = require('../../variables/endpoints');


defineFeature(feature, (test) => {
    const { method: method_login, path: path_login, send: send_login } = endpoints.login;
    const message_call_without_api_key = 'Missing API key.';

    test("Rquisição de login sem API Key", ({ given, when, then }) => {

        let send, response;

        given("que eu tenho um usuário válido", () => {
            const email = process.env.EMAIL_STANDARD_USER;
            const password = process.env.PASSWORD_STANDARD_USER;
            send = send_login(email, password);
        });

        when("faço uma requisição de login com as credenciais corretas msa sem informar a API Key", async () => {
            const client = createClient(false);
            response = await client[method_login](path_login).send(send);
        });



        then("deve retornar o status 401", () => {
            expect(response.status).toBe(401);
        });
        then("não deve retornar o token de acesso", () => {
            expect(response.body.token).not.toBeDefined();;
            expect(response.body).not.toHaveProperty('token')
        });

        then("deve retonar uma mensagem de erro", () => {
            expect(response.body).toHaveProperty('error');
            expect(response.body.error).toEqual(message_call_without_api_key);
        });
    });
});