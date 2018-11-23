/**
 * Actor
 * Any object in the world that can be created and destroyed by the game
 */
export default class Actor {
    public isDesctuctable: boolean = false; // Can this object be broken?
    public isMovable: boolean = false; // Can this object be pushed?
    public isInteractive: boolean = false; // can I trigger it, activate it or open it?
}

/**
 * IDestructableActor
 * Any actor that can be destroyed
 */
export interface IDestructableActor {
    healthMax: number;
    healthNow: number;
    onDestroy(): undefined;
}

/**
 * IDestructableActor
 * Any actor that can be pushed
 */
export interface IMoveableActor {
    weight: number;
}

/**
 * IDestructableActor
 * Any actor that can be interacted with
 */
export interface IInteractiveActor {
    onInteract(): undefined;
}
