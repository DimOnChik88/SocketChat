const dataBase = require('../dataBase').getInstance();


module.exports = async (data,res) => {
    try {
        // let user =  JSON.stringify(data);
        // console.log('GET'+user);


        console.log('GET before '+data);
        console.log('Using JSON '+JSON.parse(data));
        const {chatName, chatPassword} = data;
        console.log('GET After: '+ data.name+' '+data.password);
        const UserModel = dataBase.getModel('User');

        const getUser = await  UserModel.findOne({where: {
            name: chatName,
            password: chatPassword
            }});

        console.log(getUser);
        if(!getUser) {
           res.render.json('YOU MUST LOGIN OR REGISTER');
        }

        return getUser;
    }
    catch (e) {
        res.status(400).json(e.message);
    }
}