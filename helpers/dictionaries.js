const roles = {
    "admin": {
        name: "admin",
        description: [
            "May create and deactivate users.",
            "May modify user permissions.",
            "May reset passwords.",
        ]
    },
    "reader": {
        name: "reader",
        description: [
            "May view products and offers.",
            "May view workflows and statuses",
        ]
    }
  }

const productTypes = [
    "soap",
    "shampoo",
    "body wash",
]


module.exports = {
    roles,
    productTypes
}