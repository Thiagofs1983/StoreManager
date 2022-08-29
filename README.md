# Project Store Manager

# Contexto
 API de um sistema de gerenciamento de vendas no formato dropshipping em que é possível criar, visualizar, deletar e atualizar produtos e vendas. O banco de dados MySQL está sendo utilizado para a gestão de dados. Além disso, a API é ser RESTful.

## Técnologias usadas

Back-end:
> Desenvolvido usando: NodeJS, ExpressJS, ES6, MYSQL, Mocha, Chai


## Instalando Dependências

> Backend
```bash
git clone git@github.com:Thiagofs1983/StoreManager.git
cd sd-020-a-store-manager/ 
npm install
``` 

## Executando aplicação

Para rodar a aplicação você vai precisar ter o [Docker](https://docs.docker.com/engine/install/ubuntu/) instalado usando os comandos no terminal:
```bash
docker-compose up -d
docker exec -it store_manager bash
npm install
```

* Para rodar o back-end:

```
npm start
```

* Realizando Requisições:

Para realizar as requisições, você pode usar a extensão [Thunder Client](https://www.thunderclient.com/) do VSCode ou pode usar os clientes HTTP [Postman](https://www.postman.com/) ou [Insomnia](https://insomnia.rest/).
