import Entity from "./abstract/Entity";
import Inventory from "./Inventory";

export default class Container extends Entity {
    inventory = new Inventory(0);
}
