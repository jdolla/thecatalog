const mongoose = require('mongoose');
const mongoConn = process.env.mongodb || "mongodb://localhost/thecatalog";
mongoose.connect(mongoConn);

const User = require('./models/user.js');
const password = process.env.adminDefault || "password123"

const defaultAdmin = {
    email: "admin@thecatalog.net",
    first_name: "admin",
    last_name: "admin",
    password: password,
    conf_password: password,
    user_roles: ["admin", "reader"]
}

const CreateDefaultAdmin = async defaultAdmin => {
    try {
        const admin = await User.create(defaultAdmin);
        console.log(`Default admin account created: ${ defaultAdmin.email }`)
        console.log(`Password set to configured default.`)
        console.log(`Be sure to change the default password NOW.`)
    } catch (error) {
        console.log(error);
    } finally {
        mongoose.disconnect()
    }
}

CreateDefaultAdmin(defaultAdmin)