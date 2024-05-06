import http from 'node:http'; //Usa o ESModules

import { json } from './middlewares/json.js';
import { routes } from './routes.js';
import { extrackQueryParams } from './utils/extract-query-params.js';


//CommonJS => require | Padrão de importaçao antigo (const http = require('http');)
//ESModules => import/export | Usado por padrão hoje em dia mas o NodeJS não suporta (Para usar < "type": "module", > n o package.json)

//Usar o node: para os modulos internos do node

//const users = []; //Listagem de usuários em memória local



const server = http.createServer(async(request, response) => {
    const { method, url } = request;

    await json(request, response);

    const route = routes.find(route => {
        return route.method === method && route.path.test(url)
    })

    if(route) {
        const routeParams = request.url.match(route.path)

        const { query, ...params } = routeParams.groups

        request.params = params
        request.query = query ?extrackQueryParams(query) : {}

        return route.handler(request, response);
    }

    return response.writeHead(404).end();
});

server.listen(3333); //localhost:3333