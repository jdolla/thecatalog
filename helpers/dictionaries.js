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
    },
    "manager": {
        name: "manager",
        description: [
            "May view products and offers.",
            "May view workflows and statuses.",
            "Create new products and offers."
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