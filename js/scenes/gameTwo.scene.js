import {SCENES} from "../constants/scenes.constants.js";
import {render} from "../render.js";

export class GameTwoScene {
    canvas = null;
    ctx = null;
    mouse = null;
    sprites = null;

    balls = null;

    startTime = null;
    delay = 1500;

    angle = 0.1;
    shadow = false;

    constructor(canvas, ctx, mouse, sprites, users, balls) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.mouse = mouse;
        this.sprites = sprites;
        this.balls = balls;

        this.data = {
            board: {
                img: sprites.board,
                x: (canvas.width - sprites.board.width) / 2,
                y: 50
            },
            text: {
                title_1: {
                    content: 'Дождитесь очереди',
                    y: 50,
                },
                title_2: {
                    content: 'Сейчас выбирает',
                    y: this.balls[0].y + sprites.ball.width + 20
                },
                title_3: {
                    content: 'Очередь',
                    y: this.balls[0].y + sprites.ball.width + 80
                },
                users: {
                    listUsers: users,
                    user1Y: this.balls[0].y + sprites.ball.width + 100,
                    user2Y: this.balls[0].y + sprites.ball.width + 120,
                    font: '18px Comic Sans MS',
                    color: '#4f3604'
                },
                font: '25px Comic Sans MS',
                color: 'white',
                color_2: '#4f3604'
            },
            titleImg: {
                img: sprites.titleImage,
                x: (canvas.width - sprites.titleImage.width) / 2,
                y: 20
            },
            fatima: {
                img: sprites.fatimaRightImg,
                x: canvas.width - sprites.fatimaRightImg.width,
                y: canvas.height - sprites.fatimaRightImg.height
            },
            fatimaTextImg: {
                img: sprites.fatimaTextRight,
                x: sprites.fatimaRightImg.width / 2 - 55,
                y: canvas.height - sprites.fatimaTextRight.height - 50
            },
            fatimaText: {
                content: ['Помоги Фатиме выбрать', 'последний ингредиент для', 'эликсира молодости'],
                content_2: ['Поздравляем!', 'Вы верно подобрали', 'последний ингредиент для', 'зелья молодости!'],
                font: '14px Comic Sans MS',
                color: '#4f3604'
            },
            boiler: {
                img: sprites.boiler,
                x: (canvas.width - sprites.boiler.width) / 2,
                y: sprites.boiler.height + 65
            },
            balls: balls
        }

