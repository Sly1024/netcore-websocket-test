ws = new WebSocket('ws://localhost:5000/ws');

let resolveRequestPromise = null;
let rejectRequestPromise = null;

ws.onmessage = (evt) => resolveRequestPromise?.(evt.data);
ws.onerror = (evt) => rejectRequestPromise?.(evt.data);

ws.onopen = () => {

    function request(message) {
        ws.send(message);
        return new Promise((resolve, reject) => {
            resolveRequestPromise = resolve;
            rejectRequestPromise = reject;
        });
    }

    const sendTime = performance.now();

    sendMessages().then(() => {
        const recvTime = performance.now();
        console.log("Time: " + (recvTime - sendTime));
        ws.close();
    });

    
    async function sendMessages() {
        for (let i = 0; i < 1000; i++) {
            await request("hello" + i);
        }
    }
};

