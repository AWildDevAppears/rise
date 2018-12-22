
async function main() {
    const { Game, CANVAS } = await import(/* webpackChunkName: "phaser" */ 'phaser');

    return {
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

}

export default main();
