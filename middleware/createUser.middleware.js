const dataBase = require('../dataBase').getInstance();

module.exports = async (data,res)=> {

    try {
        const createUser = data;
        const UserModel =  dataBase.getModel('User');

        await UserModel.create(createUser);

    } catch (error) {
        res.status(400).json(error.message);
    }
}
