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
        const user = await User.findOne().byEmail(defaultAdmin.email)
        if(!user){
            const admin = await User.create(defaultAdmin);
            console.log(`
                \n${'*'.repeat(100)}

                Default admin account created: ${ defaultAdmin.email }

                To ensure security follow these steps:
                    1. Change the password from the configured default.
                    2. Create a new admin user.
                    3. Deactivate the default admin user.

                \n${'*'.repeat(100)}
            `)
        } else {
            console.log('Default admin already exists.')
        }

    } catch (error) {
        console.log(error);
    } finally {
        mongoose.disconnect()
    }
}

CreateDefaultAdmin(defaultAdmin)