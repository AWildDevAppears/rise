import { AUTO, Game } from 'phaser';

import '../styles/app.scss';

const game = new Game({
    height: 600,
    parent: 'game',
    type: AUTO,
    width: 800,
});

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js');
    });
}
