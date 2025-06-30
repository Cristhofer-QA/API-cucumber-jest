Feature: Login API

  Scenario: Login com credenciais válidas
    Given que eu tenho um usuário válido
    When faço uma requisição POST para /login com as credenciais
    Then recebo um token de autenticação
