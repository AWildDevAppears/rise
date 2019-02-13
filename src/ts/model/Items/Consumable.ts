import Item from '../abstract/Item';
import Modifier from '../Modifier';

export default class Consumable extends Item {
    effects: Modifier[] = [];
}
