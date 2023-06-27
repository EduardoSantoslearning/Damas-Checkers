//detalhes do tabuleiro


const tabuleiroDOM = document.querySelector('#tabuleiro')
var tabuleiro = [];
var tabuleiroJogavel = [];
let inicioDeJogo = null;
let jogoSalvo = null;
var contagemPecasHumano = 0;    //contador de pecas capturadas
var contagemPecasMaquina = 0;   //contador de pecas capturadas
var pecaSelecionada = null;
var casaDestino = null;


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
        }


        // adiciona as informações para estilizar e identificar as peças
        quadrado.setAttribute("id", `${i}${j}`)
        quadrado.setAttribute("class", `quadrado ${tabuleiroJogavel[i * 8 + j]}`)

    }
}
//console.log(tabuleiroJogavel);
if (tabuleiroJogavel !== null) {
    inicioDeJogo = JSON.parse(JSON.stringify(tabuleiroJogavel));

    console.log("I", inicioDeJogo);
    console.log("T", tabuleiroJogavel);
}

//console.log(tabuleiroJogavel)


//Componentes do Jogo

function seleciona(i, j, value) {   //selecionar peça e movimentação
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


            pecaSelecionada = null;
            vezMaquina = true;
            
            atualizaTabuleiro();
            jogadaMaquina();

        } else if (pecaSelecionada - `${i}${j}` == 22 && (pecaSelecionada - `${i}${j}` - 11 == 11 && tabuleiroJogavel[(pecaSelecionada + 11).toString().charAt(0)][(pecaSelecionada + 11).toString().charAt(1)][2] == 'M')) { //come peça do inimigo
            tabuleiroJogavel[`${i}`][`${j}`][2] = 'H';  //recebe a peça

            tabuleiroJogavel[(pecaSelecionada + 11).toString().charAt(0)][(pecaSelecionada + 11).toString().charAt(1)][2] == 'P'; //desocupa a posição anteiror
            tabuleiroJogavel[pecaSelecionada.toString().charAt(0)][pecaSelecionada.toString().charAt(1)][2] = 'P'; //desocupa a posição anteiror

            pecaSelecionada = null;
            vezMaquina = true;
            
            atualizaTabuleiro();
            jogadaMaquina();

        } else if (pecaSelecionada - `${i}${j}` == 18 && (pecaSelecionada - `${i}${j}` - 9 == 9 && tabuleiroJogavel[(pecaSelecionada + 9).toString().charAt(0)][(pecaSelecionada + 9).toString().charAt(1)][2] == 'M')) { //come peça do inimigo
            tabuleiroJogavel[`${i}`][`${j}`][2] = 'H';  //recebe a peça

            tabuleiroJogavel[(pecaSelecionada + 11).toString().charAt(0)][(pecaSelecionada + 11).toString().charAt(1)][2] == 'P'; //desocupa a posição anteiror
            tabuleiroJogavel[pecaSelecionada.toString().charAt(0)][pecaSelecionada.toString().charAt(1)][2] = 'P'; //desocupa a posição anteiror


            pecaSelecionada = null;
            vezMaquina = true;

            atualizaTabuleiro();
            jogadaMaquina();

        }

    }
}

function jogadaMaquina() {

    if (vezMaquina == true) {
        vezMaquina = false;
        atualizaTabuleiro();

    }
}










function notificacao() {
    if (contagemPecasHumano == 12) {
        document.getElementById("mensagenNotificacao").innerHTML = "Vitória!"
    } else if (contagemPecasMaquina == 12) {
        document.getElementById("mensagenNotificacao").innerHTML = "Derrota!"
    }
}




/*===============Game FOOTER================================ */


function salvarJogo() {
    jogoSalvo = JSON.parse(JSON.stringify(tabuleiroJogavel));

    sairJogo();
}


function sairJogo() {
    tabuleiroJogavel = JSON.parse(JSON.stringify(inicioDeJogo));
    atualizaTabuleiro();
    document.getElementById("iniciar").style.display = "flex";
}









/*===============Tela Inicial================================ */

function iniciaJogo() {
    document.getElementById("iniciar").style.display = "none";
}

function carregarJogo() {
    document.getElementById("iniciar").style.display = "none";
    tabuleiroJogavel = JSON.parse(JSON.stringify(jogoSalvo));

    atualizaTabuleiro();
}




/*===============Atualização das jogadas================================ */





function atualizaTabuleiro() {

    for (let i = 0; i < 8; i++) { //peças
        for (let j = 0; j < 8; j++) {
            let atualiza = document.getElementById(`${i}${j}`)

            //Distribui peças
            if (tabuleiroJogavel[i][j][2] == 'M') { // peças máquina
                atualiza.setAttribute("onclick", `seleciona(${i}, ${j}, '${tabuleiroJogavel[i][j][2]}')`)
                atualiza.innerHTML = 'M';
                contagemPecasMaquina++;

            } else if (tabuleiroJogavel[i][j][2] == 'H') { // peças humano
                atualiza.setAttribute("onclick", `seleciona(${i}, ${j}, '${tabuleiroJogavel[i][j][2]}')`)
                atualiza.innerHTML = 'H';
                atualiza.style.backgroundColor = "black";
                contagemPecasHumano++;

            } else if (tabuleiroJogavel[i][j][2] == 'P') { // campos disponiveis para movimentação
                atualiza.setAttribute("onclick", `seleciona(${i}, ${j}, '${tabuleiroJogavel[i][j][2]}')`)
                atualiza.innerHTML = 'P';
                atualiza.style.backgroundColor = "black";

            } else { //campos nulos    
            }
        }
    }

    /*===============Game HEADER================================ */


    document.getElementById('captJogador2').innerHTML = (12 - `${contagemPecasHumano}`); //atualiza as peças capturadas pelo jogador
    document.getElementById('captJogador1').innerHTML = (12 - `${contagemPecasMaquina}`); //atualiza as peças capturadas pela máquina
    contagemPecasHumano = 0;
    contagemPecasMaquina = 0;
    if (contagemPecasHumano == 12 || contagemPecasMaquina == 12) {
        notificacao(contagemPecasHumano, contagemPecasMaquina);
    }
}