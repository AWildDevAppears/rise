import Actor from './Actor';

/**
 * Pawn
 * A pawn is any entity that can be controlled by the player or by AI
 */
export default class Pawn extends Actor {
    static buildFromConfig(config) {
        const p = new Pawn();
        p.posX = config.posX;
        p.posY = config.posY;
        p.name = config.name;

        return p;
    }

    posX = 0;
    posY = 0;

    name = '';

    isDesctuctible = true;

    healthMax = PAWN_CONSTANTS.baseHealth;
    healthNow = PAWN_CONSTANTS.baseHealth;

    sprite;

    moveLeft(isRunning = false) {
        this.posX -= isRunning ? PAWN_CONSTANTS.runSpeed : PAWN_CONSTANTS.moveSpeed;
        this._redraw();
    }

    moveRight(isRunning = false) {
        this.posX += isRunning ? PAWN_CONSTANTS.runSpeed : PAWN_CONSTANTS.moveSpeed;
        this._redraw();
    }

    moveUp(isRunning = false) {
        this.posY += isRunning ? PAWN_CONSTANTS.runSpeed : PAWN_CONSTANTS.moveSpeed;
        this._redraw();
    }

    moveDown(isRunning = false) {
        this.posY -= isRunning ? PAWN_CONSTANTS.runSpeed : PAWN_CONSTANTS.moveSpeed;
        this._redraw();
    }

    _redraw() {
        // TODO: Move the sprite.
    }
}

export const PAWN_CONSTANTS = {
    baseHealth: 100,
    moveSpeed: 3,
    runSpeed: 5,
};
