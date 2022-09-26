const router = require('express').Router();
const { BlogPost } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const newPost = await BlogPost.create({
      ...req.body,
      title: req.session.title,
      content: req.session.content,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const blogPostData = await BlogPost.destroy({
      where: {
        id: req.params.id,
        author_id: req.session.author_id,
      },
    });

    if (!blogPostData) {
      res.status(404).json({ message: 'No blogpost found with this id!' });
      return;
    }
    res.status(200).json(blogPostData);

  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
