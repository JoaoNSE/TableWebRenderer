const X = 200; //largura
const Y = 200; //altura

const canvasBefore = []
const canvasAfter = []

/**
 * Converte a posição de matriz para vetor.
 * @param {*} x Posição em x
 * @param {*} y Posição em y
 */
function idx(x, y) {
    return x + (X*y);
}

/**
 * Ordem de execução das funções que renderizam.
 * Sugere-se começar com initCanvasData().
 * Deve terminar com renderCanvas().
 */
function renderQueueStart() {
    initCanvasData();
    //estaticaNoise();
    //redToGreen();
    cell();
    //estatica();
    
    
    renderCanvas();
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

/**
 * Aplica um efeito de degradê, indo vermelho ao verde até o rosa.
 */
function redToGreen() {
    for (let i = 0; i < X; i++) {
        for(let j = 0; j < Y; j++) {
            //canvasBefore[idx(i, j)] = new Color(1.0 - i/X, i/X, j/Y);
            canvasBefore[idx(i, j)].r *=  1.0 - i/X;
            canvasBefore[idx(i, j)].g *=  i/X;
            canvasBefore[idx(i, j)].b *=  j/Y;
        }
    }
}

/**
 * Aplica um cellular noise utilizando os pontos do array pts.
 */
function cell() {
    //Pontos com coordenadas normalizadas (0 a 1)
    const pts = []
    pts.push(new Vector2(.25, .25));
    pts.push(new Vector2(.75, .25));
    pts.push(new Vector2(.75, .75));
    pts.push(new Vector2(.25, .75));
    pts.push(new Vector2(.5, .5));

    for (let i = 0; i < X; i++) {
        for(let j = 0; j < Y; j++) {

            var min_dist = Infinity;

            pts.forEach(e => {
                min_dist = Math.min(e.distance(new Vector2(i/X, j/Y)), min_dist);
                
            });
            canvasBefore[idx(i, j)].add(min_dist);
        }
    }
}

/**
 * Aplica a função de random, gerando estática.
 */
function estatica() {
    for (let i = 0; i < X; i++) {
        for(let j = 0; j < Y; j++) {
            const st = rando(new Vector2((i/X), (j/Y)));
            canvasBefore[idx(i, j)] = new Color(st, st, st);
        }
    }
}

/**
 * Aplica um ruído no canvas.
 */
function estaticaNoise() {
    for (let i = 0; i < X; i++) {
        for(let j = 0; j < Y; j++) {
            const st = noise(new Vector2((i/X)*3, (j/Y)*3));
            canvasBefore[idx(i, j)] = new Color(st, st, st);
        }
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

//Inicia o processo de renderização
renderQueueStart();

//========================= FUNÇÕES UTILITÁRIAS =======================
//Aqui são definidas as funções utilitárias para os passos da renderização.

/**
 * Recebe um número e retorna apenas a parte fracional dele.
 * @param {*} n Número.
 */
function frac(n) {
    // n <= -5.2

    var r = Math.abs(n);
    //r <= abs(-5.2) = 5.2
    return r - Math.floor(r);
    //5.2 - 5 = 0.2
}

/**
 * Recebe um Vector2 e retorna um valor pseudo aleatório de acordo com
 * a posição do vetor.
 * @param {Vector2} st Vetor de 2 valores normalizado. (Posição na textura)
 */
function rando(st) {
    var tmp = new Vector2(12.9898,78.233);
    tmp = tmp.dot(st);
    
    tmp = Math.sin(tmp);
    
    
    tmp *= 43758.5453123;

    return frac(tmp);

}

/**
 * Realiza interpolação linear entre o valor start e end.
 * @param {*} start Valor inicial.
 * @param {*} end Valor final.
 * @param {*} amt Passo da interpolação.
 */
function lerp (start, end, amt){
    return (1-amt)*start+amt*end
}

/**
 * Gera um textura de noise, de acordo com a posição indicada.
 * @param {Vector2} st Vetor de 2 valores normalizado. (Posição na textura)
 */
function noise(st) {
    var i = new Vector2(Math.floor(st.x), Math.floor(st.y));
    
    var f = new Vector2(frac(st.x), frac(st.y));

    var a = rando(i);
    var b = rando(i.add(new Vector2(1.0, 0.0)));
    var c = rando(i.add(new Vector2(0.0, 1.0)));
    var d = rando(i.add(new Vector2(1.0, 1.0)));

    //f*f*(3.0-2.0*f)
    var f2 = f.scaleV(f);
    var _2f = f.scale(-2.0);

    _2f = f2.scaleV(_2f);

    f2 = f2.scale(3.0);

    var u = f2.add(_2f);

    return lerp(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}