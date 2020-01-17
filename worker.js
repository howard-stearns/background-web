'use strict';
function resetClick() {
    replied.innerHTML = 0;
}

const worker = new Worker('worker-background.js');
worker.onmessage = function (e) {
    switch (e.data) {
    case 'incrementCount':
        replied.innerHTML = 1 + parseInt(replied.innerHTML, 10);
    default:
        console.log('Unrecognized message', e.data);
    }
};

