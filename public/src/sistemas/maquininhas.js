// Utilitários de persistência
import { salvarDados, carregarDados } from "../utilitarios/armazenamento.js";

/**
 * Maquininhas - lógica + UI
 */
export class Maquininhas {

    constructor(scene){
        this.scene = scene;
        this.criarAlerta();

        // registra UI atual
        Maquininhas.registrarUI(this);

        // 🔥 mostra alerta apenas se veio de transição válida
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

    mostrarAlertaSemMaquininhas() {
        
        const texto = this.mensagemSemMaquininhas;

        if (!texto || !texto.active) return;

        texto.setText("Você não possui mais maquininhas!");
        texto.setAlpha(1);
        texto.setVisible(true);
    }

    // =============================
    //  Conexão UI ↔ lógica
    // =============================

    static ui = null;
    static precisaMostrarAlerta = false;

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

        // 🔥 só dispara se acabou de zerar
        if (v === 0 && valorAnterior > 0) {
            this.precisaMostrarAlerta = true;

            // tenta mostrar imediatamente (se ainda estiver na mesma cena)
            if (this.ui) {
                this.ui.mostrarAlertaSemMaquininhas();
            }
        }
    }

    static adicionarMaquininhas(qnt) {
        this.qntMaquininhas = this.qntMaquininhas + qnt;
    }

    static removerMaquininhas(qnt) {
        this.qntMaquininhas = this.qntMaquininhas - qnt;
    }

    static definirMaquininhas(qnt) {
        this.qntMaquininhas = qnt;
    }

    static recarregar() {
        this._qntMaquininhas = carregarDados(this.chaveDeValor, 0);
    }
}