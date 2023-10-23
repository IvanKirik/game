import {app} from "../app.js";

export class ListUsersScene {
    canvas = null;
    ctx = null;
    mouse = null;
    sprites = null;

    startTime = null;
    delay = 8000;

    users = null;

    constructor() {
    }

    init(canvas, ctx, mouse, sprites, users) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.mouse = mouse;
        this.sprites = sprites;
        this.users = users;

        this.data = {
            board: {
                img: sprites.board,
                x: (canvas.width - sprites.board.width) / 2,
                y: 50
            },
            titleImage: {
                img: sprites.titleImage,
                x: (canvas.width - sprites.titleImage.width) / 2,
                y: 20
            },
            text: {
                content: 'في انتظار المشاركين',
                font: '25px Comic Sans MS',
                color: 'white',
                x: (canvas.width - ctx.measureText('في انتظار المشاركين').width) / 5,
                y: sprites.titleImage.height / 2 + 20,
            },
            usersText: {
                content: this.users,
                font: '24px Comic Sans MS',
                color: '#4f3604',
                opacity: 0.5,
                up: false
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

                    content: ['نحن بانتظار تجمُّ ', '5 مشاركين.'],
                    content_2: [' بمجرد تجمّع كل المشاركين،', ' تبدأ اللعبة'],
                    font: '14px Comic Sans MS',
                    color: '#4f3604',
                    x: 30,
                    y: 440
                }
            },
        }

        this.opacityFatima = 0;
        this.setFifeUser = false;
    }

    update(opacity, timeStamp, transition) {
        this.opacityFifeUser(transition, opacity);
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
        this.ctx.fillText(this.data.text.content, this.data.text.x, this.data.text.y);
        this.ctx.font = this.data.usersText.font;
        this.ctx.fillStyle = this.data.usersText.color;

        this.data.usersText.content.forEach((user, index) => {
            if (index < 4) {
                this.ctx.fillText(
                    `${user.row}. ${user.user}`,
                    user.x,
                    user.y
                )
                if (index === 3) {
                    this.ctx.drawImage(
                        this.sprites.star,
                        user.x + this.ctx.measureText(`${user.row}. ${user.user}`).width + 5,
                        user.y - (this.sprites.star.height / 2) + 5, 25, 25);
                }
            }
        })


        this.ctx.save();
        this.ctx.globalAlpha = this.data.usersText.opacity;
        this.ctx.fillText(
            `${this.data.usersText.content[4].row}. ${this.setFifeUser ? this.data.usersText.content[4].user : 'في انتظار مشارك واحد'}`,
            this.data.usersText.content[4].x,
            this.data.usersText.content[4].y
        );
        this.ctx.restore();

        if (progress >= this.delay) {
            this.setFifeUser = true;
            this.data.fatima.text.content = this.data.fatima.text.content_2;
        }

        if (progress > this.delay - 7000) {
            //Отрисовываем фатиму
            this.fatimaImg(this.opacityFatima = this.opacityFatima + 0.01);
            //табличка с текстом Фатимы
            this.textFatima(this.data.fatima.text.content, this.opacityFatima = this.opacityFatima + 0.01);
        }

        this.ctx.restore();

    }

    fatimaImg(opacityFatima) {
        this.ctx.save();
        this.ctx.globalAlpha = opacityFatima;
        this.ctx.drawImage(this.data.fatima.image.img, this.data.fatima.image.x, this.data.fatima.image.y);
        this.ctx.restore();
    }

    textFatima(text, opacityFatima) {
        this.ctx.save();
        this.ctx.globalAlpha = opacityFatima;
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

    opacityFifeUser(transition, opacity) {
        if (!this.setFifeUser) {
            if(this.data.usersText.up) {
                this.data.usersText.opacity += 0.02;
            } else {
                this.data.usersText.opacity -= 0.02;
            }

            if (this.data.usersText.opacity > 1 || this.data.usersText.opacity < 0.1) {
                this.data.usersText.up = !this.data.usersText.up;
            }
        } else {
            this.data.usersText.opacity = transition ? opacity : 1;
        }
    }
}

export const listUserScene = new ListUsersScene();


