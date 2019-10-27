const  dataBase = require('../dataBase').getInstance();

module.exports = async  (data, res) => {
    try {
        const recordMessage = {
            message: data.message,
            fromUser: data.name,
            toRoom: data.roomID
        };
        const ChatHistory =  dataBase.getModel('ChatHistory');

        await  ChatHistory.create(recordMessage);
    } catch (e) {
        res.status(400).json(e.message);
    }


};