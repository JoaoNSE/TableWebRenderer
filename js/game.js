const X = 200; //largura
const Y = 200; //altura

var playerPos = new Vector2(X/2, Y/2);
var playerSize = 6;

const canvasBefore = []

const rend = new Renderer(X, Y);

/**
 * Ordem de execução das funções que renderizam.
 * Sugere-se começar com initCanvasData().
 * Deve terminar com renderCanvas().
 */
function renderQueueStart() {
    rend.addStep(initCanvasData);
    rend.addStep(processPlayerPos);
    rend.addStep(renderCanvas);
    rend.renderOnce();
    rend.clearQueue();
}

//Inicia o processo de renderização
document.addEventListener('keydown', keyProcess);
setInterval(renderQueueStart, 10);

function idx(x, y) {
    return new Renderer().idx(x, y);
}

//============ Aplicação de Efeitos ===============
//Aqui são definidas as funções que aplicam efeitos no canvas.

/**
 * Inicia a matriz de cores.
 */
function initCanvasData() {
    
    for (let i = 0; i < X; i++) {
        for(let j = 0; j < Y; j++) {
            canvasBefore[idx(i, j)] = new Color(0.0, 0.0, 0.0);
        }
    }
}

function processPlayerPos() {
    
    for(let px = 0; px < playerSize; px++) {
        for(let py = 0; py < playerSize; py++) {
            canvasBefore[idx(playerPos.x + px, playerPos.y + py)] = new Color(1.0, 1.0, 1.0);
        }
    }
}

function keyProcess(evt) {
    if(event.keyCode == 37) {
        playerPos.y -= 4;
    } else if(event.keyCode == 39) {
        playerPos.y += 4;
    } else if(event.keyCode == 38) {
        playerPos.x -= 4;
    } else if(event.keyCode == 40) {
        playerPos.x += 4;
    }
}

/**
 * Função que renderiza o canvas.
 * Cria um tabela e coloca uma cor em cada célula.
 * Essa função pode ser alterada para renderizar sem alterar a estrutura
 * anterior. Pode-se ser feita também utilizando o canvas do HTML ao invés
 * de tabela.
 */
function renderCanvas() {
    let html = '<table>';

    for(let i = 0; i < X; i++) {

        html += '<tr>';

        for(let j = 0; j < Y; j++) {
            col = canvasBefore[idx(i, j)];
            col.convTo255();
            html += '<td style="background-color: rgb('+ col.r + ', ' + col.g + ', ' + col.b + ')"></td>';

        }

        html += '</tr>';
    }

    html += '</table>'

    document.querySelector('#canvas').innerHTML = html;
}