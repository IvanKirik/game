import {SCENES} from "../constants/scenes.constants.js";
import {render} from "../render.js";

class GameTwoScene {
    canvas = null;
    ctx = null;
    mouse = null;
    sprites = null;

    balls = null;

    startTime = null;
    delay = 1500;

    angle = 0.1;
    shadow = false;

    constructor() {
        this.c = 0;
        this.c2 = 0;
        this.fatimaImgOpacity = 0;
        this.rotationAngle = 0;
        this.rotationSpeed = 1;
    }

    init(canvas, ctx, mouse, sprites, users, balls) {
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
                    content: 'انتظر دورك',
                    y: 50,
                },
                title_2: {
                    content: 'الآن  قم بتحديد المُكوّن',
                    y: this.balls[0].y + sprites.ball.width + 20
                },
                title_3: {
                    content: 'دور',
                    y: this.balls[0].y + sprites.ball.width + 80
                },
                users: {
                    listUsers: users,
                    user1Y: this.balls[0].y + sprites.ball.width + 100,
                    user2Y: this.balls[0].y + sprites.ball.width + 120,
                    font: '18px Comic Sans MS',
                    color: '#4f3604'
                },
                font: '21px Comic Sans MS',
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
                content: [`${users[3].user}, خطوة أخيرة تفصلك `, 'عن الفوز، حاولي اختيار', 'المكون المناسب لإكسير الشباب'],
                content_2: [`${users[3].user},  تهانينا لقد فزتي! `, 'لقد نجحتي في اختيار العنصر', 'الضروري لإكسير الشباب!'],
                font: '14px Comic Sans MS',
                color: '#4f3604'
            },
            boiler: {
                img: sprites.boiler,
                x: (canvas.width - sprites.boiler.width) / 2,
                y: sprites.boiler.height + 65
            },
            balls: balls,
            bubbles: [
                {
                    pointA: {
                        x: 200,
                        y: sprites.boiler.height + 65 + 30,
                    },
                    pointB: {
                        x: 200,
                        y: sprites.boiler.height + 65 + 30 - 100,
                    },
                    position: {
                        x: 200,
                        y: sprites.boiler.height + 65 + 30,
                    },
                    width: 20,
                    height: 20,
                    opacity: 1,
                    up: true,
                    positionXMax: 200 + 10,
                    positionXMin: 200 - 10
                },
                {
                    pointA: {
                        x: 170,
                        y: sprites.boiler.height + 65 + 15,
                    },
                    pointB: {
                        x: 170,
                        y: sprites.boiler.height + 65 + 30 - 100,
                    },
                    position: {
                        x: 170,
                        y: sprites.boiler.height + 65 + 15,
                    },
                    width: 10,
                    height: 10,
                    opacity: 1,
                    up: true,
                    positionXMax: 150 + 10,
                    positionXMin: 150 - 10
                },
                {
                    pointA: {
                        x: 130,
                        y: sprites.boiler.height + 65 + 19,
                    },
                    pointB: {
                        x: 130,
                        y: sprites.boiler.height + 65 + 30 - 100,
                    },
                    position: {
                        x: 130,
                        y: sprites.boiler.height + 65 + 19,
                    },
                    width: 15,
                    height: 15,
                    opacity: 1,
                    up: true,
                    positionXMax: 130 + 10,
                    positionXMin: 130 - 10
                },
            ],
            fire: {
                img: sprites.fire,
                x: (canvas.width - sprites.fire.width) / 2,
                y: 300,
                opacity: 0.2,
                up: true
            }
        }
    }

    update() {
        if (this.mouse.tap && this.c2 < 1) {
            this.c2++
            this.data.balls.forEach(ball => {
                if (this.mouse.touchX > ball.x
                    && this.mouse.touchX < ball.x + this.sprites.ball.width
                    && this.mouse.touchY > ball.y
                    && this.mouse.touchY < ball.y + this.sprites.ball.width) {
                    ball.opacity = 0;
                    ball.flower.rotation = true;
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

        if (this.mouse.left && !this.mouse.pLeft && this.c2 < 1) {
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


        //Обновление координат пузырьков
        this.data.bubbles.forEach(bubble => {
            bubble.position.y -= 0.3;
            bubble.opacity += 0.01;

            if (bubble.up) {
                bubble.position.x += 0.2;
            } else {
                bubble.position.x -= 0.2;
            }

            if (bubble.position.x > bubble.positionXMax || bubble.position.x < bubble.positionXMin) {
                bubble.up = !bubble.up;
            }

            if (bubble.position.y < bubble.pointB.y) {
                bubble.position.y = bubble.pointA.y;
                bubble.opacity = 0;
            }
        })

        //анимация огня
        if(this.data.fire.up) {
            this.data.fire.opacity += 0.02;
        } else {
            this.data.fire.opacity -= 0.02;
        }

        if (this.data.fire.opacity > 1 || this.data.fire.opacity < 0.1) {
            this.data.fire.up = !this.data.fire.up;
        }

        this.rotationAngle += this.rotationSpeed;
    }

    render(opacity, timeStamp, transition) {
        if (!this.startTime) {
            this.startTime = timeStamp;
        }
        const progress = timeStamp - this.startTime;

        this.ctx.save(); // сохраняем текущее состояние контекста
        this.ctx.globalAlpha = opacity;
        this.ctx.drawImage(this.data.board.img, this.data.board.x, this.data.board.y);
        this.ctx.drawImage(this.data.titleImg.img, this.data.titleImg.x, this.data.titleImg.y);
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

        //Цветы
        this.createFlower(transition)

        //Сферы
        this.createBalls(transition);

        //Свечение над котлом
        this.createShadow((this.canvas.width) / 2, this.data.boiler.y + 30);

        //пузыри над котлом
        this.bubbles(transition);

        if (progress > this.delay - 1000) {
            this.fatimaImg(this.fatimaImgOpacity = this.fatimaImgOpacity + 0.01, transition)
        }

        this.fire(this.data.fire.opacity, transition);
    }

    createBalls(transition) {
        this.data.balls.forEach(ball => {
            this.ctx.save();
            this.ctx.globalAlpha = transition ? 0 : ball.flower.opacity;
            this.ctx.drawImage(ball.background, ball.x, ball.y);
            this.ctx.restore();
        });
    }

    createFlower(transition) {

        this.data.balls.forEach(ball => {
            let rotationAngle = this.rotationAngle; // Угол поворота в градусах
            let centerX = ball.flower.x + ball.flower.img.width / 2; // Координаты центра изображения по оси X
            let centerY = ball.flower.y + ball.flower.img.height / 2; // Координаты центра изображения по оси Y

            this.ctx.save();
            if (ball.flower.rotation) {
                this.ctx.translate(centerX, centerY);
                this.ctx.rotate(rotationAngle * Math.PI / 180);
                this.ctx.translate(-centerX, -centerY);
            }
            this.ctx.globalAlpha = transition ? 0 : ball.flower.opacity;
            this.ctx.drawImage(ball.flower.img, ball.flower.x, ball.flower.y);
            this.ctx.restore();
        });

    }

    fatimaImg(opacity, transition) {
        this.ctx.save()
        this.ctx.globalAlpha = opacity;
        this.ctx.drawImage(this.data.fatima.img, this.data.fatima.x, this.data.fatima.y);
        this.textFatima(this.data.fatimaText.content)
        this.ctx.restore()
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

    bubbles(transition) {
        this.ctx.save();
        this.data.bubbles.forEach(bubble => {
            this.ctx.globalAlpha = transition ? 0 : bubble.opacity;
            this.ctx.drawImage(this.sprites.bubble, bubble.position.x, bubble.position.y, bubble.width, bubble.height);
        })
        this.ctx.restore();
    }

    fire(opacity, transition) {
        this.ctx.save();
        this.ctx.globalAlpha = transition ? 0 : opacity;
        this.ctx.drawImage(this.data.fire.img, this.data.fire.x, this.data.fire.y);
        this.ctx.restore()
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

export const gameTwoScene = new GameTwoScene();
