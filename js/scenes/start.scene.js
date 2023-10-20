import {listUserScene} from "./listUsers.scene.js";
import {render} from "../render.js";
import {SCENES} from "../constants/scenes.constants.js";
import {configs} from "../configs.js";
import {app} from "../app.js";

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

        this.data = {
            board: {
                img: sprites.startScreenBoard,
                x: (canvas.width - sprites.board.width) / 2,
                y: (canvas.height - sprites.board.width) / 2,
            },
            titleImage: {
                img: sprites.titleImage2,
                width: 308,
                height: 40,
                x: (canvas.width - sprites.board.width) / 2 + (sprites.startScreenBoard.width - 308) / 2,
                y: (canvas.height - sprites.board.width) / 2 - 60 / 2,
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
                content: 'Участвовать в Розыгрыше',
                color: '#4f3604',
                y: canvas.height - sprites.board.height + 90
            },
            fatima: {
                image: {
                    img: sprites.fatimaImg,
                    x: 0,
                    y: canvas.height - sprites.fatimaImg.height,
                },
                textImg: {
                    img: sprites.fatimaTextImg,
                    x: 100,
                    y: 600
                },
                text: {
                    content: ['Испытай удачу,', `возможно ${configs.product} достанется`, 'тебе'],
                    font: '14px Comic Sans MS',
                    color: '#4f3604',
                    x: 30,
                    y: 440
                }
            },
        }

        this.opacityFatima = 0;
        this.delay = 1000;
    }

    update() {
        const buttonX = (this.canvas.width - 300) / 2;
        if (this.mouse.left && !this.mouse.pLeft) {
            if (this.mouse.x > buttonX
                && this.mouse.x < buttonX + 300
                && this.mouse.y > this.data.button.y - 30
                && this.mouse.y < this.data.button.y + 30) {
                if(this.input.value.trim()) {
                    app.updateUserList(this.input.value);
                    render.transitionMethod(SCENES.GAME_ONE)
                }
            }
        }

        if (this.mouse.tap) {
            if (this.mouse.touchX > buttonX
                && this.mouse.touchX < buttonX + 143
                && this.mouse.touchY > this.data.button.y - 30
                && this.mouse.touchY < this.data.button.y + 30) {
                if(this.input.value.trim()) {
                    app.updateUserList(this.input.value);
                    render.transitionMethod(SCENES.LIST_USERS)
                }
            }
        }
    }

    render(opacity, timeStamp, transition) {
        if (!this.startTime) {
            this.startTime = timeStamp;
        }

        const progress = timeStamp - this.startTime;

        this.ctx.save();
        this.ctx.globalAlpha = opacity;
        this.ctx.drawImage(this.data.board.img, this.data.board.x, this.data.board.y);
        this.ctx.drawImage(this.data.titleImage.img, this.data.titleImage.x, this.data.titleImage.y, this.data.titleImage.width, this.data.titleImage.height);
        this.ctx.font = this.data.text.font;
        this.ctx.fillStyle = this.data.text.color;
        this.ctx.fillText(this.data.text.content,this.data.text.x, this.data.text.y);
        this.ctx.drawImage(this.data.backgroundInput.img, this.data.backgroundInput.x, this.data.backgroundInput.y);
        this.ctx.fillStyle = this.data.button.color;
        this.ctx.fillText(this.data.button.content, (this.canvas.width - this.ctx.measureText(this.data.button.content).width) / 2, this.data.button.y);
        this.ctx.restore();

        if (progress > this.delay) {
            //Отрисовываем фатиму
            this.fatimaImg(this.opacityFatima = this.opacityFatima + 0.01, transition);
            //табличка с текстом Фатимы
            this.textFatima(this.data.fatima.text.content, this.opacityFatima = this.opacityFatima + 0.01, transition);
        }
    }

    fatimaImg(opacityFatima, transition) {
        this.ctx.save();
        this.ctx.globalAlpha = transition ? 0 : opacityFatima;
        this.ctx.drawImage(this.data.fatima.image.img, this.data.fatima.image.x, this.data.fatima.image.y);
        this.ctx.restore();
    }

    textFatima(text, opacityFatima, transition) {
        this.ctx.save();
        this.ctx.globalAlpha = transition ? 0 : opacityFatima;
        this.ctx.drawImage(this.data.fatima.textImg.img, this.data.fatima.textImg.x, this.data.fatima.textImg.y);
        this.ctx.font = this.data.fatima.text.font;
        this.ctx.fillStyle = this.data.fatima.text.color;
        let margin = 20;
        text.forEach(item => {
            this.ctx.fillText(item, this.data.fatima.textImg.x + 20, this.data.fatima.textImg.y + margin);
            margin += 15;
        });
        this.ctx.restore();
    }

}
