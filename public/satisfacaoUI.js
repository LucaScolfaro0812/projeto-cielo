function mostrar() {
    var container = document.getElementById("satisfacao");
    if (container) container.classList.remove("hidden");
}

function esconder() {
    var container = document.getElementById("satisfacao");
    if (container) container.classList.add("hidden");
}

function atualizar(valor) {
    if (valor < 0) valor = 0;
    if (valor > 100) valor = 100;

    var barraFill = document.getElementById("satisfacao-fill");
    if (!barraFill) return;

    barraFill.style.height = valor + "%";

    barraFill.classList.remove("satisfacao-baixa", "satisfacao-media", "satisfacao-alta");
    if (valor <= 40) {
        barraFill.classList.add("satisfacao-baixa");
    } else if (valor <= 70) {
        barraFill.classList.add("satisfacao-media");
    } else {
        barraFill.classList.add("satisfacao-alta");
    }
}
