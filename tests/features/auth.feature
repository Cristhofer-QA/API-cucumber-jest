Feature: Autenticação API

  Scenario: Rquisição de login sem API Key
    Given que eu tenho um usuário válido
    When faço uma requisição de login com as credenciais corretas msa sem informar a API Key
    Then deve retornar o status 401
    And não deve retornar o token de acesso
    And deve retonar uma mensagem de erro
