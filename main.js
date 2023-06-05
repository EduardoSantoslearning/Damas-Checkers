(
    () => {
        const tabuleiroDOM = document.querySelector('#tabuleiro')
        var tabuleiro = [];
        var tabuleiroJogavel = [];

        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {

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
                
                
                if (i<3 && (i+j) % 2 == 1){ // peças máquina
                    tabuleiroJogavel.push('M');
                    quadrado.innerHTML = `M`;
                }else if(i>4 && (i+j)%2 ==1 ){ // peças humano
                    tabuleiroJogavel.push('H');
                    quadrado.innerHTML = `H`;
                }else{
                    tabuleiroJogavel.push(0);
                }
                

                // adiciona as informações para estilizar e identificar as peças
                quadrado.setAttribute("id", `${i}${j}`)
                quadrado.setAttribute("class", `quadrado ${tabuleiroJogavel[i*8+j]}`)
                
            }

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

