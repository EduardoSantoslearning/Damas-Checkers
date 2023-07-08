//detalhes do tabuleiro


const tabuleiroDOM = document.querySelector('#tabuleiro')
var tabuleiro = [];
var tabuleiroJogavel = [];
var matrizArvore = [];
let inicioDeJogo = null;
let jogoSalvo = null;
var contagemPecasHumano = 0;    //contador de pecas capturadas
var contagemPecasMaquina = 0;   //contador de pecas capturadas
var pecaSelecionada = null;
var casaDestino = null;
var turnoMaquina = 1;


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
            tabuleiroJogavel[i][j] = [i, j, ' ']
            quadrado.innerHTML = ` `;
            quadrado.setAttribute("onclick", `seleciona(${i}, ${j}, '${tabuleiroJogavel[i][j][2]}')`)
        } else { //campos nulos
        }


        // adiciona as informações para estilizar e identificar as peças
        quadrado.setAttribute("id", `${i}${j}`)
        quadrado.setAttribute("class", `quadrado ${tabuleiroJogavel[i * 8 + j]}`)

    }
}
if (tabuleiroJogavel !== null) {
    inicioDeJogo = JSON.parse(JSON.stringify(tabuleiroJogavel));

}



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

    } else if (value == ' ' && pecaSelecionada > 0) {
        if (pecaSelecionada - `${i}${j}` == 9 || pecaSelecionada - `${i}${j}` == 11) { //Movimenta a peça
            if (`${i}` == 0) { //Movimenta a peça
                console.log(`${i}`);
                tabuleiroJogavel[`${i}`][`${j}`][2] = 'DH';  //recebe a peça
                tabuleiroJogavel[pecaSelecionada.toString().charAt(0)][pecaSelecionada.toString().charAt(1)][2] = ' '; //desocupa a posição anterior

            } else {
                tabuleiroJogavel[`${i}`][`${j}`][2] = 'H';  //recebe a peça
                tabuleiroJogavel[pecaSelecionada.toString().charAt(0)][pecaSelecionada.toString().charAt(1)][2] = ' '; //desocupa a posição anterior

            }
            pecaSelecionada = null;
            vezMaquina = true;

            atualizaTabuleiro();
            jogadaMaquina();
            turnoMaquina += 1;

        }
        else if (pecaSelecionada - `${i}${j}` == 18 && tabuleiroJogavel[(pecaSelecionada - 9).toString().charAt(0)][(pecaSelecionada - 9).toString().charAt(1)][2] == 'M') {
            tabuleiroJogavel[`${i}`][`${j}`][2] = 'H';
            tabuleiroJogavel[(pecaSelecionada - 9).toString().charAt(0)][(pecaSelecionada - 9).toString().charAt(1)][2] = ' ';
            tabuleiroJogavel[pecaSelecionada.toString().charAt(0)][pecaSelecionada.toString().charAt(1)][2] = ' '; //desocupa a posição anterior

            pecaSelecionada = null;
            vezMaquina = true;

            atualizaTabuleiro();
            jogadaMaquina();
            turnoMaquina += 1;

        }
        else if (pecaSelecionada - `${i}${j}` == 22 && tabuleiroJogavel[(pecaSelecionada - 11).toString().charAt(0)][(pecaSelecionada - 11).toString().charAt(1)][2] == 'M') {
            tabuleiroJogavel[`${i}`][`${j}`][2] = 'H';
            tabuleiroJogavel[(pecaSelecionada - 11).toString().charAt(0)][(pecaSelecionada - 11).toString().charAt(1)][2] = ' ';
            tabuleiroJogavel[pecaSelecionada.toString().charAt(0)][pecaSelecionada.toString().charAt(1)][2] = ' '; //desocupa a posição anterior

            pecaSelecionada = null;
            vezMaquina = true;

            atualizaTabuleiro();
            jogadaMaquina();
            turnoMaquina += 1;

        }
        else if (`${i}` == 0 && (pecaSelecionada - `${i}${j}` == 9 || pecaSelecionada - `${i}${j}` == 11)) { //Movimenta a peça
            tabuleiroJogavel[`${i}`][`${j}`][2] = 'DH';  //recebe a peça
            tabuleiroJogavel[pecaSelecionada.toString().charAt(0)][pecaSelecionada.toString().charAt(1)][2] = ' '; //desocupa a posição anterior

            pecaSelecionada = null;
            vezMaquina = true;

            atualizaTabuleiro();
            jogadaMaquina();
            turnoMaquina += 1;

        }

    }
    /* 
    if (value == 'DH') {
        
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
        
    } else if (value == ' ' && pecaSelecionada > 0) {
        if (pecaSelecionada - `${i}${j}` == 9 || pecaSelecionada - `${i}${j}` == 11
        || pecaSelecionada - `${i}${j}` == -9 || pecaSelecionada - `${i}${j}` == -11) { //Movimenta a peça
            tabuleiroJogavel[`${i}`][`${j}`][2] = 'DH';  //recebe a peça
            tabuleiroJogavel[pecaSelecionada.toString().charAt(0)][pecaSelecionada.toString().charAt(1)][2] = ' '; //desocupa a posição anterior
            
            console.log(pecaSelecionada)
            pecaSelecionada = null;
            vezMaquina = true;
            
            
            atualizaTabuleiro();
            jogadaMaquina();
            turnoMaquina += 1;
            
        }
        else if (pecaSelecionada - `${i}${j}` == 18 && tabuleiroJogavel[(pecaSelecionada - 9).toString().charAt(0)][(pecaSelecionada - 9).toString().charAt(1)][2] == 'M'
        || pecaSelecionada - `${i}${j}` == 18 && tabuleiroJogavel[(pecaSelecionada - 9).toString().charAt(0)][(pecaSelecionada - 9).toString().charAt(1)][2] == 'DM') {
            tabuleiroJogavel[`${i}`][`${j}`][2] = 'DH';
            tabuleiroJogavel[(pecaSelecionada - 9).toString().charAt(0)][(pecaSelecionada - 9).toString().charAt(1)][2] = ' ';
            tabuleiroJogavel[pecaSelecionada.toString().charAt(0)][pecaSelecionada.toString().charAt(1)][2] = ' '; //desocupa a posição anterior
            
            pecaSelecionada = null;
            vezMaquina = true;
            
            atualizaTabuleiro();
            jogadaMaquina();
            turnoMaquina += 1;
            
        }
        else if (pecaSelecionada - `${i}${j}` == -18 && tabuleiroJogavel[(pecaSelecionada + 9).toString().charAt(0)][(pecaSelecionada + 9).toString().charAt(1)][2] == 'M'
        || pecaSelecionada - `${i}${j}` == -18 && tabuleiroJogavel[(pecaSelecionada + 9).toString().charAt(0)][(pecaSelecionada + 9).toString().charAt(1)][2] == 'DM') {
            tabuleiroJogavel[`${i}`][`${j}`][2] = 'DH';
            tabuleiroJogavel[(pecaSelecionada + 9).toString().charAt(0)][(pecaSelecionada + 9).toString().charAt(1)][2] = ' ';
            tabuleiroJogavel[pecaSelecionada.toString().charAt(0)][pecaSelecionada.toString().charAt(1)][2] = ' '; //desocupa a posição anterior
            
            pecaSelecionada = null;
            vezMaquina = true;
            
            atualizaTabuleiro();
            jogadaMaquina();
            turnoMaquina += 1;
            
        }
        else if (pecaSelecionada - `${i}${j}` == 22 && tabuleiroJogavel[(pecaSelecionada - 11).toString().charAt(0)][(pecaSelecionada - 11).toString().charAt(1)][2] == 'M'
        || pecaSelecionada - `${i}${j}` == 22 && tabuleiroJogavel[(pecaSelecionada - 11).toString().charAt(0)][(pecaSelecionada - 11).toString().charAt(1)][2] == 'DM') {
            tabuleiroJogavel[`${i}`][`${j}`][2] = 'DH';
            tabuleiroJogavel[(pecaSelecionada - 11).toString().charAt(0)][(pecaSelecionada - 11).toString().charAt(1)][2] = ' ';
            tabuleiroJogavel[pecaSelecionada.toString().charAt(0)][pecaSelecionada.toString().charAt(1)][2] = ' '; //desocupa a posição anterior
            
            pecaSelecionada = null;
            vezMaquina = true;
            
            atualizaTabuleiro();
            jogadaMaquina();
            turnoMaquina += 1;
            
        }
        else if (pecaSelecionada - `${i}${j}` == -22 && tabuleiroJogavel[(pecaSelecionada + 11).toString().charAt(0)][(pecaSelecionada + 11).toString().charAt(1)][2] == 'M'
        || pecaSelecionada - `${i}${j}` == -22 && tabuleiroJogavel[(pecaSelecionada + 11).toString().charAt(0)][(pecaSelecionada + 11).toString().charAt(1)][2] == 'DM') {
            tabuleiroJogavel[`${i}`][`${j}`][2] = 'DH';
            tabuleiroJogavel[(pecaSelecionada + 11).toString().charAt(0)][(pecaSelecionada + 11).toString().charAt(1)][2] = ' ';
            tabuleiroJogavel[pecaSelecionada.toString().charAt(0)][pecaSelecionada.toString().charAt(1)][2] = ' '; //desocupa a posição anterior
            
            pecaSelecionada = null;
            vezMaquina = true;
            
            atualizaTabuleiro();
            jogadaMaquina();
            turnoMaquina += 1;
            
        }
        
    }
    
    */
}

