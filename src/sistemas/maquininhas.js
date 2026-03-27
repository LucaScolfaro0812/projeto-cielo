
// Utilitários de persistência (localStorage com JSON e proteção de erro).
import { salvarDados, carregarDados } from "../utilitarios/armazenamento.js";

export class Maquininhas {

    constructor(){
        
    }

    static chaveDeValor = 'maquininhas';
    static maximoMaquininhas = 2;

    static _qntMaquininhas = carregarDados(this.chaveDeValor, 0);

    static get qntMaquininhas() {
        return this._qntMaquininhas;
    }

    static set qntMaquininhas(valor) {
        const v = Phaser.Math.Clamp(valor, 0, this.maximoMaquininhas);

        this._qntMaquininhas = v;
        salvarDados(this.chaveDeValor, v);
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