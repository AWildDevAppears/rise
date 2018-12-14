/**
 * Actor
 * Any object in the world that can be created and destroyed by the game
 */
export default class Actor {
    isDesctuctible = false; // Can this object be broken?
    isMovable = false; // Can this object be pushed?
    isInteractive = false; // can I trigger it, activate it or open it?
}
