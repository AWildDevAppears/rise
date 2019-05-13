import Container from '../../src/ts/model/Objects/Container';

describe('Container tests', () => {
    it('should let me create a container', () => {
        const container = new Container();
        expect(container).not.toBe(undefined);
    });

    it('should let a container contain items', () => {
        const container = new Container();
        expect(container).toHaveProperty('inventory');
        expect(container.inventory.count()).toBe(0);
    });

    xit('should let items be added to a container', () => {});

    xit('should allow a container to refresh its inventory', () => {});

    xit('should not let a container with a fixed inventory to refresh its contents', () => {});
});
