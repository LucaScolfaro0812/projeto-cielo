// Utilitários de persistência
import { salvarDados, carregarDados } from "../utilitarios/armazenamento.js";

/**
 * Maquininhas — gerencia o estoque de maquininhas do jogador.
 *
 * A lógica de quantidade é estática (compartilhada entre todas as cenas) e persistida
 * no localStorage via `armazenamento.js`. A UI (alerta vermelho) é por instância —
 * cada cena cria sua própria instância de Maquininhas para registrar a UI local.
 *
 * Fluxo de alerta:
 *   - Ao zerar o estoque naturalmente, `precisaMostrarAlerta` é marcado como true.
 *   - Na próxima cena que instanciar Maquininhas, o alerta é exibido automaticamente.
 *   - Zeramentos causados por morte (`suprimirAlerta = true`) não disparam o alerta.
 */
export class Maquininhas {

    constructor(scene){
        this.scene = scene;
        this.criarAlerta();

        // Registra esta instância como a UI ativa para a cena atual
        Maquininhas.registrarUI(this);

        // Exibe o alerta vermelho se o estoque estava zerado ao entrar na cena
        if (
            Maquininhas.precisaMostrarAlerta &&
            Maquininhas.qntMaquininhas === 0
        ) {
            this.mostrarAlertaSemMaquininhas();
            Maquininhas.precisaMostrarAlerta = false;
        }
    }

    // =============================
    //  UI
    // =============================

    /** Cria o texto de alerta vermelho centralizado na tela, inicialmente invisível. */
    criarAlerta(){
        const scene = this.scene;

        this.mensagemSemMaquininhas = scene.add.text(
            scene.cameras.main.centerX,
            scene.cameras.main.centerY,
            '',
            {
                fontFamily: 'Arial',
                fontSize: '80px',
                color: '#ff0000',
                backgroundColor: '#dedede',
                padding: { x: 20, y: 10 },
                align: 'center',
                stroke: '#000',
                strokeThickness: 4
            }
        )
        .setOrigin(0.5)
        .setDepth(500)
        .setScrollFactor(0)
        .setVisible(false);
    }

    /** Exibe o alerta piscando 5 vezes e depois some. Não faz nada se o texto já foi destruído. */
    mostrarAlertaSemMaquininhas() {
        const texto = this.mensagemSemMaquininhas;

        if (!texto || !texto.active) return;

        texto.setText("Você não possui mais maquininhas!");
        texto.setAlpha(1);
        texto.setVisible(true);

        this.scene.tweens.add({
            targets: texto,
            alpha: 0,
            duration: 300,
            yoyo: true,
            repeat: 5,
            onComplete: () => {
                if (texto && texto.active) {
                    this.scene.tweens.add({
                        targets: texto,
                        alpha: 0,
                        duration: 500,
                        onComplete: () => texto.setVisible(false)
                    });
                }
            }
        });
    }

    // =============================
    //  Conexão UI ↔ lógica
    // =============================

    static ui = null;
    static precisaMostrarAlerta = false;

    // Quando true, o setter não dispara o alerta vermelho.
    // Usado pela morte do jogador para suprimir o alerta e mostrar o texto próprio.
    static suprimirAlerta = false;

    static registrarUI(uiInstance) {
        this.ui = uiInstance;
    }

    // =============================
    //  Lógica de dados
    // =============================

    static chaveDeValor = 'maquininhas';
    static maximoMaquininhas = 3;

    static _qntMaquininhas = carregarDados(this.chaveDeValor, 0);

    static get qntMaquininhas() {
        return this._qntMaquininhas;
    }

    static set qntMaquininhas(valor) {
        const valorAnterior = this._qntMaquininhas;
        const v = Phaser.Math.Clamp(valor, 0, this.maximoMaquininhas);

        this._qntMaquininhas = v;
        salvarDados(this.chaveDeValor, v);

        // Só dispara o alerta vermelho se zerou naturalmente (não por morte)
        if (v === 0 && valorAnterior > 0 && !this.suprimirAlerta) {
            this.precisaMostrarAlerta = true;

            if (this.ui) {
                this.ui.mostrarAlertaSemMaquininhas();
            }
        }
    }

    /** Adiciona `qnt` maquininhas ao estoque (máximo 3, via setter). */
    static adicionarMaquininhas(qnt) {
        this.qntMaquininhas = this.qntMaquininhas + qnt;
    }

    /** Remove `qnt` maquininhas do estoque (mínimo 0, via setter). */
    static removerMaquininhas(qnt) {
        this.qntMaquininhas = this.qntMaquininhas - qnt;
    }

    /** Define o estoque diretamente para `qnt` (clampado entre 0 e 3 pelo setter). */
    static definirMaquininhas(qnt) {
        this.qntMaquininhas = qnt;
    }

    /**
     * Sincroniza `_qntMaquininhas` com o valor salvo no localStorage.
     * Útil ao iniciar uma nova cena para garantir que o valor em memória está correto.
     */
    static recarregar() {
        this._qntMaquininhas = carregarDados(this.chaveDeValor, 0);
    }
}