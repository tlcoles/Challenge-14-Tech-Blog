const router = require('express').Router();
const { BlogPost, Comment, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all BlogPost and join with user data
    const blogPostData = await BlogPost.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });
    // Serialize data so the template can read it
    const blogposts = blogPostData.map((blogpost) =>
      blogpost.get({ plain: true })
    );

    // Pass serialized data and session flag into template
    res.render('homepage', {
      blogposts,
      logged_in: req.session.logged_in,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

// Show single blogpost
router.get('/post/:id', async (req, res) => {
  try {
    const blogPostData = await BlogPost.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    // Fetch all comments on the blogpost
    const commentsData = await Comment.findAll({
      where: {
        post_id: req.params.id,
      },
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const comments = commentsData.map((comment) =>
      comment.get({ plain: true })
    );

    const blogpost = blogPostData.get({ plain: true });

    // Attach comments to blogpost and render all on blogpost page
    blogpost.comments = comments;

    res.render('blogpost', {
      ...blogpost,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent unauthorized access
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const blogPostsData = await BlogPost.findAll({
      where: {
        author_id: req.session.user_id,
      },
    });

    const blogposts = blogPostsData.map((blogpost) =>
      blogpost.get({ plain: true })
    );

    res.render('dashboard', {
      blogposts,
      logged_in: true,
    });
  } catch (error) {
    res.status(400).json(error);
  }
});
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
