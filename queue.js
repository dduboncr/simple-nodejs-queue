
const events = require('events');

class AsyncQueue extends events.EventEmitter {
    constructor(){

        const eventEmitter = new events.EventEmitter();
        this.queueEvents = eventEmitter
        this.queue = []

        const listner1 = function listner1(item) {
            console.log('enqueue',{item});
         }
        eventEmitter.addListener('enqueue',listner1);
    }

    start(){
        while (this.queue.length !== 0) {
            console.log(this.dequeue());
        }
    }

    pause(){ 
    }
    
    dequeue(){
        return this.queue.shift();
    }
    enqueue(item){
        this.queueEvents.on('enqueue', listner2(item));
        this.queue.push(item);
    }

    peek(){
       if(this.queue.length === 0){
           return null
       }else{
        return this.queue[0];
       }
      
    }

    print(){
        return this.queue
    }
}

module.exports = AsyncQueue
