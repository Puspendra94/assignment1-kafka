const sequelize = require('../configs/db.config');
const {DataTypes} = require('sequelize');

const Table2 = sequelize.define("table2", {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

sequelize.sync().then(() => {
    console.log('Table2 table created successfully!');
 }).catch((error) => {
    console.error('Unable to create table : ', error);
 });

 module.exports = Table2;
