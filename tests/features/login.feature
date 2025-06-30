Feature: Login API

  Scenario: Login com credenciais válidas
    Given que eu tenho um usuário válido
    When faço uma requisição de login com as credenciais corretas
    Then recebo um token de autenticação

  Scenario: Login sem senha
    Given que eu tenho apenas o e-mail de um usuário
    When faço uma requisição de login apenas com e-mail
    Then deve retornar o status 400
    And não deve retornar o token de acesso
    And deve retornar uma mensagem de erro
