const router = require('express').Router();
const { Posts } = require('../../models');
const withAuth = require('../../utils/auth');

// Get all posts from global list
router.get('/posts', async (req, res) => {
    // find all posts
    try {
        const postsData = await Posts.findAll();
        console.log(postsData);
        res.status(200).json(postsData);
    } catch (err) {
        res.status(500).json(err);
    }

});

// get one post from global posts list
router.get('/posts/:id', async (req, res) => {
    // find a single post by its `id`
    try {
        const postsData = await Posts.findByPk(req.params.id,);
        console.log(postsData);

        if (!postsData) {
            res.status(404).json({ message: 'No post found.' });
            return;
        }
        res.status(200).json(postsData);
    } catch (err) {
        res.status(500).json(err);
    }
});


// update given post in global posts list
router.put('/post/:id', withAuth, (req, res) => {
    Posts.update(
        {
            title: req.body.title,
            body: req.body.body,
        },
        {
            where: {
                id: req.params.id,
            },
        }
    )
        .then((updatedPost) => {
            res.json(updatedPost);
        })
        .catch((err) => res.json(err));
});


// Create a post to the global list
router.post('/posts', withAuth, async (req, res) => {
    try {
        const newPost = await Posts.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newPost);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Delete a post from the global list
router.delete('/post/:id', withAuth, async (req, res) => {
    try {
        const postsData = await Posts.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!postsData) {
            res.status(404).json({ message: 'No post found.' });
            return;
        }

        res.status(200).json(postsData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
