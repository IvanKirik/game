import {Animation} from "./animations.js";
import {render} from "./render.js";
import {Router} from "./router.js";
import {Mouse} from "./mouse.js";
import {IMAGES} from "./constants/images.constant.js";
import {listUserScene} from "./scenes/listUsers.scene.js";
import {gameOneScene} from "./scenes/gameOne.scene.js";
import {gameTwoScene} from "./scenes/gameTwo.scene.js";
import {StartScene} from "./scenes/start.scene.js";
import {finalScene} from "./scenes/final.scene.js";

export class Game {

    canvas = null;
    ctx = null;
    mouse = null;
    sprites = null;

    inputName = null;
    inputPhone = null;

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

        this.inputName = document.getElementById('input-name');
        this.inputName.addEventListener('input', (e) => {
            const inputValue = e.target.value;
            const regex = /^[^!?#№;$&@/.+=\'\'\"\"-,]*$/;

            if (!regex.test(inputValue)) {
                e.target.value = "";
            }
        });
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
        this.inputPhone = document.getElementById('input-phone');

        this.users = this.createListUsers(this.listUsers, this.canvas.width, this.canvas.height, this.sprites);
        this.cells = this.createCells(this.sprites, this.canvas.width, this.canvas.height);
        this.balls = this.createBalls(this.sprites, this.canvas.width, this.canvas.height);

        listUserScene.init(this.canvas, this.ctx, this.mouse, this.sprites, this.users, this.listUsers);
        gameOneScene.init(this.canvas, this.ctx, this.mouse, this.sprites, this.users, this.cells);
        gameTwoScene.init(this.canvas, this.ctx, this.mouse, this.sprites, this.users, this.balls);
        finalScene.init(this.canvas, this.ctx, this.mouse, this.sprites, this.users, this.inputPhone)

        render.init(this.ctx, this.canvas, this.mouse, this.sprites, this.inputName, this.inputPhone,
            new Router(
                new StartScene(this.canvas, this.ctx, this.mouse, this.sprites, this.inputName),
                listUserScene,
                gameOneScene,
                gameTwoScene,
                finalScene
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
            let index = 0;
            let users = [];
            for (let row = 1; row < size + 1; row++) {
                users.push(createUser(row, listUsers[row-1], index))
                index++
            }
            return users;
        }

        function createUser(row, user, index) {
            return {
                row,
                user,
                x: startX * 4,
                y: startY + lineHeight * row,
                game: false,
                currentUser: false,
                textStart: [`${user}`,  'يحتوي أحد هذه الأواني' , 'على عشبة سحرية لإكسير', ' الشباب، حاولي العثور', 'عليها من خلال كسر أحد الأواني'],
                textEnd: row !== 4 ?
                    [`${user}`, 'للأسف خسرتي'] :
                    [`${user}`, 'رائع، أنتي محظوظة!', 'دور جميع المشاركين', 'يُرجى الانتظار حتى ينتهي']
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
                    rotation: false
                },
                background: sprites.ball,
                opacity: 1,
                price: !!(balls.length % 2)
            };
        }

        return createBalls();
    }

    updateUserList(user) {
        this.listUsers[3] = user;
        this.users = this.createListUsers(this.listUsers, this.canvas.width, this.canvas.height, this.sprites);

        listUserScene.init(this.canvas, this.ctx, this.mouse, this.sprites, this.users, this.listUsers);
        gameOneScene.init(this.canvas, this.ctx, this.mouse, this.sprites, this.users, this.cells);
        gameTwoScene.init(this.canvas, this.ctx, this.mouse, this.sprites, this.users, this.balls);
        finalScene.init(this.canvas, this.ctx, this.mouse, this.sprites, this.users, this.inputPhone)
    }

    send() {
        console.log(`Имя: ${this.inputName.value}. Телефон: ${this.inputPhone.value}`)
    }
}

export const game = new Game();
game.start();


