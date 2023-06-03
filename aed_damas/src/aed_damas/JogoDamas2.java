package aed_damas;

import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class JogoDamas2 {

    private static final int TAMANHO_TABULEIRO = 8;
    private static final char PECAS_HUMANO = 'H';
    private static final char PECAS_MAQUINA = 'M';
    private static final char DAMA_HUMANO = 'D';
    private static final char DAMA_MAQUINA = 'Q';
    private static final char VAZIO = '-';

    private char[][] tabuleiro;
    private Scanner scanner;

    public JogoDamas2() {
        tabuleiro = new char[TAMANHO_TABULEIRO][TAMANHO_TABULEIRO];
        scanner = new Scanner(System.in);
    }

    public void iniciarJogo() {
        inicializarTabuleiro();
        exibirTabuleiro();

        boolean vezDoHumano = true;

        while (!jogoAcabou()) {
            if (vezDoHumano) {
                realizarJogadaHumano();
            } else {
                realizarJogadaMaquina();
            }
            vezDoHumano = !vezDoHumano;
            exibirTabuleiro();
        }

        System.out.println("Fim do jogo!");
    }

    private void inicializarTabuleiro() {
        for (int i = 0; i < TAMANHO_TABULEIRO; i++) {
            for (int j = 0; j < TAMANHO_TABULEIRO; j++) {
                if (i < 3 && (i + j) % 2 == 1) {
                    tabuleiro[i][j] = PECAS_MAQUINA;
                } else if (i > 4 && (i + j) % 2 == 1) {
                    tabuleiro[i][j] = PECAS_HUMANO;
                } else {
                    tabuleiro[i][j] = VAZIO;
                }
            }
        }
    }

    private void exibirTabuleiro() {
        System.out.println("Tabuleiro:");
        System.out.print("  ");
        for (int i = 0; i < TAMANHO_TABULEIRO; i++) {
            System.out.print((char) ('A' + i) + " ");
        }
        System.out.println();

        for (int i = 0; i < TAMANHO_TABULEIRO; i++) {
            System.out.print((i + 1) + " ");
            for (int j = 0; j < TAMANHO_TABULEIRO; j++) {
                System.out.print(tabuleiro[i][j] + " ");
            }
            System.out.println();
        }
        System.out.println();
    }

    private boolean jogoAcabou() {
        boolean pecasHumanas = false;
        boolean pecasMaquina = false;

        for (int i = 0; i < TAMANHO_TABULEIRO; i++) {
            for (int j = 0; j < TAMANHO_TABULEIRO; j++) {
                if (tabuleiro[i][j] == PECAS_HUMANO || tabuleiro[i][j] == DAMA_HUMANO) {
                    pecasHumanas = true;
                } else if (tabuleiro[i][j] == PECAS_MAQUINA || tabuleiro[i][j] == DAMA_MAQUINA) {
                    pecasMaquina = true;
                }
            }
        }

        return !pecasHumanas || !pecasMaquina;
    }

    private void realizarJogadaHumano() {
        System.out.println("Turno do jogador humano. Insira a posição atual da peça (linha coluna):");
        String posicaoAtual = scanner.nextLine();

        if (posicaoAtual.isEmpty()) {
            System.out.println("Jogada inválida. Tente novamente.");
            realizarJogadaHumano();
            return;
        }

        int linhaAtual = Integer.parseInt(posicaoAtual.split(" ")[0]) - 1;
        int colunaAtual = posicaoAtual.split(" ")[1].toUpperCase().charAt(0) - 'A';

        if (linhaAtual < 0 || linhaAtual >= TAMANHO_TABULEIRO || colunaAtual < 0 || colunaAtual >= TAMANHO_TABULEIRO) {
            System.out.println("Jogada inválida. Tente novamente.");
            realizarJogadaHumano();
            return;
        }

        System.out.println("Insira a posição desejada para a movimentação (linha coluna):");
        String posicaoDestino = scanner.nextLine();

        if (posicaoDestino.isEmpty()) {
            System.out.println("Jogada inválida. Tente novamente.");
            realizarJogadaHumano();
            return;
        }

        int linhaDestino = Integer.parseInt(posicaoDestino.split(" ")[0]) - 1;
        int colunaDestino = posicaoDestino.split(" ")[1].toUpperCase().charAt(0) - 'A';

        if (linhaDestino < 0 || linhaDestino >= TAMANHO_TABULEIRO || colunaDestino < 0 || colunaDestino >= TAMANHO_TABULEIRO) {
            System.out.println("Jogada inválida. Tente novamente.");
            realizarJogadaHumano();
            return;
        }

        if (movimentoValido(linhaAtual, colunaAtual, linhaDestino, colunaDestino, PECAS_HUMANO)) {
            moverPeca(linhaAtual, colunaAtual, linhaDestino, colunaDestino);
            if (linhaDestino == 0 && tabuleiro[linhaDestino][colunaDestino] == PECAS_HUMANO) {
                tabuleiro[linhaDestino][colunaDestino] = DAMA_HUMANO;
                System.out.println("Peça promovida a dama!");
            }
        } else {
            System.out.println("Movimento inválido. Tente novamente.");
            realizarJogadaHumano();
        }
    }

    
    private void realizarJogadaMaquina() {
        System.out.println("Turno da máquina...");

        int[] melhorMovimento = obterMelhorMovimento(PECAS_MAQUINA);
        int linhaAtual = melhorMovimento[0];
        int colunaAtual = melhorMovimento[1];
        int linhaDestino = melhorMovimento[2];
        int colunaDestino = melhorMovimento[3];

        moverPeca(linhaAtual, colunaAtual, linhaDestino, colunaDestino);
        if (linhaDestino == TAMANHO_TABULEIRO - 1 && tabuleiro[linhaDestino][colunaDestino] == PECAS_MAQUINA) {
            tabuleiro[linhaDestino][colunaDestino] = DAMA_MAQUINA;
            System.out.println("Peça promovida a dama!");
        }
    }

    private boolean movimentoValido(int linhaAtual, int colunaAtual, int linhaDestino, int colunaDestino, char tipoPeca) {
        if (tabuleiro[linhaAtual][colunaAtual] != tipoPeca && tabuleiro[linhaAtual][colunaAtual] != Character.toUpperCase(tipoPeca)) {
            return false;
        }

        if (tabuleiro[linhaDestino][colunaDestino] != VAZIO) {
            return false;
        }

        int direcao = (tipoPeca == PECAS_HUMANO) ? -1 : 1;
        if (linhaDestino != linhaAtual + direcao || Math.abs(colunaDestino - colunaAtual) != 1) {
            // Verifica se é uma captura válida
            if (Math.abs(colunaDestino - colunaAtual) == 2 && linhaDestino == linhaAtual + (2 * direcao)) {
                int colunaInimigo = (colunaDestino > colunaAtual) ? colunaAtual + 1 : colunaAtual - 1;
                int linhaInimigo = linhaAtual + direcao;
                if (tabuleiro[linhaInimigo][colunaInimigo] != tipoPeca && tabuleiro[linhaInimigo][colunaInimigo] != Character.toUpperCase(tipoPeca)) {
                    tabuleiro[linhaInimigo][colunaInimigo] = VAZIO;
                    return true;
                }
            }
            return false;
        }

        return true;
    }

    private int[] obterMelhorMovimento(char tipoPeca) {
        List<int[]> movimentosValidos = new ArrayList<>();

        for (int i = 0; i < TAMANHO_TABULEIRO; i++) {
            for (int j = 0; j < TAMANHO_TABULEIRO; j++) {
                if (tabuleiro[i][j] == tipoPeca || tabuleiro[i][j] == Character.toUpperCase(tipoPeca)) {
                    if (j > 0 && i < TAMANHO_TABULEIRO - 1 && tabuleiro[i + 1][j - 1] == VAZIO) {
                        movimentosValidos.add(new int[]{i, j, i + 1, j - 1});
                    }
                    if (j < TAMANHO_TABULEIRO - 1 && i < TAMANHO_TABULEIRO - 1 && tabuleiro[i + 1][j + 1] == VAZIO) {
                        movimentosValidos.add(new int[]{i, j, i + 1, j + 1});
                    }
                    if (tabuleiro[i][j] == DAMA_MAQUINA) {
                        if (j > 0 && i > 0 && tabuleiro[i - 1][j - 1] == VAZIO) {
                            movimentosValidos.add(new int[]{i, j, i - 1, j - 1});
                        }
                        if (j < TAMANHO_TABULEIRO - 1 && i > 0 && tabuleiro[i - 1][j + 1] == VAZIO) {
                            movimentosValidos.add(new int[]{i, j, i - 1, j + 1});
                        }
                    }
                }
            }
        }

        if (!movimentosValidos.isEmpty()) {
            int indiceMovimento = (int) (Math.random() * movimentosValidos.size());
            return movimentosValidos.get(indiceMovimento);
        }

        return null;
    }

    private void moverPeca(int linhaAtual, int colunaAtual, int linhaDestino, int colunaDestino) {
        char peca = tabuleiro[linhaAtual][colunaAtual];
        tabuleiro[linhaAtual][colunaAtual] = VAZIO;
        tabuleiro[linhaDestino][colunaDestino] = peca;
    }

    public static void main(String[] args) {
        JogoDamas2 jogo = new JogoDamas2();
        jogo.iniciarJogo();
    }
}
