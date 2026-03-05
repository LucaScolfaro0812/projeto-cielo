const fs = require("fs");

const lojasNomes = [
    'padaria',
    'games',
    'cupcake',
    'beleza',
    'roupas',
    'pet',
    'movel',
    'frutaria',
    'lanchonete',
    'chocolate',
    'pelucia',
    'autoEscola',
    'joalheria'
];

lojasNomes.forEach(nome => {

    const nomeClasse = nome.charAt(0).toUpperCase() + nome.slice(1);

    const conteudo = `
export default class ${nomeClasse}Scene extends Phaser.Scene {

    constructor(){
        super('${nome}Scene');
    }

    preload(){

    }

    create(){
        console.log("${nome}Scene carregada");
    }

}
`;

    fs.writeFileSync(`${nome}Scene.js`, conteudo);

});

console.log("Arquivos criados!");