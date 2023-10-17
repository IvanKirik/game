export class FinalScene {
    canvas = null;
    ctx = null;
    mouse = null;
    sprites = null;

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
                img: sprites.titleImage,
                x: (canvas.width - sprites.titleImage.width) / 2,
                y: 20
            },
            text: {
                title: {
                    content: 'Поздравляем, вы выиграли!',
                    y: 50,
                    font: '20px Comic Sans MS',
                    color: 'white',
                }
            }
        }
    }

    update() {

    }

    render(opacity, timeStamp) {

        this.ctx.save()
        this.ctx.globalAlpha = opacity;
        this.ctx.drawImage(this.data.board.img, this.data.board.x, this.data.board.y);
        this.ctx.drawImage(this.data.titleImage.img, this.data.titleImage.x, this.data.titleImage.y);

        this.ctx.font = this.data.text.title.font;
        this.ctx.fillStyle = this.data.text.title.color;
        this.ctx.fillText(this.data.text.title.content, (this.canvas.width - this.ctx.measureText(this.data.text.title.content).width) / 2, this.data.text.title.y);
    }
}
