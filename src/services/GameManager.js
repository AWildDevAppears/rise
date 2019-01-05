
import { Game, CANVAS } from 'phaser';

const GameManager = {
    game: undefined,

    init() {
        this.game = new Game({
            width: 1200,
            height: 800,
            type: CANVAS,
            parent: 'game',
            title: 'Rise',
            backgroundColor: '#f00', // #TODO: Change me
        });
    },
    };

export default GameManager;
