const mongoose = require('mongoose');

let connect = async () => {
    try {
        await mongoose.connect(process.env.DB);
        console.log('Database connection has been complete!');
    } catch (error) {
        console.log(error);
        console.log('Failed to connection database!!!');
    }
};

module.exports = { connect };
