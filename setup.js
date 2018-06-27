const mongoose = require('mongoose');
const mongoConn = process.env.mongodb || "mongodb://localhost/thecatalog";
mongoose.connect(mongoConn);

const User = require('./models/user');
const Brand = require('./models/brand');





const password = process.env.adminDefault || "password123"

const defaultAdmin = {
    email: "admin@thecatalog.net",
    first_name: "admin",
    last_name: "admin",
    password: password,
    conf_password: password,
    user_roles: ["admin", "reader"]
}

const CreateDefaultAdmin = async (defaultAdmin, defaultBrands) => {
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

        try {
            for (const brand of defaultBrands){
                const existing = await Brand.findOne().byName(brand.name)
                if(!existing){
                    const nb = await Brand.create(brand);
                    console.log(`
                    \n${'*'.repeat(100)}

                    Created new brand: ${ brand.name }

                    \n${'*'.repeat(100)}
                    `)
                } else {
                    console.log(`
                    \n${'*'.repeat(100)}

                    Brand alread exists: ${ brand.name }

                    \n${'*'.repeat(100)}
                    `)
                }

            }
        } catch (error) {
            console.log(error)
        }

    } catch (error) {
        console.log(error);
    } finally {
        mongoose.disconnect()
    }
}


const defaultBrands = [
    {
        name: "Tres Chevres",
        site: "www.treschevres.com",
        description: "High-end luxury boutique soap. Handmade in small batches with only the finest ingreedients and essential oils."
    }, {
        name: "Fainting Goat Soaps",
        site: "www.faintinggoat.com",
        description: "Mid-tier handmade soap sold direct to consumers via online marketplace and B2B sales. Mid-grade ingreedients and fragrance oils."
    }, {
        name: "The Billy Goat Soaps",
        site: "www.bgsoaps.com",
        description: "Mass produced soaps intended for hotel chains. Mainly comes in sample sizes. Unscented & lavendar scents available."
    }
]


CreateDefaultAdmin(defaultAdmin, defaultBrands);