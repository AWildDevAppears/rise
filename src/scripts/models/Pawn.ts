import Actor from './Actor';

/**
 * Pawn
 * A pawn is any entity that can be controlled by the player or by AI
 */
export default class Pawn extends Actor {
    public posX: number = 0;
    public posY: number = 0;

    public name: string = '';

    public healthMax: number = 0;
    public healthNow: number = 0;
}
