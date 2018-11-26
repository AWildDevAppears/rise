import Item from './Item';

export default class Container {
    public id: string = '';
    public name: string = '';
    private maxItems: number = 0;
    private minItems: number = 0;
    private possibleItems: Item[] = [];
}