function jogadaMaquina() {

    const jogadasPossiveis = obterJogadasPossiveis();
    if (vezMaquina == true) {
        let melhorJogada = 0;
        minimax(jogadasPossiveis);
    }

    vezMaquina = false;
    atualizaTabuleiro();

}

function obterJogadasPossiveis() {
    let jogadasPossiveis = [];
    let possiveis = [];
    let w, x, y, z = null;
    for (let i = 0; i < 8; i++) { //peças
        possiveis[i] = [];
        for (let j = 0; j < 8; j++) {
            possiveis[i][j] = [];
            //Distribui peças
            if (tabuleiroJogavel[i][j][2] == 'M') { // peças máquina
                if (i + 1 <= 7 && j - 1 >= 0) {
                    x = i + 1;
                    y = j - 1;
                    if (tabuleiroJogavel[x][y][2] == ' ') {
                        possiveis[i][j].push(tabuleiroJogavel[x][y]);
                    }
                }
                if (i + 1 <= 7 && j + 1 <= 7) {
                    x = i + 1;
                    y = j + 1;
                    if (tabuleiroJogavel[x][y][2] == ' ') {
                        possiveis[i][j].push(tabuleiroJogavel[x][y]);
                    }
                }
                if (i + 2 <= 7 && j + 2 <= 7) {
                    x = i + 2;
                    y = j + 2;
                    w = i + 1;
                    z = j + 1;
                    if (tabuleiroJogavel[x][y][2] == ' ' && tabuleiroJogavel[w][z][2] == 'H') {
                        possiveis[i][j].push(tabuleiroJogavel[x][y]);
                    }
                }
                if (i + 2 <= 7 && j - 2 >= 0) {
                    x = i + 2;
                    y = j - 2;
                    w = i + 1;
                    z = j - 1;
                    if (tabuleiroJogavel[x][y][2] == ' ' && tabuleiroJogavel[w][z][2] == 'H') {
                        possiveis[i][j].push(tabuleiroJogavel[x][y]);
                    }
                }
                if (possiveis[i][j].length !== 0) {
                    for (let count = 0; count < possiveis[i][j].length; count++) {
                        let jogada = [tabuleiroJogavel[i][j], possiveis[i][j][count]];
                        jogadasPossiveis.push(jogada);
                    }
                }
            }
            /*
            if (tabuleiroJogavel[i][j][2] == 'DM') { // peças  Dama
                if (i + 1 <= 7 && j - 1 >= 0) {
                    x = i + 1;
                    y = j - 1;
                    if (tabuleiroJogavel[x][y][2] == ' ') {
                        possiveis[i][j].push(tabuleiroJogavel[x][y]);
                    }
                }
                if (i - 1 <= 7 && j + 1 >= 0) {
                    x = i - 1;
                    y = j + 1;
                    if (tabuleiroJogavel[x][y][2] == ' ') {
                        possiveis[i][j].push(tabuleiroJogavel[x][y]);
                    }
                }
                if (i + 1 <= 7 && j + 1 <= 7) {
                    x = i + 1;
                    y = j + 1;
                    if (tabuleiroJogavel[x][y][2] == ' ') {
                        possiveis[i][j].push(tabuleiroJogavel[x][y]);
                    }
                }
                if (i - 1 <= 7 && j - 1 <= 7) {
                    x = i - 1;
                    y = j - 1;
                    if (tabuleiroJogavel[x][y][2] == ' ') {
                        possiveis[i][j].push(tabuleiroJogavel[x][y]);
                    }
                }
                if (i + 2 <= 7 && j + 2 <= 7) {
                    x = i + 2;
                    y = j + 2;
                    w = i + 1;
                    z = j + 1;
                    if (tabuleiroJogavel[x][y][2] == ' ' && (tabuleiroJogavel[w][z][2] == 'H' || tabuleiroJogavel[w][z][2] == 'DH')) {
                        possiveis[i][j].push(tabuleiroJogavel[x][y]);
                    }
                }
                if (i - 2 <= 7 && j - 2 <= 7) {
                    x = i - 2;
                    y = j - 2;
                    w = i - 1;
                    z = j - 1;
                    if (tabuleiroJogavel[x][y][2] == ' ' && (tabuleiroJogavel[w][z][2] == 'H' || tabuleiroJogavel[w][z][2] == 'DH')) {
                        possiveis[i][j].push(tabuleiroJogavel[x][y]);
                    }
                }
                if (i + 2 <= 7 && j - 2 >= 0) {
                    x = i + 2;
                    y = j - 2;
                    w = i + 1;
                    z = j - 1;
                    if (tabuleiroJogavel[x][y][2] == ' ' && (tabuleiroJogavel[w][z][2] == 'H' || tabuleiroJogavel[w][z][2] == 'DH')) {
                        possiveis[i][j].push(tabuleiroJogavel[x][y]);
                    }
                }
                if (i - 2 <= 7 && j + 2 >= 0) {
                    x = i - 2;
                    y = j + 2;
                    w = i - 1;
                    z = j + 1;
                    if (tabuleiroJogavel[x][y][2] == ' ' && (tabuleiroJogavel[w][z][2] == 'H' || tabuleiroJogavel[w][z][2] == 'DH')) {
                        possiveis[i][j].push(tabuleiroJogavel[x][y]);
                    }
                }
                if (possiveis[i][j].length !== 0) {
                    for (let count = 0; count < possiveis[i][j].length; count++) {
                        let jogada = [tabuleiroJogavel[i][j], possiveis[i][j][count]];
                        jogadasPossiveis.push(jogada);
                    }
                }
            }
            */
            
        }
    }
    return jogadasPossiveis;
}



