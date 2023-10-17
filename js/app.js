import {Animation} from "./animations.js";
import {render} from "./render.js";
import {Router} from "./router.js";
import {Mouse} from "./mouse.js";
import {IMAGES} from "./constants/images.constant.js";
import {listUserScene} from "./scenes/listUsers.scene.js";
import {GameOneScene} from "./scenes/gameOne.scene.js";
import {GameTwoScene} from "./scenes/gameTwo.scene.js";
import {StartScene} from "./scenes/start.scene.js";
import {FinalScene} from "./scenes/final.scene.js";

export class App {

    canvas = null;
    ctx = null;
    mouse = null;
    sprites = null;

    input = null;

    listUsers = ['Махмуд', 'Мехмед', 'Ашот', '', 'Арафат'];
    users = null;
    cells = null;
    balls = null;

    get context() {
        return this.ctx;
    }

    get canvas() {
        return this.canvas;
    }

    constructor() {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.mouse = new Mouse(this.canvas);
    }

    start() {
        this.preload(() => {
            this.init()
        }, IMAGES);
    }

    preload(callback, images) {
        let loaded = 0;
        let required = Object.keys(images).length;
        let onAssetLoad = () => {
            ++loaded;
            if (loaded >= required) {
                callback();
            }
        }
        for (let key in images) {
            images[key] = new Image();
            images[key].src = `./images/${key}.png`;
            images[key].addEventListener('load', onAssetLoad);
        }
        this.sprites = images;
    }

    init() {
        this.input = document.getElementById('input-name');
        this.users = this.createListUsers(this.listUsers, this.canvas.width, this.canvas.height, this.sprites);
        this.cells = this.createCells(this.sprites, this.canvas.width, this.canvas.height);
        this.balls = this.createBalls(this.sprites, this.canvas.width, this.canvas.height);

        listUserScene.init(this.canvas, this.ctx, this.mouse, this.sprites, this.users, this.listUsers);
        render.init(this.ctx, this.canvas, this.mouse, this.sprites, this.input,
            new Router(
                new StartScene(this.canvas, this.ctx, this.mouse, this.sprites, this.input),
                listUserScene,
                new GameOneScene(this.canvas, this.ctx, this.mouse, this.sprites, this.users, this.cells),
                new GameTwoScene(this.canvas, this.ctx, this.mouse, this.sprites, this.users, this.balls),
                new FinalScene(this.canvas, this.ctx, this.mouse, this.sprites)
            ))

        const animation = new Animation(render);
        animation.start();
    }

    createListUsers(listUsers, width, height, sprites) {
        const size = 5;
        const lineHeight = 60;
        let startY = 80;
        const startX = (width - sprites.board.width) / 2;

        function createUsers() {
            let index = 1;
            let users = [];
            for (let row = 1; row < size + 1; row++) {
                users.push(createUser(row, listUsers[row-1], index))
            }
            return users;
        }

        function createUser(row, user) {
            return {
                row,
                user,
                x: startX * 4,
                y: startY + lineHeight * row,
                game: false,
                currentUser: false
            }
        }
        return createUsers();
    }

    createCells(sprites, width, height) {
        const size = 3;

        function createCElls() {
            let index = 1;
            let cells = [];
            for (let row = 1; row < size + 1; row++) {
                for (let col = 1; col < size + 1; col++) {
                    let vase = `vase_${index++}`;
                    cells.push(createCell(row, col, sprites[vase], cells))
                }
            }
            return cells;
        }

        function createCell(row, col, vase, cells) {
            let cellSize = sprites.cell.width;

            //Отступы
            let offsetX = (width - cellSize * size) / 2;
            let offsetY = (height - cellSize * size) / 6.5;
            return {
                id: cells.length + 1,
                row,
                col,
                x: offsetX + cellSize * (row - 1),
                y: offsetY + cellSize * (col - 1),
                vase,
                background: sprites.cell,
                price: !!(cells.length % 2),
                grass: false
            };
        }
        return createCElls();
    }

    createBalls(sprites, width, height) {
        const size = 4;
        function createBalls() {
            let index = 1;
            let balls = [];
            for (let row = 0; row < size; row++) {
                let flower = `flower_${index++}`;
                balls.push(createBall(row, sprites[flower], balls))
            }
            return balls;
        }

        function createBall(row, flower, balls) {
            let ballSize = sprites.ball.width;

            //Отступы
            let offsetX = (width - ballSize * size) / 2;
            let offsetY = (height - ballSize * size) / 6.5;
            return {
                id: balls.length + 1,
                row,
                x: offsetX + ballSize * row,
                y: offsetY,
                flower: {
                    img: flower,
                    x: (sprites.ball.width - flower.width) / 2 + offsetX + ballSize * row,
                    y: (sprites.ball.height - flower.height) / 2 + offsetY,
                    centerX: (((sprites.ball.width - flower.width) / 2 + offsetX + ballSize * row) + flower.width) / 2,
                    centerY: (((sprites.ball.height - flower.height) / 2 + offsetY) + flower.height) / 2,
                    opacity: 1,
                },
                background: sprites.ball,
                opacity: 1,
                price: !!(balls.length % 2)
            };
        }

        return createBalls();
    }
}

export const app = new App();
app.start();


