type armorType = 'head' | 'chest' | 'legs' | 'boots' | 'gloves';

export default class Armor {
    armorType: armorType;
    defence: number = 0;
}
