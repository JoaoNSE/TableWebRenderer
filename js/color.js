class Color {
    constructor (r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;
    }

    convTo255() {
        this.r *= 255;
        this.g *= 255;
        this.b *= 255;
    }

    add(n) {
        this.r += n;
        this.g += n;
        this.b += n;
    }

    sub(n) {
        this.r -= n;
        this.g -= n;
        this.b -= n;
    }
}