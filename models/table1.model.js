const sequelize = require('../configs/db.config');
const {DataTypes} = require('sequelize');

const Table1 = sequelize.define("table1", {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

sequelize.sync().then(() => {
    console.log('Table1 table created successfully!');
 }).catch((error) => {
    console.error('Unable to create table : ', error);
 });

 module.exports = Table1;