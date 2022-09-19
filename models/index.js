// import models
const BlogPost = require('./BlogPost');
const Comment = require('./Comment');
const User = require('./User');

// BlogPost belongsTo User
BlogPost.belongsTo(User, {
    foreignKey: 'author_id',
});

// Comment belongsTo Post
Comment.belongsTo(BlogPost, {
    foreignKey: 'post_id',
});

// Comment belongsTo User
Comment.belongsTo(User, {
    foreignKey: 'commenter_id',
});

// export models
module.exports = {
    BlogPost,
    Comment,
    User
};