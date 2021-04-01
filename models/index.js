const Posts = require('./Posts');
const Users = require('./Users');

// Not sure if this is correct

Users.hasMany(Posts, {
    foreignKey: 'user_id',
});

Posts.belongsTo(Users, {
    foreignKey: 'user_id',
});



module.exports = { Users, Posts };

