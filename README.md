## Pré-requisitos

1. [Node.js](https://nodejs.org/en/)

## Instalação

```bash
$ npm install
```

Criar um novo arquivo .env na raiz do projeto, existe um arquivo de exemplo `.env.example` neste respositório. Para produção a variável NODE_ENV deve ser definida como `production`.

## Iniciar o servidor
```bash
$ npm run start
```

## Produção

Para uso em produção é indicado o uso de uma ferramenta de gerência de processos.

Exemplo com [PM2](http://pm2.keymetrics.io/docs/usage/quick-start/):
```bash
$ pm2 start npm -- start
```

## Exemplos

Exitste um cliente de exemplo dentro da pasta `/examples`