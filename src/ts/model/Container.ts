import Entity from "./abstract/Enitiy";
import Inventory from "./Inventory";

export default class Container extends Entity {
    inventory = new Inventory(0);
}
