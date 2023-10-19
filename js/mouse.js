
export class Mouse {
    constructor(element) {
        this.element = element;
        this.rect = element.getBoundingClientRect();
        this.computedStyles = getComputedStyle(element);
        this.canvasComputedStyleWidth = parseInt(this.computedStyles.width);
        this.canvasComputedStyleHeight = parseInt(this.computedStyles.height);
        this.scaleX = this.canvasComputedStyleWidth / element.width;
        this.scaleY = this.canvasComputedStyleHeight / element.height;

        this.touchX = 0;
        this.touchY = 0;
        this.touchMove = false;
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
        this.element.addEventListener('touchmove', this.handleTouchMove.bind(this));
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

        this.touchX = (this.touch.clientX - this.rect.left) / this.scaleX;
        this.touchY = (this.touch.clientY - this.rect.top) / this.scaleY;
    }

    handleTouchMove(event) {
        this.touch = event.touches[0];
        this.touchMove = !!this.touch;
        this.touchX = (this.touch.clientX - this.rect.left) / this.scaleX;
        this.touchY = (this.touch.clientY - this.rect.top) / this.scaleY;
    }

    mouseenterHandler(event) {
        this.over = true;
    }

    mousemoveHandler(event) {
        this.x = (event.clientX - this.rect.left) / this.scaleX;
        this.y = (event.clientY - this.rect.top) / this.scaleY;
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
