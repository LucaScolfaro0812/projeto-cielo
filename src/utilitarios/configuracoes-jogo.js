const CHAVES_CONFIGURACAO = {
    volume: "volumeJogo",
    somAtivo: "somJogoAtivo",
    contraste: "contrasteJogo",
    velocidadeMarcielo: "velocidadeMarcielo"
};

const CONFIGURACOES_PADRAO = {
    volume: 1,
    somAtivo: true,
    contraste: "normal",
    velocidadeMarcielo: 1
};

export function carregarConfiguracoesJogo() {
    const volumeSalvo = Number(localStorage.getItem(CHAVES_CONFIGURACAO.volume));
    const somAtivoSalvo = localStorage.getItem(CHAVES_CONFIGURACAO.somAtivo);
    const contrasteSalvo = localStorage.getItem(CHAVES_CONFIGURACAO.contraste);
    const velocidadeSalva = Number(localStorage.getItem(CHAVES_CONFIGURACAO.velocidadeMarcielo));

    return {
        volume: Number.isNaN(volumeSalvo)
            ? CONFIGURACOES_PADRAO.volume
            : Phaser.Math.Clamp(volumeSalvo, 0, 1),
        somAtivo: somAtivoSalvo === null
            ? CONFIGURACOES_PADRAO.somAtivo
            : somAtivoSalvo === "true",
        contraste: contrasteSalvo === "alto" ? "alto" : CONFIGURACOES_PADRAO.contraste,
        velocidadeMarcielo: Number.isNaN(velocidadeSalva)
            ? CONFIGURACOES_PADRAO.velocidadeMarcielo
            : Phaser.Math.Clamp(velocidadeSalva, 0.6, 1.4)
    };
}

export function salvarConfiguracoesJogo(configuracoes) {
    localStorage.setItem(CHAVES_CONFIGURACAO.volume, String(configuracoes.volume));
    localStorage.setItem(CHAVES_CONFIGURACAO.somAtivo, String(configuracoes.somAtivo));
    localStorage.setItem(CHAVES_CONFIGURACAO.contraste, configuracoes.contraste);
    localStorage.setItem(CHAVES_CONFIGURACAO.velocidadeMarcielo, String(configuracoes.velocidadeMarcielo));
}

export function aplicarConfiguracoesJogo({ game = null, sound = null, player = null } = {}) {
    const configuracoes = carregarConfiguracoesJogo();

    const gerenciadorSom = sound ?? game?.sound ?? null;
    if (gerenciadorSom) {
        gerenciadorSom.volume = configuracoes.volume;
        gerenciadorSom.mute = !configuracoes.somAtivo;
    }

    const canvas = game?.canvas ?? null;
    if (canvas) {
        canvas.style.filter = configuracoes.contraste === "alto"
            ? "contrast(1.35) saturate(1.15) brightness(1.05)"
            : "none";
    }

    if (player) {
        player.velocidade = 1000 * configuracoes.velocidadeMarcielo;
    }

    return configuracoes;
}
