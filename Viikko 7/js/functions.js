import { Circle } from "./class/Circle.js";
import { Line } from "./class/Line.js";
import { Rectangle } from "./class/Rectangle.js";
import { Square } from "./class/Square.js";

const canvas = document.querySelector('canvas');
const color_input = document.querySelector('#color');
const ctx = canvas.getContext('2d');
const x_input = document.querySelector('#x');
const y_input = document.querySelector('#y');
const draw_button = document.querySelector('button');
const radio_form = document.querySelector('form');
const line_width_input_value = document.querySelector('input[type=number]');


const updateUI = (label3,label4) => {
    document.querySelector('div#third label').innerHTML = label3;

    if (label4 !== undefined) {
        document.querySelector('div#fourth label').innerHTML = label4;
        document.querySelector('div#fourth label').style.display = "inline block";
        document.querySelector('div#fourth input').style.display = "inline block";
    } else {
        document.querySelector('div#fourth label').style.display = "none";
        document.querySelector('div#fourth input').style.display = "none";
    }
}

draw_button.addEventListener('click', () => {
    const shape = radio_form['shape'].value;
    switch (shape) {
        case 'line':
            updateUI('x2', 'y2');
            drawLine();
            break;
        case 'circle':
            updateUI('width:');
            drawCircle();
            break;
        case 'rectangle':
            updateUI('width:', 'height:');
            drawRectangle();
            break;
        case 'square':
            updateUI('width:');
            drawSquare();
            break;
    }
});

const drawCircle = () => {
    const x = x_input.value;
    const y = y_input.value;
    const lineWidth = parseInt(line_width_input_value.value); 
    const width = document.querySelector('div#third input').value;
    const circle = new Circle(x,y,width/2);
    const color = color_input.value;
    circle.lineWidth = lineWidth;
    circle.setStroke = color;
    circle.draw(ctx);
}

const drawLine = () => {
    const x1 = x_input.value;
    const y1 = y_input.value;
    const x2 = parseInt(document.querySelector('div#third input').value);
    const y2 = parseInt(document.querySelector('div#fourth input').value);
    const lineWidth = parseInt(line_width_input_value.value);
    const color = color_input.value;
    const line = new Line(x1,y1,x2,y2);
    line.lineWidth = lineWidth;
    line.setStroke = color;
    line.draw(ctx);
}

const drawRectangle = () => {
    const x1 = x_input.value;
    const y1 = y_input.value;
    const width = parseInt(document.querySelector('div#third input').value);
    const height = parseInt(document.querySelector('div#fourth input').value);
    const lineWidth = parseInt(line_width_input_value.value);
    const color = color_input.value;
    const rectangle = new Rectangle(x1, y1, x1 + width, y1 + height);
    rectangle.lineWidth = lineWidth;
    rectangle.setStroke = color;
    rectangle.draw(ctx);
}

const drawSquare = () => {
    const x1 = parseInt(x_input.value);
    const y1 = parseInt(y_input.value);
    const sideLength = parseInt(document.querySelector('div#third input').value);
    const color = color_input.value;
    const lineWidth = parseInt(line_width_input_value.value); 
    const square = new Square(x1, y1, sideLength);
    square.lineWidth = lineWidth;
    square.setStroke = color;
    square.draw(ctx);
}