const {produceMessage} = require('./configs/kafka.config');
const {topics} = require('./constants/kafka.constants');

(async function () {
    while(true) {
        const message = `${Math.floor(Math.random() * (5000 - 1000 + 1) + 1000)}`;
        await produceMessage(message, topics.TOPIC_1);
    
        await new Promise(resolve => setTimeout(resolve, Math.floor(Math.random() * (5000 - 1000 + 1) + 1000)));
    }
})();