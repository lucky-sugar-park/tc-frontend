
export class Queue {

    #storage={};
    #front=0;
    #rear=0;

    size = () => {
        if(this.#storage[this.#rear]===undefined) return 0;
        else return this.#rear-this.#front+1;
    }

    add = (value) => {
        if(this.size()===0) {
            this.#storage['0']=value;
        } else {
            this.#storage[++this.#rear]=value;
        }
    }

    pop = () => {
        let data;
        if(this.#front===this.#rear) {
            data=this.#storage[this.#front];
            delete this.#storage[this.#front];
            this.#front=this.#rear=0;
        } else {
            data=this.#storage[this.#front];
            delete this.#storage[this.#front];
            this.#front++;
        }
        return data;
    }
}

var imessageBroker = undefined;

export class InternalMessageBroker {

    #listenerMap;
    #queue;

    constructor() {
        this.#listenerMap=new Map();
        this.#queue=new Queue();
        this.#run();
    }

    #run = async () => {
        const handler=setTimeout(async ()=>{
            while(this.#queue.size()>0) {
                await this.#dispatch(this.#queue.pop());
            }
            clearTimeout(handler);
        }, 100);
    }
    
    addListener = (msgKind, listener) => {
        var listenerList=this.#listenerMap.get(msgKind);
        if(listenerList===undefined) {
            listenerList=[];
        }
        listenerList.push(listener);
        console.log("added message kind: " + msgKind + ", listener name: " + listener.name);
        this.#listenerMap.set(msgKind, listenerList);
    }

    removeListener = (msgKind, listenerName) => {
        const listenerList=this.#listenerMap.get(msgKind);
        this.#listenerMap.set(msgKind, listenerList.filter(listener=>listener.name!==listenerName));
        console.log("removed message type: " + msgKind + ", listener name: " + listenerName);
    }

    #dispatch = async (message) => {
        const listenerList=this.#listenerMap.get(message.kind);
        if(listenerList===undefined) return;

        listenerList.forEach(listener => {
            listener.onMessage(message);
        });
    }

    dispatch = (message) => {
        // this.#queue.add(message);
        // this.#run();
        this.#dispatch(message);
    }
}

export const getImessageBroker = () => {
    if(imessageBroker===undefined) {
        imessageBroker=new InternalMessageBroker();
    }
    return imessageBroker;
}
