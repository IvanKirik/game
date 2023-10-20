export class FinalScene {
    canvas = null;
    ctx = null;
    mouse = null;
    sprites = null;
    durationTimer = 3;

    constructor(canvas, ctx, mouse, sprites) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.mouse = mouse;
        this.sprites = sprites;

        this.data = {
            board: {
                img: sprites.board,
                x: (canvas.width - sprites.board.width) / 2,
                y: 50
            },
            titleImage: {
                img: sprites.titleImage2,
                x: (canvas.width - 308) / 2,
                y: 20,
                width: 308,
                height: 40,
            },
            text: {
                title: {
                    content: 'Поздравляем, вы выиграли!',
                    y: 50,
                    font: '20px Comic Sans MS',
                    color: 'white',
                }
            },
            time: {
                minutes: [0, 3],
                sec: [0, 0],
                count: 0,
                x: '',
                y: ''
            }
        }
    }

    update() {
        if(this.data.time.count < 1) {
            this.timer();
            this.data.time.count++
        }
    }

    render(opacity, timeStamp) {
        this.ctx.save()
        this.ctx.globalAlpha = opacity;
        this.ctx.drawImage(this.data.board.img, this.data.board.x, this.data.board.y);
        this.ctx.drawImage(this.data.titleImage.img, this.data.titleImage.x, this.data.titleImage.y, this.data.titleImage.width, this.data.titleImage.height);

        this.ctx.font = this.data.text.title.font;
        this.ctx.fillStyle = this.data.text.title.color;
        this.ctx.fillText(this.data.text.title.content, (this.canvas.width - this.ctx.measureText(this.data.text.title.content).width) / 2, this.data.text.title.y);

        this.renderTimer(50, 70, this.data.time);
    }

    renderTimer(width, height, time) {
        const widthBlock = width * 5 + 10 * 5;
        const x = (this.canvas.width - widthBlock) / 2;

        this.ctx.save();
        this.ctx.drawImage(this.sprites['number_' + time.minutes[0]], x + 25, this.data.board.y + 70, width, height);
        this.ctx.drawImage(this.sprites['number_' + time.minutes[1]], x + 25 + width, this.data.board.y + 70, width, height);
        this.ctx.drawImage(this.sprites.dots, x + 30 + width * 2, this.data.board.y + 70, width, height);
        this.ctx.drawImage(this.sprites['number_' + time.sec[0]], x + 25 + width * 3, this.data.board.y + 70, width, height);
        this.ctx.drawImage(this.sprites['number_' + time.sec[1]], x + 25 + width * 4, this.data.board.y + 70, width, height);
        this.ctx.restore()
    }

    timer() {
        let duration = this.durationTimer * 60; // Длительность таймера в секундах (в данном случае 03:00)

        let t = setInterval(() => {
            let minutes = parseInt(duration / 60, 10);
            let seconds = parseInt(duration % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            const m1 = minutes.toString().split('')[0];
            const m2 = minutes.toString().split('')[1];

            const s1 =  seconds.toString().split('')[0];
            const s2 =  seconds.toString().split('')[1];

            this.data.time.minutes = [m1, m2];
            this.data.time.sec = [s1, s2];

            if (--duration < 0) {
                clearInterval(t); // Остановка таймера по истечении времени
                // Дополнительное действие по окончании времени
            }
        }, 1000);
    }
}
