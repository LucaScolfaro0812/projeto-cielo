// Classe para representar o progresso de qualquer entidade do jogo (NPCs, lojas, etc)
class ProgressoEntidade {
    constructor(id, nome, estado = 'nao-interagido') {
        this.id = id;
        this.nome = nome;
        this.estado = estado
    }

    atualizarEstado(novoEstado) {
        this.estado = novoEstado;
    }

    obterEstado() {
        return this.estado;
    }
}

// Classe que herda de ProgressoEntidade e pode ser expandida com métodos próprios de NPCs.
class ProgressoNpc extends ProgressoEntidade {
    constructor(id, nome, estado = 'nao-interagido') {
        super(id, nome, estado);
    }
}

  // Métodos específicos de NPCs podem ser adicionados aqui futuramente
export { ProgressoEntidade, ProgressoNpc };