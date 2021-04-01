const sequelize = require('../config/connection');
const { Posts } = require('../models');
const { Users } = require('../models');

const PostsData = require('./PostsData.json');
const UsersData = require('./UsersData.json');

const seedAll = async () => {
    await sequelize.sync({ force: true });

    await Posts.bulkCreate(PostsData);

    await Users.bulkCreate(UsersData, {
        individualHooks: true,
        returning: true,
    });

    process.exit(0);
}

seedAll();