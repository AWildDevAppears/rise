import Actor from './Actor';

/**
 * Pawn
 * A pawn is any entity that can be controlled by the player or by AI
 */
export default class Pawn extends Actor {
    public posX: number = 0;
    public posY: number = 0;

    public name: string = '';

    public healthMax: number = PAWN_CONSTANTS.baseHealth;
    public healthNow: number = PAWN_CONSTANTS.baseHealth;

    public moveLeft(isRunning: boolean = false) {
        this.posX -= isRunning ? PAWN_CONSTANTS.runSpeed : PAWN_CONSTANTS.moveSpeed;
    }

    public moveRight(isRunning: boolean = false) {
        this.posX += isRunning ? PAWN_CONSTANTS.runSpeed : PAWN_CONSTANTS.moveSpeed;
    }

    public moveUp(isRunning: boolean = false) {
        this.posY += isRunning ? PAWN_CONSTANTS.runSpeed : PAWN_CONSTANTS.moveSpeed;
    }

    public moveDown(isRunning: boolean = false) {
        this.posY -= isRunning ? PAWN_CONSTANTS.runSpeed : PAWN_CONSTANTS.moveSpeed;
    }
}

export const PAWN_CONSTANTS = {
    baseHealth: 100,
    moveSpeed: 3,
    runSpeed: 5,
};