        this.c = 0;
        this.c2 = 0
    }

    update() {
        if (this.mouse.tap && this.c < 1) {
            this.c2++
            this.data.balls.forEach(ball => {
                if (this.mouse.touchX > ball.x
                    && this.mouse.touchX < ball.x + this.sprites.ball.width
                    && this.mouse.touchY > ball.y
                    && this.mouse.touchY < ball.y + this.sprites.ball.width) {
                    ball.opacity = 0;
                    setInterval(() => {
                        if (ball.flower.x < (this.sprites.boiler.width / 2) + this.data.boiler.x) {
                            ball.flower.x = ball.flower.x + 1;
                        }
                        if (ball.flower.x > (this.sprites.boiler.width / 2) + this.data.boiler.x) {
                            ball.flower.x = ball.flower.x - 1;
                        }
                        if (ball.flower.y < (this.sprites.boiler.height / 2) + this.data.boiler.y) {
                            ball.flower.y = ball.flower.y + 1;
                        } else {
                            this.shadow = true;
                        }
                        if (ball.flower.y > this.data.boiler.y - 100) {
                            ball.flower.opacity -= 0.009
                            if (ball.flower.opacity < 0) {
                                ball.flower.opacity = 0;
                            }
                        }
                        if (ball.flower.y > this.data.boiler.y + 100) {
                            this.data.fatimaText.content = this.data.fatimaText.content_2;

                            setTimeout(() => {
                                if (this.c < 1) {
                                    ball.opacity = 0;
                                    render.transitionMethod(SCENES.FINAL_SCENE);
                                    this.c++
                                }
                            }, 2000)
                        }
                    }, 10)
                }
            })
        }

        if (this.mouse.left && !this.mouse.pLeft && this.c < 1) {
            this.c2++
            this.data.balls.forEach(ball => {
                if (this.mouse.x > ball.x
                    && this.mouse.x < ball.x + this.sprites.ball.width
                    && this.mouse.y > ball.y
                    && this.mouse.y < ball.y + this.sprites.ball.width) {
                    ball.opacity = 0;
                    setInterval(() => {
                        if (ball.flower.x < (this.sprites.boiler.width / 2) + this.data.boiler.x) {
                            ball.flower.x = ball.flower.x + 1;
                        }
                        if (ball.flower.x > (this.sprites.boiler.width / 2) + this.data.boiler.x) {
                            ball.flower.x = ball.flower.x - 1;
                        }
                        if (ball.flower.y < (this.sprites.boiler.height / 2) + this.data.boiler.y) {
                            ball.flower.y = ball.flower.y + 1;
                        } else {
                            this.shadow = true;
                        }
                        if (ball.flower.y > this.data.boiler.y - 100) {
                            ball.flower.opacity -= 0.009
                            if (ball.flower.opacity < 0) {
                                ball.flower.opacity = 0;
                            }
                        }
                        if (ball.flower.y > this.data.boiler.y + 100) {
                            this.data.fatimaText.content = this.data.fatimaText.content_2;

                                setTimeout(() => {
                                    if (this.c < 1) {
                                        ball.opacity = 0;
                                        render.transitionMethod(SCENES.FINAL_SCENE);
                                        this.c++
                                    }
                                }, 2000)
                        }
                    }, 10)
                }
            })
        }
    }

    render(opacity, timeStamp, transition) {
        this.ctx.save(); // сохраняем текущее состояние контекста
        this.ctx.globalAlpha = opacity;
        this.ctx.drawImage(this.data.board.img, this.data.board.x, this.data.board.y);
        this.ctx.drawImage(this.data.titleImg.img, this.data.titleImg.x, this.data.titleImg.y);
        this.ctx.drawImage(this.data.fatima.img, this.data.fatima.x, this.data.fatima.y);
        this.textFatima(this.data.fatimaText.content);
        this.ctx.drawImage(this.data.boiler.img, this.data.boiler.x, this.data.boiler.y);

        this.ctx.font = this.data.text.font;
        this.ctx.fillStyle = this.data.text.color;
        this.ctx.fillText(this.data.text.title_1.content, (this.canvas.width - this.ctx.measureText(this.data.text.title_1.content).width) / 2, this.data.text.title_1.y);
        this.ctx.fillStyle = this.data.text.color_2;
        this.ctx.fillText(this.data.text.title_2.content, (this.canvas.width - this.ctx.measureText(this.data.text.title_2.content).width) / 2, this.data.text.title_2.y);
        this.ctx.fillText(this.data.text.title_3.content, (this.canvas.width - this.ctx.measureText(this.data.text.title_3.content).width) / 2, this.data.text.title_3.y);


        this.ctx.font = this.data.text.users.font;
        this.ctx.fillStyle = this.data.text.users.color;
        this.ctx.fillText(this.data.text.users.listUsers[3].user, (this.canvas.width - this.ctx.measureText(this.data.text.users.listUsers[3].user).width) / 2, this.data.text.title_2.y + 30);
        this.ctx.fillText(`${this.data.text.users.listUsers[3].row}. ${this.data.text.users.listUsers[3].user}`, (this.canvas.width - this.ctx.measureText(this.data.text.users.listUsers[3].user).width) / 2, this.data.text.users.user1Y);
        this.ctx.fillText(`${this.data.text.users.listUsers[4].row}. ${this.data.text.users.listUsers[4].user}`, (this.canvas.width - this.ctx.measureText(this.data.text.users.listUsers[4].user).width) / 2, this.data.text.users.user2Y);


        this.data.balls.forEach(ball => {
            this.ctx.save();
            this.ctx.globalAlpha = transition ? 0 : ball.flower.opacity;
            this.ctx.drawImage(ball.flower.img, ball.flower.x, ball.flower.y);
            this.ctx.restore();
            this.ctx.save();
            this.ctx.globalAlpha = transition ? 0 : ball.flower.opacity;
            this.ctx.drawImage(ball.background, ball.x, ball.y);
            this.ctx.restore();
        });

        this.createShadow((this.canvas.width) / 2, this.data.boiler.y + 30);
        // this.ctx.restore(); // восстанавливаем предыдущее состояние контекста


    }

    textFatima(text) {
        this.ctx.drawImage(this.data.fatimaTextImg.img, this.data.fatimaTextImg.x, this.data.fatimaTextImg.y);
        this.ctx.font = this.data.fatimaText.font;
        this.ctx.fillStyle = this.data.fatimaText.color;
        let margin = 20;
        text.forEach(item => {
            this.ctx.fillText(item, this.data.fatimaTextImg.x + 20, this.data.fatimaTextImg.y + margin);
            margin += 15;
        })
    }

    createShadow(x, y) {
        if (this.shadow) {
            const width = 150;
            const height = 30;

            const blurRadius = Math.abs(Math.sin(this.angle)) * 20; // Maximum blur radius of 20
            const shadowBlur = Math.abs(Math.sin(this.angle)) * 30; // Maximum shadow blur of 30

            this.ctx.save();
            this.ctx.shadowColor = 'rgba(0,255,0,0.52)'; // Green color with transparency
            this.ctx.shadowBlur = shadowBlur;
            this.ctx.shadowOffsetX = 0;
            this.ctx.shadowOffsetY = 0;
            this.ctx.filter = `blur(${blurRadius}px)`; // Vary the blur strength based on pulse
            this.ctx.beginPath();
            this.ctx.ellipse(x, y, width / 2, height / 2, 0, 0, Math.PI * 2);
            this.ctx.fillStyle = 'rgba(0,255,0,0.28)';
            this.ctx.fill()
            this.ctx.restore();

            this.angle += 0.005;
        }
    }
}
