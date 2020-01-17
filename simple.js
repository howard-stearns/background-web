'use strict';
class Responder extends Croquet.View {
    constructor(model) {
        super(model);
        this.subscribe(this.session, 'gotPing', this.gotPing);
        this.subscribe(this.viewId, "synced", this.synced);
    }
    synced(isSynced) {
        this.isSynced = isSynced;
    }
    gotPing() {
        console.log('gotPing', this.isSynced);
        if (!this.isSynced) return;
        replied.innerHTML = 1 + parseInt(replied.innerHTML, 10);
        this.publish(this.session, 'pong');
    }
}

function resetClick() {
    replied.innerHTML = 0;
}
Croquet.startSession(Q.APP_NAME, Messenger, Responder);
