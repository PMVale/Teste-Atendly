Teste de Proficiência

Objetivos:

-Monorepo contendo ambas as partes de Frontend e Backend;

-Front desenvolvido com Vue 3, Vue Store, Vue Router e Typescript;

-Backend desenvolvido com Node.js, Express, MySQL, Sequelize e Typescript;

-Utilizar jsonwebtoken para validação de login e controle de permissões do usuário;

-Utilizar bcrypt para fazer o tratamento de senhas salvas no backend e validação de login;

Frontend:

-Três páginas: Cadastro, Login e Perfil;

-Perfil precisa que o usuário esteja logado e tenha um token válido, caso não tenha é redirecionado para Login;

-Roteamento com Vue Router e Vue Store para gerenciar o estado de autenticação;

Backend:

-Desenvolver três endpoints: cadastro/post, login/post e perfil/get;

-Modelo da tabela User: id, name, email e password;

Comandos:

-Frontend: npm run serve para rodar, porta utilizada 8080;

-Backend: npm run dev para rodar o nodemon, porta utilizada 3001;

-Docker: docker-compose up para subir o banco de dados utilizado, porta utilizada 3306;
