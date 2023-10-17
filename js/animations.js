export class Animation {
    constructor(obj) {
        const { clear, update, render } = obj;
        this.pTimeStamp = 0;

        this.tick = (timeStamp) => {
            requestAnimationFrame(this.tick);

            const diff = timeStamp - this.pTimeStamp;
            this.pTimeStamp = timeStamp;
            const fps = 1000 / diff;

            const secondPart = diff / 1000;

            update(timeStamp, this.pTimeStamp, diff, fps, secondPart);
            clear();
            render(timeStamp, this.pTimeStamp, diff, fps, secondPart);
        };
    }

    start() {
        requestAnimationFrame(this.tick);
    }
}
