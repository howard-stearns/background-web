'use strict';
const Q = Croquet.Constants;
Q.APP_NAME = "BackgroundWeb";
Q.APP_VERSION = "0.0.5";
class Messenger extends Croquet.Model {
    init(options) {
        super.init(options);
        this.subscribe(this.session, 'ping', this.ping);
        this.subscribe(this.session, 'pong', this.pong);
    }
    ping() {
        console.log('ping');
        this.publish(this.session, 'gotPing');
    }
    pong() {
        console.log('pong');        
        this.publish(this.session, 'gotPong');
    }
}
Messenger.register()