function minimax(jogadasPossiveis) {
    let melhorJogada = null;
    let melhorPontuacao = -5;
    let pontuacao = null;
    if (jogadasPossiveis.length != 0) {

        for (jogada of jogadasPossiveis) {
            let tabuleiro = JSON.parse(JSON.stringify(tabuleiroJogavel));
            pontuacao = realizarJogadaTeste(jogada, tabuleiro);
            if (pontuacao > melhorPontuacao) {
                melhorPontuacao = pontuacao;
                melhorJogada = JSON.parse(JSON.stringify(tabuleiro));

            } else if (pontuacao == melhorPontuacao) {
                if (Math.random() < 0.5) {
                    melhorPontuacao = pontuacao;
                    melhorJogada = JSON.parse(JSON.stringify(tabuleiro));
                }

            }
            arvore(jogada, pontuacao, turnoMaquina);
        }
    }

    tabuleiroJogavel = JSON.parse(JSON.stringify(melhorJogada));

}


function arvore(jogada, pontuacao, turnoMaquina) {
    matrizArvore.push(`Turno: ${turnoMaquina} Peça Movida: ${jogada[0]} Posição Destino: ${jogada[1]} Pontuação da Jogada: ${pontuacao}`)

}

function realizarJogadaTeste(jogada, tabuleiro) {
    pontuacao = 0;
    let i = jogada[0][0];
    let j = jogada[0][1];
    let k = jogada[1][0];
    let l = jogada[1][1];
    let posicaoSelecionada = `${i}${j}`;
    let posicaoAlvo = `${k}${l}`;

    if (parseInt(posicaoSelecionada) - parseInt(posicaoAlvo) == -9 || parseInt(posicaoSelecionada) - parseInt(posicaoAlvo) == -11) { //Movimenta a peça
        tabuleiro[`${k}`][`${l}`][2] = 'M';  //recebe a peça
        tabuleiro[jogada.toString().charAt(0)][jogada.toString().charAt(2)][2] = ' '; //desocupa a posição anteiror

        pontuacao += 1;
        if (l == 0 || l == 7) { //jogada estratégica
            pontuacao += 1;

        }
        if (l + 1 <= 7 && l - 1 >= 0 && k + 1 <= 7) {
            if ((parseInt(jogada.toString().charAt(6)) + 1) <= 7 && (parseInt(jogada.toString().charAt(6)) + 1) >= 0 &&
                (parseInt(jogada.toString().charAt(8)) + 1) <= 7 && (parseInt(jogada.toString().charAt(8)) + 1) >= 0 &&
                (tabuleiro[(parseInt(jogada.toString().charAt(6)) + 1)][(parseInt(jogada.toString().charAt(8)) + 1)][2] == 'H' ||
                    tabuleiro[(parseInt(jogada.toString().charAt(6)) + 1)][(parseInt(jogada.toString().charAt(8)) - 1)][2] == 'H')) {

                pontuacao -= 2;
            }
        }
        return pontuacao;

    }
    else if (parseInt(posicaoAlvo) - parseInt(posicaoSelecionada) == 18 && tabuleiro[(parseInt(posicaoSelecionada) + 9).toString().charAt(0)][(parseInt(posicaoSelecionada) + 9).toString().charAt(1)][2] == 'H') {
        tabuleiro[`${k}`][`${l}`][2] = 'M';
        tabuleiro[(parseInt(posicaoSelecionada) + 9).toString().charAt(0)][(parseInt(posicaoSelecionada) + 9).toString().charAt(1)][2] = ' ';
        tabuleiro[jogada.toString().charAt(0)][jogada.toString().charAt(2)][2] = ' '; //desocupa a posição anterior

        pontuacao += 4;
        if (l == 0 || l == 7) { //jogada estratégica
            pontuacao += 1;

        }
        if (l + 1 <= 7 && l - 1 >= 0 && k + 1 <= 7) {
            if ((parseInt(jogada.toString().charAt(6)) + 1) <= 7 && (parseInt(jogada.toString().charAt(6)) + 1) >= 0 &&
                (parseInt(jogada.toString().charAt(8)) + 1) <= 7 && (parseInt(jogada.toString().charAt(8)) + 1) >= 0 &&
                (tabuleiro[(parseInt(jogada.toString().charAt(6)) + 1)][(parseInt(jogada.toString().charAt(8)) + 1)][2] == 'H' ||
                    tabuleiro[(parseInt(jogada.toString().charAt(6)) + 1)][(parseInt(jogada.toString().charAt(8)) - 1)][2] == 'H')) {

                pontuacao -= 2;
            }
        }
        return pontuacao;


    }
    else if (parseInt(posicaoAlvo) - parseInt(posicaoSelecionada) == 22 && tabuleiro[(parseInt(posicaoSelecionada) + 11).toString().charAt(0)][(parseInt(posicaoSelecionada) + 11).toString().charAt(1)][2] == 'H') {
        tabuleiro[`${k}`][`${l}`][2] = 'M';
        tabuleiro[(parseInt(posicaoSelecionada) + 11).toString().charAt(0)][(parseInt(posicaoSelecionada) + 11).toString().charAt(1)][2] = ' ';
        tabuleiro[jogada.toString().charAt(0)][jogada.toString().charAt(2)][2] = ' '; //desocupa a posição anterior


        pontuacao += 4;
        if (l == 0 || l == 7) { //jogada estratégica
            pontuacao += 1;

        }
        if (l + 1 <= 7 && l - 1 >= 0 && k + 1 <= 7) {
            if ((parseInt(jogada.toString().charAt(6)) + 1) <= 7 && (parseInt(jogada.toString().charAt(6)) + 1) >= 0 &&
                (parseInt(jogada.toString().charAt(8)) + 1) <= 7 && (parseInt(jogada.toString().charAt(8)) + 1) >= 0 &&
                (tabuleiro[(parseInt(jogada.toString().charAt(6)) + 1)][(parseInt(jogada.toString().charAt(8)) + 1)][2] == 'H' ||
                    tabuleiro[(parseInt(jogada.toString().charAt(6)) + 1)][(parseInt(jogada.toString().charAt(8)) - 1)][2] == 'H')) {

                pontuacao -= 2;
            }
        }
        return pontuacao;

    }

}





