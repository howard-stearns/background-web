'use strict';
var recorder;
class Recorder extends Croquet.View {
    constructor(model) {
        super(model);
        recorder = this;
        this.subscribe(this.session, 'gotPing', this.gotPing);
        this.subscribe(this.session, 'gotPong', this.gotPong);
        this.subscribe(this.viewId, "synced", this.synced);        
    }
    gotPing() {
        console.log('gotPing', this.isSynced);
        if (!this.isSynced) return;
        sent.innerHTML = 1 + parseInt(sent.innerHTML, 10);
        this.future(parseInt(frequency.value, 10) * 1000).maybePing();
    }
    gotPong() {
        console.log('gotPong', this.isSynced);        
        received.innerHTML = 1 + parseInt(received.innerHTML, 10);
    }
    synced(isSynced) {
        this.isSynced = isSynced;
    }
    maybePing() {
        if (!startButton.disabled || !this.isSynced) return;
        this.publish(this.session, 'ping');
    }
}

function startClick() {
    sent.innerHTML = 0;
    received.innerHTML = 0;
    startButton.disabled = true;
    stopButton.disabled = false;
    recorder.maybePing();
}
function stopClick() {
    startButton.disabled = false;
    stopButton.disabled = true;
}
Croquet.startSession(Q.APP_NAME, Messenger, Recorder);
