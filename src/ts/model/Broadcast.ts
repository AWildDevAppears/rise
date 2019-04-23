export const BROADCASTS = {
    OPEN_CONTAINER: 'OPEN_CONTAINER',
};

export default class Broadcast {
    type: string = '';
    body: object = {};

    constructor(type: string, data: object) {
        this.type = type;
        this.body = data;
    }
}
