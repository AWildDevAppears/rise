type armorType = 'head' | 'chest' | 'legs' | 'boots' | 'gloves';

export default class Armor {
    id: string;
    name: string;
    armorType: armorType;
    defence: number = 0;
}
