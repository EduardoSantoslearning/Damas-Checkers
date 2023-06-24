const tabuleiroDOM = document.querySelector('#tabuleiro')
var tabuleiro = [];
var tabuleiroJogavel = [];

for (let i = 0; i < 8; i++) {
    tabuleiroJogavel[i] = [];

    for (let j = 0; j < 8; j++) {

        tabuleiroJogavel[i][j] = [i, j]

        var quadrado = document.createElement('div')
        tabuleiroDOM.appendChild(quadrado)

        if (i % 2 == 0) {
            if (j % 2 == 0) {
                quadrado.style.backgroundColor = "white";
                quadrado.style.color = 'black';
            } else {
                quadrado.style.backgroundColor = "black";
                quadrado.style.color = 'white';
            }
        } else {
            if (j % 2 == 0) {
                quadrado.style.backgroundColor = "black";
                quadrado.style.color = 'white';
            } else {
                quadrado.style.backgroundColor = "white";
                quadrado.style.color = 'black';
            }
        }

        //Distribui peças
        if (i < 3 && (i + j) % 2 == 1) { // peças máquina
            tabuleiroJogavel[i][j] = [i, j, 'M']
            quadrado.innerHTML = `M`;
            quadrado.setAttribute("onclick", `seleciona(${i}, ${j}, '${tabuleiroJogavel[i][j][2]}')`)
        } else if (i > 4 && (i + j) % 2 == 1) { // peças humano
            tabuleiroJogavel[i][j] = [i, j, 'H']
            quadrado.innerHTML = `H`;
            quadrado.setAttribute("onclick", `seleciona(${i}, ${j}, '${tabuleiroJogavel[i][j][2]}')`)
        } else if (i >= 3 && (i + j) % 2 == 1) { // campos disponiveis para movimentação
            tabuleiroJogavel[i][j] = [i, j, 'P']
            quadrado.innerHTML = `P`;
            quadrado.setAttribute("onclick", `seleciona(${i}, ${j}, '${tabuleiroJogavel[i][j][2]}')`)
        } else { //campos nulos
            tabuleiroJogavel[i][j] = [i, j, '1']

        }


        // adiciona as informações para estilizar e identificar as peças
        quadrado.setAttribute("id", `${i}${j}`)
        quadrado.setAttribute("class", `quadrado ${tabuleiroJogavel[i * 8 + j]}`)
    }
}
console.log(tabuleiroJogavel)


//Componentes do Jogo

iniciarJogo(tabuleiroJogavel);

function iniciarJogo(tabuleiroJogavel) {
    exibirTabuleiro(tabuleiroJogavel)

    vezHumano = true;

    while (!jogoAcabou(tabuleiroJogavel)) {
        if (vezHumano) {
            realizarJogadaHumano();

        } else {
            realizarJogadaMaquina();

        }

        vezHumano = !vezHumano;

    }

}

function jogoAcabou() {

}

function realizarJogadaHumano() {
    console.log('Jogada Humano')




}

function realizarJogadaMaquina() {
    console.log('Jogada Máquina')

}


var pecaSelecionada = null;
var casaDestino = null;
function seleciona(i, j, value) {
    if (value == 'H') {

        if (pecaSelecionada !== null) {
            const elementoAnterior = document.getElementById(pecaSelecionada);
            if (elementoAnterior !== null) {
                elementoAnterior.style.backgroundColor = "black";
            }
        }

        const elementoAtual = document.getElementById(`${i}${j}`);
        if (pecaSelecionada !== `${i}${j}` && elementoAtual !== null) {
            elementoAtual.style.backgroundColor = "green";
            pecaSelecionada = `${i}${j}`;
        } else {
            pecaSelecionada = null;
        }

    } else if (value == 'P' && pecaSelecionada > 0) {
        if (pecaSelecionada - `${i}${j}` == 9 || pecaSelecionada - `${i}${j}` == 11) { //Movimenta a peça
            tabuleiroJogavel[`${i}`][`${j}`][2] = 'H';  //recebe a peça
            tabuleiroJogavel[pecaSelecionada.toString().charAt(0)][pecaSelecionada.toString().charAt(1)][2] = 'P'; //desocupa a posição anteiror


            console.log(tabuleiroJogavel[pecaSelecionada.toString().charAt(0)][pecaSelecionada.toString().charAt(1)]);
            console.log(tabuleiroJogavel[`${i}`][`${j}`])
            //console.log(tabuleiroJogavel[pecaSelecionada[0]])

            pecaSelecionada = null;
            atualizaTabuleiro();
            vezMaquina = true;


        }
        //console.log(tabuleiroJogavel)

        //jogadaMaquina();
    }

    //console.log(pecaSelecionada);
    //return pecaSelecionada;
}

function realizarJogadaHumano(peca) {

}

function atualizaTabuleiro() {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            console.log(tabuleiroJogavel[i][j][2])
            let atualiza = document.getElementById(`${i}${j}`)

            //Distribui peças
            if (tabuleiroJogavel[i][j][2] == 'M') { // peças máquina
                atualiza.setAttribute("onclick", `seleciona(${i}, ${j}, '${tabuleiroJogavel[i][j][2]}')`)
                atualiza.innerHTML = 'M';
                
            } else if (tabuleiroJogavel[i][j][2] == 'H') { // peças humano
                atualiza.setAttribute("onclick", `seleciona(${i}, ${j}, '${tabuleiroJogavel[i][j][2]}')`)
                atualiza.innerHTML = 'H';
                atualiza.style.backgroundColor = "black";

            } else if (tabuleiroJogavel[i][j][2] == 'P') { // campos disponiveis para movimentação
                atualiza.setAttribute("onclick", `seleciona(${i}, ${j}, '${tabuleiroJogavel[i][j][2]}')`)
                atualiza.innerHTML = 'P';
                atualiza.style.backgroundColor = "black";
                
            } else { //campos nulos    
            }


            // adiciona as informações para estilizar e identificar as peças
            quadrado.setAttribute("id", `${i}${j}`)
            quadrado.setAttribute("class", `quadrado ${tabuleiroJogavel[i * 8 + j]}`)

        }
    }
}
