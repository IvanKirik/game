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
                content: 'Ожидание участников',
                font: '25px Comic Sans MS',
                color: 'white',
                x: (canvas.width - ctx.measureText('Ожидание участников').width) / 5,
                y: sprites.titleImage.height / 2 + 20,
            },
            usersText: {
                content: this.users,
                font: '24px Comic Sans MS',
                color: '#4f3604'
            }
        }
    }

    update() {

    }

    render(opacity, timeStamp) {
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
        this.data.usersText.content.forEach((user, index)=> {
            if (index < 4) {
                this.ctx.fillText(
                    `${user.row}. ${user.user}`,
                    user.x,
                    user.y
                )
            }
        })
        if (progress >= this.delay) {
            this.ctx.fillText(
                `${this.data.usersText.content[4].row}. ${this.data.usersText.content[4].user}`,
                this.data.usersText.content[4].x,
                this.data.usersText.content[4].y
            )
        }
        this.ctx.restore();
    }

    setUser(user) {
        this.users[3].user = user;
    }
}

export const listUserScene = new ListUsersScene();


