/**
 * Chaves de armazenamento usadas pelo jogo. Centraliza todas as chaves usadas no localStorage, evitando erros de digitação e facilitando a manutenção.
 */
export const chavesArmazenamento = {
    // identificadores para salvar e carregar os dados.
    npcsConquistadosQuantidade: "npcsConquistadosQuantidade",
    npcsQuizAbertos: "npcsQuizAbertos",
    npcsConquistadosIds: "npcsConquistadosIds",
    npcsInteragidosIds: "npcsInteragidosIds",
    perguntasJaFeitas: "perguntasJaFeitas"
};
/**
 * Estado padrão do progresso.
 *
 * Serve como fallback seguro quando não existe dado salvo ainda.
 */
export const estadoPadraoProgresso = {
    npcsConquistadosQuantidade: 0
};

/**
 * Cria um estado inicial novo para progresso.
 *
 * Retornar um novo objeto evita acoplamento acidental com referências
 * compartilhadas em memória.
 */
export function criarEstadoProgressoInicial() {
    return { npcsConquistadosQuantidade: 0 };
}

// Define os valores padrão do sistema de transição.
// Se nada especial foi definido, a cidade usa spawn padrao.
export const estadoTransicaoCenaPadrao = {
    nomeCenaDestino: "gameScene",
    idSpawnCidade: "padrao"
}

// Cria o estado atual em memória.
// Esse valor muda durante o jogo conforme entra e sai de loja.
let estadoTransicaoCena = { ...estadoTransicaoCenaPadrao };

// Função chamada antes de trocar para uma loja ou ao sair dela.
// Ela registra que o retorno esperado é na gameScene e em qual spawn.
export function definirProximoSpawnCidade(idSpawnCidade) {
    estadoTransicaoCena.nomeCenaDestino = "gameScene";
    estadoTransicaoCena.idSpawnCidade = idSpawnCidade;
}

// Se por algum motivo o destino não for gameScene, devolve padrao.
// Depois de ler, reseta o estado para padrão para evitar reaproveitar spawn antigo.
export function consumirSpawnCidade() {
    if (estadoTransicaoCena.nomeCenaDestino !== "gameScene") {
        return estadoTransicaoCenaPadrao.idSpawnCidade;
    }

    const idSpawnRetorno = estadoTransicaoCena.idSpawnCidade;
    estadoTransicaoCena = { ...estadoTransicaoCenaPadrao };
    return idSpawnRetorno;
}

// Função utilitária para reset manual, útil em menu novo jogo, debug ou reinício.
export function limparEstadoTransicaoCena() {
    estadoTransicaoCena = { ...estadoTransicaoCenaPadrao };
}

let _deveExibirTutorial = false;
let _deveExibirDialogoCentral = false;

// Chamado pelo menu ao iniciar novo jogo para sinalizar que o tutorial deve aparecer uma vez.
export function ativarTutorialInicial() {
    _deveExibirTutorial = true;
}

export function ativarDialogoInicialCentral() {
    _deveExibirDialogoCentral = true;
}

// Lê e zera o flag em uma única chamada — evita que o tutorial apareça mais de uma vez.
export function consumirTutorialInicial() {
    const valor = _deveExibirTutorial;
    _deveExibirTutorial = false;
    return valor;
}

export function consumirDialogoInicialCentral() {
    const valor = _deveExibirDialogoCentral;
    _deveExibirDialogoCentral = false;
    return valor;
}
