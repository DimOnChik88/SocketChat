module.exports = (sequelize, DataTypes) =>{
    const Room = sequelize.define('Room', {
        roomID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: false,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },

    }, {
        tableName: 'room',
        timestamps: false
    })
    return Room;
}