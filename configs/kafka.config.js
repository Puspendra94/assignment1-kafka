const {Kafka, Partitioners, PartitionAssigners: { roundRobin } } = require('kafkajs');
const kafkaConstant = require('../constants/kafka.constants');

const kafka = new Kafka({ brokers: kafkaConstant.brokers });

const produceMessage = async (message, topic) => {
    const producer = kafka.producer({ createPartitioner: Partitioners.DefaultPartitioner })
    await producer.connect();
    await producer.send({
        topic: topic,
        messages: [
          { value:  message},
        ]
    });
    console.log(`Produced Message: ${message}`);
}

const createConsumer = async (groupId) => {
    const consumer = kafka.consumer({ groupId,
        partitionAssigners: [
            roundRobin
        ], 
        readUncommitted: true,
        retry: 5,
        rebalanceTimeout: 30000
    });
    return consumer;
}

const commit = async (commit_consumer, data) => {
    try {
        console.log("commiting this message:: ", data.topic, data.partition, data.message.offset)
        await commit_consumer.commitOffsets([{ topic: data.topic, partition: data.partition, offset: data.message.offset }]);
        console.log("Commited partition");
    } catch (error) {
        console.log('Error while commit the message::: ', error);
    }
}

module.exports = {
    produceMessage,
    commit,
    createConsumer
};