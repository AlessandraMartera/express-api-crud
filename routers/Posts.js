const express = require('express');
const router = express.Router();
const postsController = require('../controllers/posts');

router.get('/', postsController.index);

// not
router.get('/published', postsController.indexPublished);
router.get('/search_title/:title', postsController.search_title);

router.get('/:id', postsController.show);

router.post('/', postsController.store);

router.put('/:id', postsController.update);

router.delete('/:id', postsController.destroy);

module.exports = router;