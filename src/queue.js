const { EventEmitter } = require('events');

class AsyncQueue extends EventEmitter {
    constructor({ interval } = {}) {
        super();
        // default until the queue is started
        this.isPause = true;
        this.queue = [];
        this.interval = interval ? interval : 250;

        this.on('interval', (newInterval) => {
            this.interval = newInterval;
        });
    }

    start() {
        this.isPause = false;

        const interval = setInterval(() => {
            if (this.isPause) {
                return;
            }
            if (!this.isEmpty()) {
                this.dequeue();
            }
            /*   if (this.isEmpty()) {
                clearInterval(interval);
            } */
        }, this.interval);
    }

    pause() {
        this.isPause = true;
    }

    dequeue() {
        this.emit('dequeued', this.peek());
        return this.queue.shift();
    }
    enqueue(item) {
        this.emit('enqueued', item);
        this.queue.push(item);
    }

    isEmpty() {
        return this.queue.length == 0;
    }
    getCurrentInterval() {
        return this.interval;
    }

    peek() {
        return this.isEmpty() ? null : this.queue[0];
    }

    print() {
        this.queue.forEach((item) => {
            console.log(item);
        });

        return this.queue;
    }
}

module.exports = AsyncQueue;
