const router = require('express').Router();
const { Posts } = require('../../models');
const withAuth = require('../../utils/auth');

// Get all posts from global list
router.get('/', async (req, res) => {
    // find all posts
    try {
        const postsData = await Posts.findAll();
        res.status(200).json(postsData);
    } catch (err) {
        res.status(500).json(err);
    }

});

// get one post from global posts list
router.get('/:id', async (req, res) => {
    // find a single post by its `id`
    try {
        const postsData = await Posts.findByPk(req.params.id,);


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
router.put('/:id', withAuth, (req, res) => {
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

// Create a new post
router.post('/', withAuth, async (req, res) => {
    console.log('Route getting hit');
    try {
        const newPost = await Posts.create({
            title: req.body.title,
            body: req.body.body,
            user_id: req.session.user_id,
        });
        console.log(newPost);
        res.status(200).json(newPost);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Delete a post from the global list
router.delete('/:id', withAuth, async (req, res) => {
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
