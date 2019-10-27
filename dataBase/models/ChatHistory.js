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
            type: DataTypes.STRING,
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
    ChatHistory.belongsTo(Room, {foreignKey: 'roomID'});

    return ChatHistory;
}