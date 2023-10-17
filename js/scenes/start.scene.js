import {listUserScene} from "./listUsers.scene.js";

export class StartScene {

    canvas = null;
    ctx = null;
    mouse = null;
    sprites = null;

    constructor(canvas, ctx, mouse, sprites, input) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.mouse = mouse;
        this.sprites = sprites;

        this.input = input;

        this.buttonStart = document.getElementById('startScene');

        this.data = {
            board: {
                img: sprites.startScreenBoard,
                x: (canvas.width - sprites.board.width) / 2,
                y: (canvas.height - sprites.board.width) / 2,
            },
            titleImage: {
                img: sprites.titleImage,
                x: (canvas.width - sprites.board.width) / 2 + (sprites.startScreenBoard.width - sprites.titleImage.width) / 2,
                y: (canvas.height - sprites.board.width) / 2 - sprites.titleImage.height / 2,
            },
            text: {
                content: 'Введите ваше имя',
                font: '25px Comic Sans MS',
                color: 'white',
                x: (canvas.width - ctx.measureText('Введите ваше имя').width) / 4,
                y: (canvas.height - sprites.board.width) / 2,
            },
            backgroundInput: {
                img: sprites.backgroundInput,
                x: (canvas.width - sprites.backgroundInput.width) / 2,
                y: canvas.height - sprites.board.height
            },
            button: {
                content: 'Начать игру',
                color: '#4f3604',
                y: canvas.height - sprites.board.height + 90
            }
        }
    }

    update() {
        const buttonX = (this.canvas.width - 143) / 2;
        if (this.mouse.left && !this.mouse.pLeft) {
            if (this.mouse.x > buttonX
                && this.mouse.x < buttonX + 143
                && this.mouse.y > this.data.button.y - 30
                && this.mouse.y < this.data.button.y + 30) {
                listUserScene.setUser(this.input.value);
                this.buttonStart.click();
            }
        }
    }

    render(opacity) {
        this.ctx.save();
        this.ctx.globalAlpha = opacity;
        this.ctx.drawImage(this.data.board.img, this.data.board.x, this.data.board.y);
        this.ctx.drawImage(this.data.titleImage.img, this.data.titleImage.x, this.data.titleImage.y);
        this.ctx.font = this.data.text.font;
        this.ctx.fillStyle = this.data.text.color;
        this.ctx.fillText(this.data.text.content,this.data.text.x, this.data.text.y);
        this.ctx.drawImage(this.data.backgroundInput.img, this.data.backgroundInput.x, this.data.backgroundInput.y);
        this.ctx.fillStyle = this.data.button.color;
        this.ctx.fillText(this.data.button.content, (this.canvas.width - this.ctx.measureText('Начать игру').width) / 2, this.data.button.y);
        this.ctx.restore();
    }
}
