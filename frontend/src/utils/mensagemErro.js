// Converte qualquer erro (inclusive erros do Axios) em uma string segura para exibir no toast.
// Passar o objeto de erro direto para toast.error faz o React quebrar (Minified React error #31)
// e deixa a tela branca, porque o Toaster renderiza a mensagem como filho React.
export function mensagemErro(error) {
    const dados = error?.response?.data;
    if (typeof dados?.msg === 'string' && dados.msg) return dados.msg;
    if (typeof dados === 'string' && dados) return dados;
    if (typeof error === 'string' && error) return error;
    if (typeof error?.message === 'string' && error.message) return error.message;
    return 'Ocorreu um erro inesperado. Tente novamente.';
}
