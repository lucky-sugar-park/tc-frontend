
import { getImessageBroker } from './InternalMessageBroker';

const eventNames = [ 'connected', 'count', 'audit_message'];

var sseListener = undefined;

class ServerPushEventDispatcher {

    #consumerMap;
    #sse;
    #settings;

    constructor(props) {
        this.#consumerMap=new Map();
        eventNames.forEach(ename=>{
            this.#consumerMap.set(ename, []);
        });

        const imessageBroker=getImessageBroker();
        imessageBroker.addListener("SSE_SETTINGS", {
            name: "SSE_DISPATCHER",
            onMessage: (message)=>{
                this.#settings=message.settings
            }
        });

        this.#initialize(props.url);
    }

    #initialize = (url) => {
        this.#sse = new EventSource(url);
        eventNames.forEach(ename=>{
            this.#sse.addEventListener(ename, e=>{
                const { data } = e;
                this.#dispatchServerSideEvent (ename, data);
            });
        })
    }

    #dispatchServerSideEvent = (ename, data) => {
        const consumers=this.#consumerMap.get(ename);
        console.log("Event name[", ename, +"] consumers count: " + (consumers.length ? consumers.length : 0) + "]");
        consumers.forEach((consumer)=>{
            if(consumer.onMessage !== undefined && typeof(consumer.onMessage)==='function') {
                consumer.onMessage(ename, data);
            }
        });
    }

    addConsumer = (eventName, consumer) => {
        this.#consumerMap.get(eventName).push(consumer);
        console.log("added event name: " + eventName + ", consumer name: " + consumer.name);
    }

    removeConsumer = (eventName, consumerName) => {
        const consumers=this.#consumerMap.get(eventName);
        this.#consumerMap.set(eventName, consumers.filter(consumer=>consumer.name!==consumerName));
        console.log("removed event name: " + eventName + ", consumer name: " + consumerName);
    }

    destroy = () => {
        this.#sse.close();
        console.log("Destroyed event source...");
        sseListener = undefined;
    }
}

const getServerPushEventDispatcher = (url) => {
    if(sseListener===undefined) {
        sseListener=new ServerPushEventDispatcher({ url: url })
    }
    return sseListener;
}

export default getServerPushEventDispatcher;