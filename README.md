# aeronautic-front

Para rodar o projeto:

1- Para rodar o banco de dados, utilize Docker na máquina. Com o Docker configurado, encontre o arquivo aeronautic-db.yml na pasta raiz do projeto aeronautic-back, faça o download do mesmo e suba o banco com o comando docker-compose -f aeronauticdb.yml up .

2- Clonar repositório aeronautic-back, disponível no link https://github.com/rafaelbrjf/aeronautic-back . Após abrir o link, clique no botão Code e copie o link HTTPS.

3- Abra um terminal onde queira clonar o projeto e digite git clone https://github.com/rafaelbrjf/aeronautic-back

4- Configure o Java e o Maven na máquina, e utilize o comando mvn spring-boot:run para iniciar o servidor.

5- Para informações sobre os Endpoints, acessar o link http://localhost:8080/swagger-ui/index.html .

6- Para rodar localmente o front-end, clonar repositório aeronautic-front, rodar o comando npm i, e depois npm run dev. Se preferir rodar através do deploy, utilizar link https://aeronautic-front.vercel.app/ .
