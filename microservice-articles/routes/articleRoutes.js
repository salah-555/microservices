const express = require('express');
const router = express.Router();
const ArticleController = require('../controllers/ArticleController');



// CRUD Routes 
router.get('/', ArticleController.getAllArticles);
router.get('/:id', ArticleController.getArtcileById);

router.post('/', ArticleController.createArticle);
router.put('/:id', ArticleController.updateArticle);
router.delete('/:id', ArticleController.deleteArticle);

module.exports =  router;

