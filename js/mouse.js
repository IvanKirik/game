import {app} from "./app.js";

export class Mouse {
    constructor(element) {
        this.element = element;

        this.height = window.innerHeight;
        this.width = window.innerWidth;

        this.touchX = 0;
        this.touchY = 0;

        this.tap = false;

        this.x = 0;
        this.y = 0;
        this.left = false;
        this.pLeft = false;
        this.right = false;
        this.pRight = false;
        this.middle = false;
        this.pMiddle = false;
        this.over = false;

        this.tick = this.mouseTick.bind(this);

        this.element.addEventListener('mouseenter', this.mouseenterHandler.bind(this));
        this.element.addEventListener('mousemove', this.mousemoveHandler.bind(this));
        this.element.addEventListener('mouseleave', this.mouseleaveHandler.bind(this));
        this.element.addEventListener('mousedown', this.mousedownHandler.bind(this));
        this.element.addEventListener('mouseup', this.mouseupHandler.bind(this));
        this.element.addEventListener('touchstart', this.handleTouchStart.bind(this));

    }

    mouseTick() {
        this.pLeft = this.left;
        this.pRight = this.right;
        this.pMiddle = this.middle;
        this.tap = false;
    }

    handleTouchStart(event) {
        event.preventDefault();
        this.touch = event.touches[0];
        this.tap = event.isTrusted;

        let scaleX = app.canvas.width / this.width; // отношение ширины канваса к ширине экрана
        let scaleY = app.canvas.height / this.height; // отношение высоты канваса к высоте экрана

        this.touchX = this.touch.clientX * scaleX; // координата x на канвасе
        this.touchY = this.touch.clientY * scaleY; // координата y на канвасе

        console.log(`X: ${this.touchX}. Y: ${this.touchY}`)

    }

    mouseenterHandler(event) {
        this.over = true;
    }

    mousemoveHandler(event) {
        const rect = this.element.getBoundingClientRect();
        this.x = event.clientX - rect.left;
        this.y = event.clientY - rect.top;
    }

    mouseleaveHandler(event) {
        this.over = false;
    }

    mousedownHandler(event) {
        if (event.buttons === 1) {
            this.left = true;
        } else if (event.buttons === 4) {
            event.preventDefault();
            this.middle = true;
        } else if (event.buttons === 2) {
            this.right = true;
        }
    }

    mouseupHandler(event) {
        this.left = event.buttons === 1;
        this.middle = event.buttons === 4;
        this.right = event.buttons === 2;
    }
}
