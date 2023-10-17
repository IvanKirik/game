export class Mouse {
    constructor(element) {
        this.element = element;

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
    }

    mouseTick() {
        this.pLeft = this.left;
        this.pRight = this.right;
        this.pMiddle = this.middle;
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
