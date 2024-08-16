const express = require('express');
const router = express.Router();
const AdvertController = require('../controllers/adverts.controller');

router.get('/ads', AdvertController.getAll);
router.get('/ads/:id', AdvertController.getById);
router.post('/ads', AdvertController.postNew);
router.delete('/ads/:id', AdvertController.deleteById);
router.put('ads/:id', AdvertController.putById);
router.get('ads/search/:searchPhrase', AdvertController.getByPhrase);

module.exports = router;