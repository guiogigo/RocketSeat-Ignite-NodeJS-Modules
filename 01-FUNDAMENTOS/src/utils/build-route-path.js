
//Regex é uma expressão regular, uma forma da gente encontrar textos que seguem um padrão especifico dentro de um texto maior
export function buildRoutePath(path) {
    const routeParametersRegex = /:([a-zA-Z]+)/g //A partir dos : com letras de A a Z minusculo e maiusculo, podem se repetir (+) e vai buscar todas as vezes que se repetir (g)

    const pathWithParams = path.replaceAll(routeParametersRegex, '(?<$1>[a-z0-9\-_]+)')// O ?<$1> pega o nome do grupo

    const pathRegex = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`)// o ^ significa que é pra veirificar no começo

    return pathRegex;
}