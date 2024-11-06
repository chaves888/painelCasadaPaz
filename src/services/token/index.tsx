import { jwtDecode } from "jwt-decode"

export const verificaTokenExpirado = (
    token?: string
) => {
    if (token) {
        let decodedToken = jwtDecode(token)

        if (!decodedToken.exp || 
            decodedToken.exp < new Date().getTime() / 1000
        ) {
            //token expirado
            return true
        }
        //token ta ok
        return false
    }
}

export const validaPermissao = (
    permissao: Array<string>,
    permissaoToken?: string
) => {
    if(typeof permissaoToken === 'string') {
        const temAlgumaPermissao = permissao.includes(permissaoToken)

        return temAlgumaPermissao
    }
    return false
}