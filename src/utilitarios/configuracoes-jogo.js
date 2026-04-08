// Mapeamento entre os nomes internos das configurações e suas chaves no localStorage
const CHAVES_CONFIGURACAO = {
    volume: "volumeJogo",
    somAtivo: "somJogoAtivo",
    contraste: "contrasteJogo"
};

// Valores usados quando nenhuma configuração foi salva ainda (primeira execução)
const CONFIGURACOES_PADRAO = {
    volume: 1,
    somAtivo: true,
    contraste: "normal"
};

/**
 * Lê as configurações salvas no localStorage e retorna um objeto normalizado.
 * Cada valor passa por validação:
 * - volume: número entre 0 e 1 (Clamp); usa padrão se NaN
 * - somAtivo: booleano; usa padrão se null (nunca salvo)
 * - contraste: aceita apenas "alto" ou "normal"
 * @returns {{ volume: number, somAtivo: boolean, contraste: string }}
 */
export function carregarConfiguracoesJogo() {
    const volumeSalvo = Number(localStorage.getItem(CHAVES_CONFIGURACAO.volume));
    const somAtivoSalvo = localStorage.getItem(CHAVES_CONFIGURACAO.somAtivo);
    const contrasteSalvo = localStorage.getItem(CHAVES_CONFIGURACAO.contraste);

    return {
        // Number(null) → 0, mas Number("") → 0 também, então usamos NaN check
        volume: Number.isNaN(volumeSalvo)
            ? CONFIGURACOES_PADRAO.volume
            : Phaser.Math.Clamp(volumeSalvo, 0, 1),
        // localStorage retorna null se a chave não existe, e string "true"/"false" se existir
        somAtivo: somAtivoSalvo === null
            ? CONFIGURACOES_PADRAO.somAtivo
            : somAtivoSalvo === "true",
        // Só aceita "alto"; qualquer outro valor (incluindo null) vira "normal"
        contraste: contrasteSalvo === "alto" ? "alto" : CONFIGURACOES_PADRAO.contraste
    };
}

/**
 * Persiste as configurações fornecidas no localStorage.
 * Todos os valores são convertidos para string, pois localStorage só armazena strings.
 * @param {{ volume: number, somAtivo: boolean, contraste: string }} configuracoes
 */
export function salvarConfiguracoesJogo(configuracoes) {
    localStorage.setItem(CHAVES_CONFIGURACAO.volume, String(configuracoes.volume));
    localStorage.setItem(CHAVES_CONFIGURACAO.somAtivo, String(configuracoes.somAtivo));
    localStorage.setItem(CHAVES_CONFIGURACAO.contraste, configuracoes.contraste);
}

/**
 * Lê as configurações salvas e aplica imediatamente no jogo.
 * Cada parâmetro é opcional — passe apenas o que estiver disponível na cena atual.
 *
 * @param {object} opcoes
 * @param {Phaser.Game|null} opcoes.game - Instância principal do Phaser (para canvas e sound manager global)
 * @param {Phaser.Sound.BaseSoundManager|null} opcoes.sound - Sound manager da cena atual
 * @param {Jogador|null} opcoes.player - Instância do jogador
 * @returns {{ volume: number, somAtivo: boolean, contraste: string }}
 */
export function aplicarConfiguracoesJogo({ game = null, sound = null, player = null } = {}) {
    const configuracoes = carregarConfiguracoesJogo();

    // Aplica volume e mute no gerenciador de som (prioriza o `sound` direto, senão usa o global do game)
    const gerenciadorSom = sound ?? game?.sound ?? null;
    if (gerenciadorSom) {
        gerenciadorSom.volume = configuracoes.volume;
        gerenciadorSom.mute = !configuracoes.somAtivo;
    }

    // Aplica o filtro de contraste via CSS no canvas do Phaser
    const canvas = game?.canvas ?? null;
    if (canvas) {
        canvas.style.filter = configuracoes.contraste === "alto"
            ? "contrast(1.35) saturate(1.15) brightness(1.05)"
            : "none";
    }

    return configuracoes;
}
