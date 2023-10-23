import {render} from "../render.js";
import {SCENES} from "../constants/scenes.constants.js";
import {configs} from "../configs.js";
import {game} from "../game.js";


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
                img: sprites.titleImage,
                x: (canvas.width - sprites.board.width) / 2 + (sprites.startScreenBoard.width - sprites.titleImage.width) / 2,
                y: (canvas.height - sprites.board.width) / 2 - 60 / 2,
            },
            text: {
                content: 'أدخل اسمك',
                font: '25px Comic Sans MS',
                color: 'white',
                x: canvas.width / 2,
                y: (canvas.height - sprites.board.width) / 2,
            },
            backgroundInput: {
                img: sprites.backgroundInput,
                x: (canvas.width - sprites.backgroundInput.width) / 2,
                y: canvas.height - sprites.board.height
            },
            button: {
                img: sprites.buttonStart,
                content: 'شارك للحصول على الهدية',
                color: 'white',
                width: 300,
                height: 40,
                x: (canvas.width - 300) / 2,
                y: canvas.height - sprites.board.height + 90,
                yButton: canvas.height - sprites.board.height + 60
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
                    content: ['جرب حظك،', `ربما ستحصل على ${configs.product}`],
                    font: '20px Comic Sans MS',
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
        if (this.mouse.left && !this.mouse.pLeft) {
            this.events('mouse')
        }

        if (this.mouse.tap) {
            this.events('touch')
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
        this.ctx.drawImage(this.data.titleImage.img, this.data.titleImage.x, this.data.titleImage.y);
        this.ctx.font = this.data.text.font;
        this.ctx.fillStyle = this.data.text.color;
        this.ctx.textAlign = 'center';
        this.ctx.fillText(this.data.text.content,this.data.text.x, this.data.text.y);
        this.ctx.drawImage(this.data.backgroundInput.img, this.data.backgroundInput.x, this.data.backgroundInput.y);
        this.ctx.fillStyle = this.data.button.color;

        this.button();

        this.ctx.restore();

        if (progress > this.delay) {
            //Отрисовываем фатиму
            this.fatimaImg(this.opacityFatima = this.opacityFatima + 0.01, transition);
            //табличка с текстом Фатимы
            this.textFatima(this.data.fatima.text.content, this.opacityFatima = this.opacityFatima + 0.01, transition);
        }
    }

    button() {
        this.ctx.save();
        this.ctx.drawImage(
            this.data.button.img,
            this.data.button.x,
            this.data.button.yButton,
            this.data.button.width,
            this.data.button.height)
        this.ctx.fillText(this.data.button.content, this.canvas.width / 2, this.data.button.y);
        this.ctx.restore();
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
        this.ctx.textAlign = 'right';
        let margin = 20;
        text.forEach(item => {
            this.ctx.fillText(item, this.data.fatima.textImg.x + this.data.fatima.textImg.img.width - 20, this.data.fatima.textImg.y + margin);
            margin += 15;
        });
        this.ctx.restore();
    }

    events(typeEvent) {
        let x = typeEvent === 'mouse' ? 'x' : 'touchX';
        let y = typeEvent === 'mouse' ? 'y' : 'touchY';

        if (this.mouse[x] > this.data.button.x
            && this.mouse[x] < this.data.button.x + 300
            && this.mouse[y] > this.data.button.y - 30
            && this.mouse[y] < this.data.button.y + 30) {
            if(this.input.value.trim()) {
                game.updateUserList(this.input.value);
                render.transitionMethod(SCENES.LIST_USERS)
            }
        }
    }

}
