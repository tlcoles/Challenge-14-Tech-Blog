const { BlogPost }  = require('../models');

const postData = [
    {
        id: 1,
        title: 'The Way We Were',
        content: 'In the beginning was the void. Thereafter, there was some shit going down. Then we started fighting in the garden. Now we are all fucked.',
        author_id: 1,
    },
    {
        id: 2,
        title: 'Papa Has A Brand New Bag',
        content: 'Papa was a rolling stone. Where ever he laid his hat was his home. And when he died, all he left us was a new bag.',
        author_id: 2,
    }
]

const seedPosts = () => BlogPost.bulkCreate(postData);

module.exports = seedPosts;
