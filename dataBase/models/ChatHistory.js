module.exports = (sequelize, DataTypes) =>{
    const ChatHistory = sequelize.define('ChatHistory', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        message: {
            type: DataTypes.STRING,
            allowNull: false
        },
        fromUser: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        toRoom: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    }, {
        tableName: 'ChatHistory',
        timestamps: false
    })
    const Room = sequelize.import('./Room.js');
    const User = sequelize.import('./User.js');

    ChatHistory.belongsTo(Room, {foreignKey: 'roomID'});
    ChatHistory.belongsTo(User, {foreignKey: 'id'});

    return ChatHistory;
}