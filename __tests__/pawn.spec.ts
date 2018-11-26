import Pawn from '../src/scripts/model/Pawn';
import { PAWN_CONSTANTS } from '../src/scripts/model/Pawn';

describe('Pawn', () => {
    it('Should move left', () => {
        const p = new Pawn();

        p.posX = 50;
        p.posY = 50;

        p.moveLeft();

        expect(p.posX).toBe(50 - PAWN_CONSTANTS.moveSpeed);
    });

    it('Should move right', () => {
        const p = new Pawn();

        p.posX = 50;
        p.posY = 50;

        p.moveRight();

        expect(p.posX).toBe(50 + PAWN_CONSTANTS.moveSpeed);
    });

    it('Should move down', () => {
        const p = new Pawn();

        p.posX = 50;
        p.posY = 50;

        p.moveDown();

        expect(p.posY).toBe(50 - PAWN_CONSTANTS.moveSpeed);
    });

    it('Should move up', () => {
        const p = new Pawn();

        p.posX = 50;
        p.posY = 50;

        p.moveUp();

        expect(p.posY).toBe(50 + PAWN_CONSTANTS.moveSpeed);
    });

    it('Should run left', () => {
        const p = new Pawn();

        p.posX = 50;
        p.posY = 50;

        p.moveLeft(true);

        expect(p.posX).toBe(50 - PAWN_CONSTANTS.runSpeed);
    });

    it('Should run right', () => {
        const p = new Pawn();

        p.posX = 50;
        p.posY = 50;

        p.moveRight(true);

        expect(p.posX).toBe(50 + PAWN_CONSTANTS.runSpeed);
    });

    it('Should run down', () => {
        const p = new Pawn();

        p.posX = 50;
        p.posY = 50;

        p.moveDown(true);

        expect(p.posY).toBe(50 - PAWN_CONSTANTS.runSpeed);
    });

    it('Should run up', () => {
        const p = new Pawn();

        p.posX = 50;
        p.posY = 50;

        p.moveUp(true);

        expect(p.posY).toBe(50 + PAWN_CONSTANTS.runSpeed);
    });
});
