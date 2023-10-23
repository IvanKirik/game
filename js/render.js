import {SCENES} from "./constants/scenes.constants.js";

export class Render {

    canvas = null;
    ctx = null;
    router = null;
    sprites = null;
    mouse = null;

    inputName = null;
    inputPhone = null;

    currentScene = SCENES.START_SCENE;

    background = null;
    positionXAliveBackground = 0;
    positionX2AliveBackground = 0;
    speed = 2;

    backgroundOpacity = 0.8;
    elementOpacity = 1;

    transition = false;
    duration = 1200;

    constructor() {

    }

    init(ctx, canvas, mouse, sprites, inputName, inputPhone, router) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.router = router;
        this.mouse = mouse;
        this.sprites = sprites;
        this.inputName = inputName;
        this.inputPhone = inputPhone;

        this.positionX2AliveBackground = this.positionXAliveBackground + this.sprites.dust.width;
        this.start();
        this.disabledInput(this.currentScene)
    }

    start() {
        this.buttons = document.querySelectorAll('.btn');
        this.buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                const action = btn.getAttribute('id');
                this.disabledInput(action)
                if (action === SCENES.START_SCENE) {
                    this.transition = true;
                    setTimeout(() => {
                        this.transition = false;
                        this.currentScene = SCENES.LIST_USERS;
                        if (this.currentScene === SCENES.LIST_USERS) {
                            setTimeout(() => {
                                this.transition = true;
                                setTimeout(() => {
                                    this.transition = false;
                                    this.currentScene = SCENES.GAME_ONE
                                }, this.duration)
                            }, 13000)
                        }
                    }, this.duration)
                }
                if (action === SCENES.GAME_ONE) {
                    this.transition = true;
                    setTimeout(() => {
                        this.transition = false;
                        this.currentScene = SCENES.GAME_ONE
                    }, this.duration)
                }
                if (action === SCENES.GAME_TWO) {
                    this.transition = true;
                    setTimeout(() => {
                        this.transition = false;
                        this.currentScene = SCENES.GAME_TWO
                    }, this.duration)
                }
                if (action === SCENES.FINAL_SCENE) {
                    this.transition = true;
                    setTimeout(() => {
                        this.transition = false;
                        this.currentScene = SCENES.FINAL_SCENE
                    }, this.duration)
                }

                if (action === SCENES.START_SCREEN) {
                    this.transition = true;
                    setTimeout(() => {
                        this.transition = false;
                        this.currentScene = SCENES.START_SCENE;
                    }, this.duration)
                }

                if (action === SCENES.LIST_USERS) {
                    this.transition = true;
                    setTimeout(() => {
                        this.transition = false;
                        this.currentScene = SCENES.LIST_USERS;
                    }, this.duration)
                }
            })
        })
    }

    clear = () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    update = (timeStamp, pTimeStamp, diff, fps, secondPart) => {
        this.transitionAliveBackground()

        this.router[this.currentScene].update(this.elementOpacity, timeStamp, this.transition);
        this.mouse.tick()
    }

    render = (timeStamp, pTimeStamp, diff, fps, secondPart) => {
        this.ctx.save();
        this.createBackground();
        this.createAliveBackground();
        this.ctx.restore();
        this.ctx.direction = 'rtl'
        this.router[this.currentScene].render(this.elementOpacity, timeStamp, this.transition);

        this.transitionElements(this.transition);


    }

    createBackground() {
        this.ctx.drawImage(this.sprites.background, 0, 0);
    }

    createAliveBackground() {
        this.ctx.globalAlpha = this.backgroundOpacity;
        this.ctx.drawImage(this.sprites.dust, this.positionXAliveBackground, 0);
    }

    transitionAliveBackground() {
        this.positionXAliveBackground -= this.speed;
        this.positionX2AliveBackground -= this.speed;

        if (this.positionXAliveBackground <= -this.sprites.dust.width) {
            this.positionXAliveBackground = this.sprites.dust.width;
        }
        if (this.positionX2AliveBackground <= -this.sprites.dust.width) {
            this.positionX2AliveBackground = this.sprites.dust.width;
        }
    }

    transitionElements(transition) {
        if (transition) {
            this.backgroundOpacity += 0.03;
            this.elementOpacity -= 0.02;

            if (this.backgroundOpacity >= 1) {
                this.backgroundOpacity = 1;
                this.elementOpacity = 0;
            }
        } else {
            if (this.backgroundOpacity > 0.8) {
                this.backgroundOpacity -= 0.03;
            }
            if (this.elementOpacity < 1) {
                this.elementOpacity += 0.02;
            }
        }
    }

    disabledInput(currentScene) {
        if (currentScene !== SCENES.START_SCENE) {
            this.inputName.style.display = 'none';
        } else {
            this.inputName.style.display = 'block';
        }

        if (currentScene !== SCENES.FINAL_SCENE) {
            this.inputPhone.style.display = 'none';
        } else {
            this.inputPhone.style.display = 'block';
            let opacity = 0;
            setTimeout(() => {
                const interval = setInterval(() => {
                    opacity += 0.1;
                    this.inputPhone.style.opacity = opacity.toString();
                    if (opacity > 1) {
                        clearInterval(interval);
                    }
                }, 300)
            }, 1000)        }
    }

    transitionMethod(scene) {
        this.disabledInput(scene)
        this.transition = true;
        setTimeout(() => {
            this.transition = false;
            this.currentScene = scene;
            if (this.currentScene === SCENES.LIST_USERS) {
                setTimeout(() => {
                    this.transition = true;
                    setTimeout(() => {
                        this.transition = false;
                        this.currentScene = SCENES.GAME_ONE
                    }, this.duration)
                }, 13000)
            }
        }, this.duration)
    }
}

export const render = new Render();
