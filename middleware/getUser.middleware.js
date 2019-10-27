const dataBase = require('../dataBase').getInstance();


module.exports = async (data,res) => {
    try {
       const chatName = data.name;
       const chatPassword = data.password;
       const UserModel =  dataBase.getModel('User');

       const getUser =  await UserModel.findOne({
           where: {
               name: chatName,
               password: chatPassword
           }
       });
        if(!getUser) {
           res.render.json('YOU MUST LOGIN OR REGISTER');
        }
        return  getUser;
    }
    catch (e) {
        res.status(400).json(e.message);
    }
};