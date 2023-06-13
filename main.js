(
    () => {
        const tabuleiroDOM = document.querySelector('#tabuleiro')
        var tabuleiro = [];
        var tabuleiroJogavel = [];

        for (let i = 0; i < 8; i++) {
            tabuleiroJogavel[i] = [];

            for (let j = 0; j < 8; j++) {

                tabuleiroJogavel[i][j] = [i, j]

                let quadrado = document.createElement('div')
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
                var value = '1';
                if (i < 3 && (i + j) % 2 == 1) { // peças máquina
                    tabuleiroJogavel[i][j][value] = [i, j, 'M']
                    quadrado.innerHTML = `M`;
                    quadrado.setAttribute("onclick", `seleciona(${i}, ${j}, '${tabuleiroJogavel[i][j][value][2]}')`)
                } else if (i > 4 && (i + j) % 2 == 1) { // peças humano
                    tabuleiroJogavel[i][j][value] = [i, j, 'H']
                    quadrado.innerHTML = `H`;
                    quadrado.setAttribute("onclick", `seleciona(${i}, ${j}, '${tabuleiroJogavel[i][j][value][2]}')`)
                } else if (i >= 3 && (i + j) % 2 == 1) { // campos disponiveis para movimentação
                    tabuleiroJogavel[i][j][value] = [i, j, 'P']
                    quadrado.innerHTML = `0`;
                    quadrado.setAttribute("onclick", `seleciona(${i}, ${j}, '${tabuleiroJogavel[i][j][value][2]}')`)
                } else { //campos nulos
                    tabuleiroJogavel[i][j][value] = [i, j, '1']

                }


                // adiciona as informações para estilizar e identificar as peças
                quadrado.setAttribute("id", `${i}${j}`)
                quadrado.setAttribute("class", `quadrado ${tabuleiroJogavel[i * 8 + j]}`)
            }
        }


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

                exibirTabuleiro();
            }

            fim();
        }

        //selecionar peça



        function exibirTabuleiro(tabuleiroJogavel) {
            for (let i = 0; i < tabuleiroJogavel.length; i++) {

            }

        }

        function jogoAcabou(tabuleiroJogavel, value) {
            pecasHumano = false;
            pecasMaquina = false;
            for (let i = 0; i < 8; i++) {
                for (let j = 0; j < 8; j++) {
                    console.log(`${tabuleiroJogavel[i][j]}`)
                    //if ((i + j) % 2 == 1 && tabuleiroJogavel[i][j][value][2] == 'M') {
                    //    pecasMaquina = true;
                    //    console.log(pecasHumano, pecasMaquina)
                    //} else if ((i + j) % 2 == 1 && tabuleiroJogavel[i][j][value][2] == 'H') {
                    //    pecasHumano = true;
                    //}
                }

            }
            return !pecasHumano || !pecasMaquina;

        }

        function realizarJogadaHumano() {

        }

        function realizarJogadaMaquina() {

        }



    }

)()

/*
function iniciarJogo() {
    inicializarTabuleiro();
    vezHumano=true;
    vezMaquina=false;

while(!jogoAcabou()){
    if (vezHumano){
        jogadaHumano();
    }else{
        jogadaMaquina();
    }
    vezHumano=!vezHumano;
}



}

function jogoAcabou(){

}

function jogadaHumano(){

}
*/

function posicionamentosPossiveis(i, j, value) {
    var x, y;
    var c = 0; //contador pro array possiveis
    x = movimenta['selecionada']['i'];
    y = movimenta['selecionada']['j'];

    document.getElementById(i, j).style.backgroundColor = "#3C9"; //muda cor de fundo
    possiveis[c] = x + y; c++;
    //if (tabuleiroJogavel[i][j][value] == )


    if (tabuleiroJogavel[i][j][value][2] == 'H') {  //possiveis jogadas humano
        if (vezHumano = true) {

            if (tabuleiroJogavel[i - 1][j - 1][value][2] == '0') {
                possivel(i - 1, j - 1);
            } if (j - 1 > 0 && tabuleiroJogavel[i - 1][j + 1][value][2] == 'M') {
                possivel(i - 2, j - 2);
            } if (j + 1 < 8 && peca[i + 1][j + 1][value][2] == 'M') {
                possivel(i - 2, j + 2);
            }

            if (i == 7) {
                if (!tabuleiroJogavel[i - 2][j][value] && !tabuleiroJogavel[i - 1][j][value]) {
                    possivel(x - 2, y);
                }
            }

        }


        if (peca[x][y]['cor'] == "preto") {

            if (!peca[x + 1][y]['peca']) {
                possivel(x + 1, y);
            } if (y - 1 > 0 && peca[x + 1][y - 1]['peca']) {
                possivel(x + 1, y - 1);
            }
            if (y + 1 < 9 && peca[x + 1][y + 1]['peca']) {
                possivel(x + 1, y + 1);
            }

            if (x == 2) {

                if (!peca[x + 2][y]['peca'] && !peca[x + 1][y]['peca']) {
                    possivel(x + 2, y);
                }

            }

        }
    }

    function possivel(px, py) {
        if (px > 0 && px < 9 && py > 0 && py < 9 && peca[px][py]['cor'] != movimenta['selecionada']['cor']) {
            document.getElementById('t' + (px) + (py)).style.backgroundColor = "#3C9"; //muda cor de fundo
            possiveis[c] = "t" + (px) + (py); c++;

            if (!peca[px][py]['peca']) {
                return true;
            }
        } else {
            return false;
        }


    }

    return c;
}

function seleciona(i, j, value) {
    if (value == 'H') {
        console.log("acertou")
        const mudarCor = document.getElementById(`${i}${j}`);
        mudarCor.style.backgroundColor = 'red';
    }


}

