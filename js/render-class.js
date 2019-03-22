function Renderer(X, Y) {
	this.X = (X === undefined) ? 200 : Y;
    this.Y = (X === undefined) ? 200 : Y;

    this.canvasAfter = []
    this.renderQueue = []
}

Renderer.prototype = {
    /**
     * Converte a posição de matriz para vetor.
     * @param {*} x Posição em x
     * @param {*} y Posição em y
     */
    idx: function(x, y) {
        return x + (X*y);
    },

    /**
     * Adiciona um passo na fila de renderização.
     * @param {function} step 
     */
    addStep: function(step) {
        this.renderQueue.push(step);
    },

    /**
     * Inicia o processo de renderização.
     */
    renderStart: function() {
        while (true) {
            this.renderOnce();
        }
    },

    /**
     * Realiza o processo de renderização uma vez.
     */
    renderOnce: function() {
        console.log("Rendering");
        this.renderQueue.forEach(e => {
            e();
        });
    },

    clearQueue: function() {
        this.renderQueue = [];
    }
}