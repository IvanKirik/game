import {render} from "../render.js";
import {SCENES} from "../constants/scenes.constants.js";

export class GameOneScene {
    canvas = null;
    ctx = null;
    mouse = null;
    sprites = null;

    cells = null;

    startTime = null;
    delay = 1900;

    constructor(canvas, ctx, mouse, sprites, users, cells) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.mouse = mouse;
        this.sprites = sprites;
        this.cells = cells;

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
                title: {
                    content: 'Дождитесь очереди',
                    y: 50
                },
                title_2: {
                    content: 'Сейчас выбирает горшок',
                    y: this.cells[this.cells.length - 1].y + sprites.cell.height + 20
                },
                title_3: {
                    content: 'Очередь',
                    y: this.cells[this.cells.length - 1].y + sprites.cell.height + 80
                },
                font: '25px Comic Sans MS',
                color: 'white',
                color_2: '#4f3604'
            },
            users: {
                listUsers: users,
                font: '18px Comic Sans MS',
                color: '#4f3604'
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
                    content: ['В одном из этих горшков', 'лежит волшебная трава', 'для элексира молодости.', 'Помогите Фатиме выбрать', 'правильный!'],
                    content_2: ['Отлично!', 'Вы выбрали правильный', 'горшок!', 'Дождитесь конца хода', 'всех участников'],
                    font: '14px Comic Sans MS',
                    color: '#4f3604',
                    x: 30,
                    y: 440
                }
            },
            cells: this.cells,
            hammer: {
                img: sprites.hammer,
                x: 0,
                y: 0
            },
        }
        this.currentUserName = this.data.users.listUsers[0].user;

        this.userOne = false;
        this.userTwo = false;
        this.userThree = false;
        this.user = false;
        this.userEnd = false;


        this.cellsIndexes = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        this.cellsCheck = [2, 4, 5];

        this.angle = 0.1;

        this.opacityFatima = 0;

        this.hammerCount = 0;
    }

    update() {
        //Обрабатываем клики по вазам
        if(this.mouse.tap && !this.user && this.userOne && this.userTwo && this.userThree && !this.userEnd) {
            this.data.hammer.x = this.mouse.touchX;
            this.data.hammer.y = this.mouse.touchY;
            this.data.cells.forEach((cell, index) => {
                if (this.mouse.touchX > cell.x
                    && this.mouse.touchX < cell.x + this.sprites.cell.width
                    && this.mouse.touchY > cell.y
                    && this.mouse.touchY < cell.y + this.sprites.cell.width) {
                    if (index !== 2 && index !== 4 && index !== 5) {
                        this.cellsCheck.push(index);
                        cell.background = this.sprites.goldCell;
                        const vase = `vase_drop_green_${cell.id}`
                        cell.vase = this.sprites[vase];
                        this.data.cells[index].grass = true;
                        // this.ctx.drawImage(this.sprites.grass, (this.sprites.cell.width - this.sprites.grass.width) / 2, (this.sprites.cell.height - this.sprites.grass.height) / 2);
                        this.user = true;
                        setTimeout(() => {
                            this.currentUserName = this.data.users.listUsers[4].user;
                            this.data.fatima.text.content = this.data.fatima.text.content_2;
                            if(!this.userEnd && this.user) {
                                this.gameEndBot(3000, this.random(this.cellsIndexes, this.cellsCheck), 4);
                            }
                        }, 500)
                    }
                }
            })
        }

        if (this.mouse.left && !this.mouse.pLeft && !this.user && this.userOne && this.userTwo && this.userThree && !this.userEnd) {
            this.data.cells.forEach((cell, index) => {
                if (this.mouse.x > cell.x
                    && this.mouse.x < cell.x + this.sprites.cell.width
                    && this.mouse.y > cell.y
                    && this.mouse.y < cell.y + this.sprites.cell.width) {
                    if (index !== 2 && index !== 4 && index !== 5) {
                        this.cellsCheck.push(index);
                        cell.background = this.sprites.goldCell;
                        const vase = `vase_drop_green_${cell.id}`
                        cell.vase = this.sprites[vase];
                        this.data.cells[index].grass = true;
                        // this.ctx.drawImage(this.sprites.grass, (this.sprites.cell.width - this.sprites.grass.width) / 2, (this.sprites.cell.height - this.sprites.grass.height) / 2);
                        this.user = true;
                        setTimeout(() => {
                            this.currentUserName = this.data.users.listUsers[4].user;
                            this.data.fatima.text.content = this.data.fatima.text.content_2;

                            if(!this.userEnd && this.user) {
                                this.gameEndBot(3000, this.random(this.cellsIndexes, this.cellsCheck), 4);
                            }
                        }, 500)
                    }
                }
            })
        }

        //если курсор над canvas, то молоточек движется за ним
        if (this.mouse.over && !this.user && this.userOne && this.userTwo && this.userThree && !this.userEnd) {
            this.data.hammer.x = this.mouse.x;
            this.data.hammer.y = this.mouse.y;
        }

        if (this.mouse.touchMove && !this.user && this.userOne && this.userTwo && this.userThree && !this.userEnd) {
            this.data.hammer.x = this.mouse.touchX;
            this.data.hammer.y = this.mouse.touchY;
        }

        //движение молоточка при клике
        if (this.mouse.tap && !this.user && this.userOne && this.userTwo && this.userThree && !this.userEnd) {
            this.data.hammer.img = this.sprites.hammer_2
            setTimeout(() => {
                this.data.hammer.img = this.sprites.hammer
            }, 300)
        }

        //описывает логику игры ботами
        if (!this.userOne && !this.userTwo) {
            this.gameOneBot(3000, 2, 0);
        }

        if (!this.userTwo && this.userOne) {
            this.gameTwoBot(3000, 4, 1);
        }

        if(!this.userThree && this.userTwo) {
            this.gameThreeBot(3000, 5, 2);
        }
    }

    render(opacity, timeStamp) {
        if (!this.startTime) {
            this.startTime = timeStamp;
        }
        const progress = timeStamp - this.startTime;

        this.ctx.save(); // сохраняем текущее состояние контекста
        this.ctx.globalAlpha = opacity;
        this.ctx.drawImage(this.data.board.img, this.data.board.x, this.data.board.y);
        this.ctx.drawImage(this.data.titleImage.img, this.data.titleImage.x, this.data.titleImage.y);

        //Заголовок
        this.ctx.font = this.data.text.font;
        this.ctx.fillStyle = this.data.text.color;
        this.ctx.fillText(this.data.text.title.content, (this.canvas.width - this.ctx.measureText(this.data.text.title.content).width) / 2, this.data.text.title.y);

        //Меняем цвет, отрисовываем остальные заголовки
        this.ctx.fillStyle = this.data.text.color_2;
        this.ctx.fillText(this.data.text.title_2.content, (this.canvas.width - this.ctx.measureText(this.data.text.title_2.content).width) / 2, this.data.text.title_2.y);
        this.ctx.fillText(this.data.text.title_3.content, (this.canvas.width - this.ctx.measureText(this.data.text.title_3.content).width) / 2, this.data.text.title_3.y);

        //Отрисовываем имена игроков
        this.ctx.font = this.data.users.font;
        this.ctx.fillStyle = this.data.users.color;
        this.data.users.listUsers.forEach((user, index) => {
            let margin = 20;
            let userName = `${user.row}. ${user.user}`;
            this.ctx.fillText(
                userName,
                (this.canvas.width - this.ctx.measureText(userName).width) / 2,
                this.cells[this.cells.length - 1].y + this.sprites.cell.height + 80 + user.row * margin);
            if (user.game) {
                this.setSandToUser(this.sprites.sandImage, (this.canvas.width - this.ctx.measureText(userName).width) / 2 - this.sprites.sandImage.width / 6, this.cells[this.cells.length - 1].y + this.sprites.cell.height + 65 + user.row * margin)
            }
        })

        //Текущий юзер
        this.currentUser(this.currentUserName, (this.canvas.width - this.ctx.measureText(this.currentUserName).width) / 2, this.data.text.title_2.y + 30);

        if (progress > this.delay - 1000) {
            //Отрисовываем фатиму
            this.fatimaImg(this.opacityFatima = this.opacityFatima + 0.01);
            //табличка с текстом Фатимы
            this.textFatima(this.data.fatima.text.content, this.opacityFatima = this.opacityFatima + 0.01);
        }

        //Отрисовываем кувшины
        this.data.cells.forEach(cell => {
            this.ctx.drawImage(cell.background, cell.x, cell.y);
            this.ctx.drawImage(
                cell.vase,
                ((this.sprites.cell.width - cell.vase.width) / 2) + cell.x,
                ((this.sprites.cell.height - cell.vase.height) / 2) + cell.y);
            if(cell.grass) {
                this.glowVase(( (this.sprites.cell.width - cell.vase.width) / 2) + cell.x + 35,((this.sprites.cell.height - cell.vase.height) / 2) + cell.y + 50, true);
            }
        })
        this.setHammer(this.data.hammer.img, this.data.hammer.x, this.data.hammer.y);
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

    gameOneBot(delay, number, user) {
        setTimeout(() => {
            this.transHammer(number);
            if (this.check(number)) {
                setTimeout(() => {
                    if (this.hammerCount === 0) {
                        this.data.hammer.img = this.sprites.hammer_2
                        this.hammerCount++
                        setTimeout(() => {
                            this.data.hammer.img = this.sprites.hammer
                        }, 300)
                    }
                    this.cells[number].background = this.sprites.redCell;
                    const vase = `vase_drop_${this.cells[number].id}`
                    this.cells[number].vase = this.sprites[vase];
                    this.ctx.drawImage(this.sprites.grass, (this.sprites.cell.width - this.sprites.grass.width) / 2, (this.sprites.cell.height - this.sprites.grass.height) / 2)

                    setTimeout(() => {
                        this.data.users.listUsers[user].game = true;
                        if (this.data.users.listUsers[user].currentUser) {
                            this.data.users.listUsers[user].currentUser = false;
                        }
                        this.data.users.listUsers[user + 1].currentUser = true;
                        this.currentUserName = this.data.users.listUsers[user + 1].user;

                        this.userOne = true;
                    }, 1000);
                }, 1500);
            }
        }, delay)
    }

    gameTwoBot(delay, number, user) {
        setTimeout(() => {
            this.transHammer(number);
            if (this.check(number)) {
                setTimeout(() => {
                    if (this.hammerCount === 1) {
                        this.data.hammer.img = this.sprites.hammer_2;
                        this.hammerCount++;
                        setTimeout(() => {
                            this.data.hammer.img = this.sprites.hammer;
                        }, 300)
                    }
                    this.cells[number].background = this.sprites.redCell;
                    const vase = `vase_drop_${this.cells[number].id}`
                    this.cells[number].vase = this.sprites[vase];
                    this.ctx.drawImage(this.sprites.grass, (this.sprites.cell.width - this.sprites.grass.width) / 2, (this.sprites.cell.height - this.sprites.grass.height) / 2)

                    setTimeout(() => {
                        this.data.users.listUsers[user].game = true;
                        if (this.data.users.listUsers[user].currentUser) {
                            this.data.users.listUsers[user].currentUser = false;
                        }
                        this.data.users.listUsers[user + 1].currentUser = true;
                        this.currentUserName = this.data.users.listUsers[user + 1].user;
                        this.userTwo = true;
                    }, 1000)
                }, 1500)
            }
        }, delay)
    }

    gameThreeBot(delay, number, user) {
        setTimeout(() => {
            this.transHammer(number);
            if (this.check(number)) {
                setTimeout(() => {
                    if (this.hammerCount === 2) {
                        this.data.hammer.img = this.sprites.hammer_2
                        this.hammerCount++
                        setTimeout(() => {
                            this.data.hammer.img = this.sprites.hammer
                        }, 300)
                    }
                    this.cells[number].background = this.sprites.redCell;
                    const vase = `vase_drop_${this.cells[number].id}`
                    this.cells[number].vase = this.sprites[vase];
                    this.ctx.drawImage(this.sprites.grass, (this.sprites.cell.width - this.sprites.grass.width) / 2, (this.sprites.cell.height - this.sprites.grass.height) / 2)
                    setTimeout(() => {
                        this.data.users.listUsers[user].game = true;
                        if (this.data.users.listUsers[user].currentUser) {
                            this.data.users.listUsers[user].currentUser = false;
                        }
                        this.data.users.listUsers[user + 1].currentUser = true;
                        this.currentUserName = this.data.users.listUsers[user + 1].user;
                        this.userThree = true;
                    }, 1000)
                }, 1500)
            }
        }, delay)
    }

    gameEndBot(delay, number, user) {
        setTimeout(() => {
            this.transHammer(number);
            if (this.check(number)) {
                setTimeout(() => {
                    if (this.hammerCount === 3) {
                        this.data.hammer.img = this.sprites.hammer_2
                        this.hammerCount++
                        setTimeout(() => {
                            this.data.hammer.img = this.sprites.hammer
                        }, 300)
                    }
                    this.cells[number].background = this.sprites.goldCell;
                    const vase = `vase_drop_green_${this.cells[number].id}`
                    this.cells[number].vase = this.sprites[vase];
                    this.cells[number].grass = true;
                    // this.ctx.drawImage(this.sprites.grass, (this.sprites.cell.width - this.sprites.grass.width) / 2, (this.sprites.cell.height - this.sprites.grass.height) / 2)
                    setTimeout(() => {
                        render.transitionMethod(SCENES.GAME_TWO);
                    }, 1000)
                }, 1500)
            }
        }, delay)
    }

    random(arrDefault, arrCheck) {
        const numbersInArr2 = new Set(arrCheck);
        let randomNum;
        do {
            randomNum = arrDefault[Math.floor(Math.random() * arrDefault.length)];
        } while (numbersInArr2.has(randomNum));
        return randomNum;
    }

    check(numberCell) {
        return this.data.hammer.x > this.cells[numberCell].x
            && this.data.hammer.x < this.cells[numberCell].x + this.cells[numberCell].vase.width
            && this.data.hammer.y > this.cells[numberCell].y
            && this.data.hammer.y < this.cells[numberCell].y + this.cells[numberCell].vase.height
    }

    transHammer(numberCell) {
        this.data.hammer.x = this.cells[numberCell].x + 40;
        this.data.hammer.y = this.cells[numberCell].y + 40;
    }

    setHammer(sprites, x, y) {
        this.ctx.save();
        this.ctx.drawImage(sprites, x - sprites.width / 2, y - sprites.height / 2);
        this.ctx.restore()
    }

    currentUser(user, x, y) {
        this.ctx.fillText(user, x, y);
    }

    setSandToUser(img, x, y) {
        this.ctx.drawImage(img, x, y);
    }

    glowVase(x, y, shadow) {
        if (shadow) {
            const width = 50;
            const height = 50;

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

            this.angle += 0.0005;
        }
    }
}
