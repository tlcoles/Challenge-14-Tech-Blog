const router = require('express').Router();
const blogPostRoutes = require('./blogPostRoutes');
const userRoutes = require('./userRoutes');
router.use('/user', userRoutes);
router.use('/posts', blogPostRoutes);

module.exports = router;