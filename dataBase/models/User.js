module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        roomID: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },  {
            tableName: 'user',
            timestamps: false
    });
    const Room = sequelize.import('./Room.js');

    User.belongsTo(Room, {foreignKey: 'roomID'});

    return User;
}