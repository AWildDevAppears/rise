/* @flow */
(async () => {
    const { GameManager } = await import('./services/GameManager');
    GameManager.init();
})();
