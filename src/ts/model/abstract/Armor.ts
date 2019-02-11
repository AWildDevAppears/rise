import Item from './Item';

type armorType = 'head' | 'chest' | 'legs' | 'boots' | 'gloves';

export default class Armor extends Item {
    id: string;
    name: string;
    armorType: armorType;
    defence: number = 0;
}
