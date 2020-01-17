'use strict';
class Responder extends Croquet.View {
    constructor(model) {
        super(model);
        this.subscribe(this.session, 'gotPing', this.gotPing);
    }
    gotPing() {
        console.log('gotPing');
        replied.innerHTML = 1 + parseInt(replied.innerHTML, 10);
        this.publish(this.session, 'pong');
    }
}
Croquet.startSession(Q.APP_NAME, Messenger, Responder);
