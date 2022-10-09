const {createConsumer} = require('./configs/kafka.config');
const {topics, groupId} = require('./constants/kafka.constants');
const {processData} = require('./services/kafka.service');

const run = async (consumer) => {
    console.log('Started reading message');
    await consumer.run({ 
        autoCommit: false,
        eachMessage: async (data) => {
            try {
                await processData(data, consumer);
            } catch (error) {
                throw error;
            }
        }
    });
}

const connect = async (consumer, topic) => {
    console.log('Consumer Connecting');
    await consumer.connect();
    await consumer.subscribe({ topic, fromBeginning: true });
    await run(consumer);
}

(async function (){
    const groupIds = `${groupId}`;
    const topic = topics.TOPIC_1;
    const consumer = await createConsumer(groupIds);
    await connect(consumer, topic);

    consumer.on('consumer.crash', async () => {
        console.log('Consumer crashed');
        await connect(consumer, topic);
        console.log('Consumer connected');
    });

    consumer.on('consumer.disconnect', async () => {
        console.log('Consumer disconnected');
        await connect(consumer, topic);
    });

    consumer.on('consumer.commit_offsets', async (data) => {
        const topic = data.payload.topics[0].topic;
        consumer.pause([{ topic }]);
        console.log('Consumer paused at:: ', Date.now());
        setTimeout(() => {
            consumer.resume([{ topic }]);
            console.log('Consumer resumed at:: ', Date.now());
        }, Math.floor(Math.random() * (5000 - 1000 + 1) + 1000));
    });
})();