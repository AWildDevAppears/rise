import Entity from '../abstract/Entity';

export default class Door extends Entity {
    use() {
        this.isSolid = !this.isSolid;
    }
}
