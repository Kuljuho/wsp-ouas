import { Shape } from "./Shape.js"

export class Rectangle extends Shape {

    constructor(x1, y1, x2, y2) {
        super(x1, y1);
        this.x2 = x2;
        this.y2 = y2;
    }

    draw(ctx) {
        const width = (this.x2 - this._x) / 1000;
        const height = (this.y2 - this._y) / 1000;

        ctx.beginPath();
        ctx.rect(this._x, this._y, width, height);
        ctx.lineWidth = this._lineWidth;
        ctx.strokeStyle = this._color; 
        ctx.stroke();
    }
}