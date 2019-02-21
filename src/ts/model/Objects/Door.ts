import Structure from './Structure';

export default class Door extends Structure {
    use() {
        if (this.stats.isLocked) return;
        this.stats.isActive = !this.stats.isActive;
        this.isSolid = this.stats.isActive;
    }
}
