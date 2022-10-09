const topics = {
    TOPIC_1: 'topic1',
    TOPIC_2: 'topic2'
}

brokers = ["localhost:9092"];

groupId = "randon_group_id";

module.exports = {
    topics,
    brokers,
    groupId
};
