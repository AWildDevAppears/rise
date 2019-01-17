import Item from "./Item";
import Modifier from "../Modifier";

export default class Weapon extends Item {
    damageMin: number = 0;
    damageMax: number = 0;

    attackSpeed: number = 0;

    modifiers: Modifier[] = [];
}
