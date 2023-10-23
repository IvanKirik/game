import {configs} from "../configs.js";

class FinalScene {
    canvas = null;
    ctx = null;
    mouse = null;
    sprites = null;
    users = null;
    durationTimer = 3;

    constructor(canvas, ctx, mouse, sprites) {

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
                title: {
                    content: 'تهانينا، لقد فزتي!',
                    y: 50,
                    font: '20px Comic Sans MS',
                    color: 'white',
                },
                font: '16px Comic Sans MS',
                color: 'green',
                content_1: [`تم حجز ${configs.product} لك على:`],
                content_2: [`${this.users[3].user}, أنت محظوظة حقًا`, 'بفوزك على أربعة', 'مشاركين في السحب.'],
                content_3: [`لقد مكنكِ فوزكِ من شراء`, `${configs.product} اليوم. أدخلي رقم هاتفك،`, 'وسيقوم موظف الهاتف لدينا بالاتصال بك'],
                contentTimerEnd: [' انتهى حجز الوقت الخاص بك،', 'ولكن قبل بدء السحب التالي،', `لا يزال لديك الفرصة لطلب ${configs.product}.`, 'لا تفوتي الفرصة، واطلبيه الآن.']
            },
            time: {
                minutes: [0, 3],
                sec: [0, 0],
                count: 0,
                x: '',
                y: ''
            },
            button: {
                font: '20px Comic Sans MS',
                color: 'white',
                text: ' اطلبيه الآن',
                img: sprites.button,
                x: (canvas.width - sprites.button.width) / 2,
                y: 470
            }
        }

        this.timerEnd = false;
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
        this.createTitle();
        this.createButton();
        this.renderText();
        this.renderTimer(50, 70, this.data.time);
    }

    createTitle() {
        const x = this.canvas.width / 2;
        this.ctx.drawImage(this.data.titleImage.img, this.data.titleImage.x, this.data.titleImage.y);
        this.ctx.font = this.data.text.title.font;
        this.ctx.fillStyle = this.data.text.title.color;
        this.ctx.textAlign = 'center';
        this.ctx.fillText(this.data.text.title.content, x, this.data.text.title.y);
    }

    createButton() {
        const x = this.canvas.width / 2;
        this.ctx.drawImage(this.data.button.img, this.data.button.x, this.data.button.y);
        this.ctx.font = this.data.button.font;
        this.ctx.fillStyle = this.data.button.color;
        this.ctx.textAlign = 'center';
        this.ctx.fillText(this.data.button.text, x, this.data.button.y + 30)
    }

    renderText() {
        const x = this.canvas.width / 2;
        this.ctx.font = this.data.text.font;
        this.ctx.fillStyle = this.data.text.color;
        this.ctx.textAlign = 'center';
        this.ctx.fillText(this.data.text.content_1, x, this.data.text.title.y + 40);
        let margin = 20;
        this.data.text.content_2.forEach(item => {
            this.ctx.fillText(item, x, this.data.text.title.y + 150 + margin);
            margin += 15;
        });

        if(!this.timerEnd) {
            this.data.text.content_3.forEach(item => {
                this.ctx.fillText(item, x, this.data.text.title.y + 190 + margin);
                margin += 15;
            });
        } else {
            this.data.text.contentTimerEnd.forEach(item => {
                this.ctx.fillText(item, x, this.data.text.title.y + 190 + margin);
                margin += 15;
            });
        }

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
                this.timerEnd = true;
            }
        }, 1000);
    }
}

export const finalScene = new FinalScene();
