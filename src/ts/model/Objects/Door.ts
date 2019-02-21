import Structure from './Structure';

export default class Door extends Structure {
    use() {
        if (this.stats.isLocked) return;
        this.stats.isOpen = !this.stats.isOpen;
        this.isSolid = this.stats.isOpen;
    }
}
