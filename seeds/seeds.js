const sequelize = require('../config/connection');
const { Posts } = require('../models');
const { Users } = require('../models');
const { Comments } = require('../models');

const PostsData = require('./PostsData.json');
const UsersData = require('./UsersData.json');
const CommentsData = require('./CommentsData.json');

const seedAll = async () => {
    try {
        await sequelize.sync({ force: true });

        await Users.bulkCreate(UsersData, {
            individualHooks: true,
            returning: true,
        });

        await Posts.bulkCreate(PostsData);

        await Comments.bulkCreate(CommentsData);

    } catch (error) {

    }
    process.exit(0);
}

seedAll();