export default class Item {
    public id: string = '';

    public name: string = '';
    public description: string = '';

    public weight: number = 0;

    constructor(id: string) {
        this.id = id;
        // TODO: lookup this item
    }
}
