'use strict';
var recorder;
class Recorder extends Croquet.View {
    constructor(model) {
        super(model);
        recorder = this;
        this.subscribe(this.session, 'gotPing', this.gotPing);
        this.subscribe(this.session, 'gotPong', this.gotPong);
    }
    gotPing() {
        console.log('gotPing');
        sent.innerHTML = 1 + parseInt(sent.innerHTML, 10);
        this.future(parseInt(frequency.value, 10) * 1000).maybePing();
    }
    gotPong() {
        console.log('gotPong');        
        received.innerHTML = 1 + parseInt(received.innerHTML, 10);
    }
    maybePing() {
        if (!startButton.disabled) return;
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
