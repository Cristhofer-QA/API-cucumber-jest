const { defineFeature, loadFeature } = require("jest-cucumber");
const path = require("path");
const feature = loadFeature(path.resolve(__dirname, "../features/login.feature"));
const { createClient } = require('../../support/client');
const endpoints = require('../../variables/endpoints');
const correct_login = require('../../variables/tests/login/correct-login-variables');
const login_incorrect_password = require('../../variables/tests/login/login-without-password-variables');


defineFeature(feature, (test) => {
    const login_message_without_password = 'Missing password';

    const { method: method_login, path: path_login, send: send_login } = endpoints.login;

    const client = createClient(true);

    test("Login com credenciais válidas", ({ given, when, then }) => {

        let send, response;

        given("que eu tenho um usuário válido", () => {
            const email = correct_login.email;
            const password = correct_login.password;
            send = send_login(email, password);

        });

        when("faço uma requisição de login com as credenciais corretas", async () => {
            response = await client[method_login](path_login).send(send);
        });

        then("recebo um token de autenticação", () => {
            expect(response.status).toBe(200);
            expect(response.body.token).toBeDefined();
            expect(response.body.token).not.toBeNull();
            expect(response.body).toHaveProperty('token');
        });
    });

    test("Login sem senha", ({ given, when, then }) => {

        let send, response;

        given("que eu tenha apenas o e-mail de um usuário", () => {
            const email = login_incorrect_password.email;
            const password = login_incorrect_password.password;
            send = send_login(email, password);
        });

        when("faço uma requisição de login apenas com e-mail", async () => {
            response = await client[method_login](path_login).send(send);
        });

        then("deve retornar o status 400", () => {
            expect(response.status).toBe(400);
        });

        then("não deve retornar o token de acesso", () => {
            expect(response.body.token).not.toBeDefined();
            expect(response.body).not.toHaveProperty('token');
        });

        then("deve retornar uma mensagem de erro", () => {
            expect(response.body).toHaveProperty('error');
            expect(response.body.error).toEqual(login_message_without_password);
        });

    });
});
