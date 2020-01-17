'use strict';
importScripts("https://croquet.studio/sdk/croquet-latest.min.js");
importScripts("messenger.js");

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
        postMessage('incrementCount');
        this.publish(this.session, 'pong');
    }
}

Croquet.startSession(Q.APP_NAME, Messenger, Responder);
