# aeronautic-front

**Para rodar o projeto:**

1- Para rodar o banco de dados, utilize Docker na máquina. Com o Docker configurado, encontre o arquivo aeronautic-db.yml na pasta raiz do projeto aeronautic-back, faça o download do mesmo e suba o banco com o comando docker-compose -f aeronauticdb.yml up

2- Clonar repositório aeronautic-back, disponível no link https://github.com/rafaelbrjf/aeronautic-back . Após abrir o link, clique no botão Code e copie o link HTTPS

3- Abra um terminal onde queira clonar o projeto e digite git clone https://github.com/rafaelbrjf/aeronautic-back

4- Foram utilizados Java 17 e Maven 3.8.7 no projeto, instale-os na máquina e utilize o comando mvn spring-boot:run estando em um terminal na pasta do projeto para iniciar o servidor

5- Para informações sobre os Endpoints, acessar o link http://localhost:8080/swagger-ui/index.html 

6- Para rodar localmente o front-end, clonar repositório aeronautic-front, rodar o comando npm i, e depois npm run dev. Se preferir rodar através do deploy, utilizar link https://aeronautic-front.vercel.app/ 

__________________________________________________________________________________________________________________________________

**Sobre a aplicação:**

  Aplicação para fazer a gestão de Aeronaves. O sistema permite registrar aeronaves passando as informações Modelo, Marca, Ano, Descrição e se já está vendida ou não. O sistema só permite a criação de uma aeronave caso o nome da Marca esteja escrito corretamente. A aplicação possui uma tabela para mostrar os dados de todas as aeronaves cadastradas no sistema, além de um campo de busca que funciona tanto por nome do modelo quanto por ID. Na tabela, também é possível fazer a exclusão de uma aeronave. Ao redor da tabela, encontram-se contadores que informam a quantidade de aeronaves da década de 90, a quantidade de aeronaves da década de 00, além da quantidade de aeronaves cadastradas de cada marca. 