function notificacao() {
    if (contagemPecasHumano == 12) {
        document.getElementById("mensagemNotificacao").innerHTML = "Vitória!"
    } else if (contagemPecasMaquina == 12) {
        document.getElementById("mensagemNotificacao").innerHTML = "Derrota!"
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


function mostrarArvore() {
    document.getElementById("mostrarMatriz").style.display = "flex";
    document.getElementById("matriz").innerHTML = matrizArvore;
}

function voltarAoJogo() {
    document.getElementById("mostrarMatriz").style.display = "none";
}



/*===============Tela Inicial================================ */

function iniciaJogo() {
    document.getElementById("iniciar").style.display = "none";
}

function carregarJogo() {
    document.getElementById("iniciar").style.display = "none";
    if (jogoSalvo !== null) {
        tabuleiroJogavel = JSON.parse(JSON.stringify(jogoSalvo));
    }

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

            } else if (tabuleiroJogavel[i][j][2] == ' ') { // campos disponiveis para movimentação
                atualiza.setAttribute("onclick", `seleciona(${i}, ${j}, '${tabuleiroJogavel[i][j][2]}')`)
                atualiza.innerHTML = ' ';
                atualiza.style.backgroundColor = "black";

            } else if (tabuleiroJogavel[i][j][2] == 'DM') { // campos disponiveis para movimentação
                atualiza.setAttribute("onclick", `seleciona(${i}, ${j}, '${tabuleiroJogavel[i][j][2]}')`)
                atualiza.innerHTML = 'DM';
                atualiza.style.backgroundColor = "black";

            } else if (tabuleiroJogavel[i][j][2] == 'DH') { // campos disponiveis para movimentação
                atualiza.setAttribute("onclick", `seleciona(${i}, ${j}, '${tabuleiroJogavel[i][j][2]}')`)
                atualiza.innerHTML = 'DH';
                atualiza.style.backgroundColor = "black";

            }
        }
    }

    /*===============Game HEADER================================ */


    document.getElementById('captJogador2').innerHTML = (12 - `${contagemPecasHumano}`); //atualiza as peças capturadas pelo jogador
    document.getElementById('captJogador1').innerHTML = (12 - `${contagemPecasMaquina}`); //atualiza as peças capturadas pela máquina

    contagemPecasHumano = 0;
    contagemPecasMaquina = 0;
    if(contagemPecasHumano == 12 || contagemPecasMaquina == 12){
        notificacao(contagemPecasHumano, contagemPecasMaquina);
    }
    
}