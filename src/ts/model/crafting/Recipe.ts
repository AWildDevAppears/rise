import Item from '../abstract/Item';

export default class Recipe {
    ingredients: { [key: string]: number };
    output: Item;
    skillRequirements: { [key: string]: number };
}
