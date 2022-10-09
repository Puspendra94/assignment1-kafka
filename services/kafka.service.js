const sequelize = require('../configs/db.config');
const { produceMessage, commit } = require('../configs/kafka.config');
const {topics} = require('../constants/kafka.constants');
const Table1 = require('../models/table1.model');
const Table2 = require('../models/table2.model');

const saveToDB = async (data) => {
    try {
        const dbData = {
            user_id: Number(data.message.value.toString("utf8"))
        }
        console.log('Starting transaction');
        const t = await sequelize.transaction();
        await Table1.create(dbData, {transaction: t});
        console.log('Saved data in Table 1');
        await Table2.create(dbData, {transaction: t});
        console.log('Saved data in Table 2');
        await t.commit();
        console.log('Transaction Commited');
    } catch (error) {
        console.log('Transaction Rolling back', error);
        await t.rollback();
        console.log('Transaction Rolled back');
        throw error;
    }
}

const processData = async (data, consumer) => {
    try {
        console.log(data.message.value.toString("utf8"));
        await saveToDB(data);
        await produceMessage(data.message.value.toString("utf8"), topics.TOPIC_2);
        await commit(consumer, data);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    processData
};
