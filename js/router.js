export class Router {
    startScene = null;
    listUsers = null;
    gameOne = null;
    gameTwo = null;
    finalScene = null;

    constructor(startScene, listUsers, gameOne, gameTwo, finalScene) {
        this.startScene = startScene;
        this.listUsers = listUsers;
        this.gameOne = gameOne;
        this.gameTwo = gameTwo;
        this.finalScene = finalScene;
    }
}
