const { User }  = require('../models');

const userData = [
    {
        user_id: '1',
        username: 'tammi',
        password: 'jkzr7u65$',
    },
    {
        user_id: '2',
        username: 'tiffany',
        password: 'reo&tu4et384757$',
    }
]

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
