import { Rectangle } from "./Rectangle.js"

export class Square extends Rectangle {
    constructor(x1, y1, sideLength) {
        super(x1, y1, x1 + sideLength, y1 + sideLength);
    }
}